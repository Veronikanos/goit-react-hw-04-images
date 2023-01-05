import React, { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { BsTrash } from 'react-icons/bs';
import PropTypes from 'prop-types';

import styles from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const normalizedQuery = this.state.value.trim().toLowerCase();
    if (!normalizedQuery) {
      toast.warning('The query is empty! Try again.');
      return;
    }
    this.props.onSubmit(normalizedQuery);
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  clearInput = () => {
    this.setState({ value: '' });
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form onSubmit={this.handleSubmit} className={styles.searchForm}>
          {' '}
          <button
            type="button"
            className={styles.searchFormButton}
            onClick={this.clearInput}
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
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
