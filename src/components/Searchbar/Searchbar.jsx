import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmitForm }) => {
  const inputFile = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmitForm(e, inputFile.current.value);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <i className="bi bi-search"></i>
        </button>

        <input
          ref={inputFile}
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};

export default Searchbar;
