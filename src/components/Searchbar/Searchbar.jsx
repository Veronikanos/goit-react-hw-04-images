import React, { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { BsTrash } from 'react-icons/bs';
import PropTypes from 'prop-types';

import styles from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const normalizedQuery = value.trim().toLowerCase();
    if (!normalizedQuery) {
      toast.warning('The query is empty! Try again.');
      return;
    }
    onSubmit(normalizedQuery);
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  const clearInput = () => {
    setValue('');
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        {' '}
        <button
          type="button"
          className={styles.searchFormButton}
          onClick={clearInput}
        >
          <BsTrash />
        </button>
        <button type="submit" className={styles.searchFormButton}>
          <ImSearch />
        </button>
        <input
          className={styles.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
