import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ imagesList, onImgClick }) => {
  return (
    <ul className={css.gallery} onClick={onImgClick}>
      {imagesList.map((imageInfo, index) => (
        <ImageGalleryItem key={index} image={imageInfo} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  imagesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onImgClick: PropTypes.func.isRequired,
};

export default ImageGallery;
