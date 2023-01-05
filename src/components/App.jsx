import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { useEffect, useState } from 'react';
import { fetchGallery } from './service/api';
import { NoResults } from './NoResults/NoResults';
import { WelcomePage } from './WelcomePage/WelcomePage';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modalImg, setModalImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isFirstLoading = useRef(true);

  useEffect(() => {
    const onFetchImage = async () => {
      setIsLoading(true);
      try {
        const { images: result, totalImages: totalImg } = await fetchGallery(
          query,
          page
        );
        setResults([...results, ...result]);
        setTotalImages(totalImg);
      } catch (err) {
        setError(err.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    query && onFetchImage();
    isFirstLoading.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  const startNewQuery = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setResults([]);
    setTotalImages(0);
  };

  const onSubmitSearch = newQuery => {
    if (query === newQuery) {
      toast('The same query, try another one!');
      return;
    }
    startNewQuery(newQuery);
  };

  const onLoadMoreClick = () => {
    setPage(page + 1);
  };

  const getLargeImageURL = modalData => {
    setModalImg(modalData);
  };

  const closeModal = () => {
    setModalImg(null);
  };

  return (
    <div>
      <Searchbar onSubmit={onSubmitSearch} />
      <main>
        {results.length > 0 && (
          <ImageGallery result={results} getUrl={getLargeImageURL} />
        )}
        {isFirstLoading.current && <WelcomePage />}

        {!isFirstLoading.current && !results.length && !isLoading && (
          <NoResults query={query} />
        )}
        {isLoading && <Loader />}
        {totalImages !== results.length && !isLoading && (
          <Button onClick={onLoadMoreClick} />
        )}

        {modalImg && <Modal largeImg={modalImg} onClose={closeModal} />}
        <ToastContainer autoClose={3000} />
      </main>
    </div>
  );
};
