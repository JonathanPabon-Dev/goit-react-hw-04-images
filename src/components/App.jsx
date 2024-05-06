import React, { useState, useEffect } from 'react';
import { fetchImages, fetchMoreImages } from '../js/api';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [queryValue, setQueryValue] = useState('');
  const [selectedImage, setSelectedImage] = useState({});

  useEffect(() => {
    if (queryValue) {
      setIsLoading(true);
      fetchImages(queryValue, 1)
        .then(imagesList => {
          setImages(imagesList);
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
        });
    }
  }, [queryValue]);

  const handleOnSubmit = async (ev, inputValue) => {
    ev.preventDefault();
    setQueryValue(inputValue);
    setPage(1);
    setImages([]);
  };

  const handleOnLoadMore = async () => {
    setIsLoading(true);
    setPage(page + 1);
    fetchMoreImages(queryValue, page)
      .then(newImages => {
        setImages([...images, ...newImages]);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  };

  const handleOnImgClick = ev => {
    ev.preventDefault();
    if (ev.target.tagName === 'IMG') {
      const imageData = { src: ev.target.src, alt: ev.target.alt };
      setSelectedImage(imageData);
      setShowModal(true);
    }
  };

  const handleOnCloseModal = () => {
    setShowModal(false);
    setSelectedImage({});
  };

  return (
    <div className="app">
      <Searchbar
        onSubmitForm={(ev, inputValue) => handleOnSubmit(ev, inputValue)}
      />
      {images.length > 0 ? (
        <>
          <ImageGallery
            imagesList={images}
            onImgClick={ev => handleOnImgClick(ev)}
          />
          <Button onLoadMore={handleOnLoadMore} />
        </>
      ) : (
        <p className="noResults">No results found. Try another searching.</p>
      )}
      {isLoading && <Loader />}
      {showModal && (
        <Modal image={selectedImage} onCloseModal={handleOnCloseModal} />
      )}
    </div>
  );
};

export default App;
