import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Component } from 'react';
import { fetchGallery } from './service/api';
import { NoResults } from './NoResults/NoResults';
import { WelcomePage } from './WelcomePage/WelcomePage';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    query: '',
    results: [],
    totalImages: 0,
    error: null,
    page: 1,
    modalImg: null,
    isLoading: false,
    isFirstLoading: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.onFetchImage();
    }
    if (this.state.isFirstLoading) {
      this.setState({ isFirstLoading: false });
    }
  }

  onFetchImage = async () => {
    this.setState({ isLoading: true });
    try {
      const { images: result, totalImages } = await fetchGallery(
        this.state.query,
        this.state.page
      );
      this.setState(prevState => ({
        results: [...prevState.results, ...result],
        totalImages,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onSubmitSearch = newQuery => {
    if (this.state.query === newQuery) {
      toast('The same query, try another one!');
      return;
    }
    this.setState({ query: newQuery, page: 1, results: [], totalImages: 0 });
  };

  onLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  getLargeImageURL = modalData => {
    this.setState({ modalImg: modalData });
  };

  closeModal = () => {
    this.setState({ modalImg: null });
  };

  render() {
    const { isLoading, results, modalImg, isFirstLoading, totalImages, query } =
      this.state;
    return (
      <div>
        <Searchbar onSubmit={this.onSubmitSearch} />
        <main>
          {results.length > 0 && (
            <ImageGallery result={results} getUrl={this.getLargeImageURL} />
          )}

          {isFirstLoading && <WelcomePage />}

          {!isFirstLoading && !results.length && !isLoading && (
            <NoResults query={query} />
          )}
          {isLoading && <Loader />}
          {totalImages !== results.length && !isLoading && (
            <Button onClick={this.onLoadMoreClick} />
          )}

          {modalImg && <Modal largeImg={modalImg} onClose={this.closeModal} />}
          <ToastContainer autoClose={3000} />
        </main>
      </div>
    );
  }
}
