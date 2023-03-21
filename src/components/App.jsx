import { useState, useEffect } from 'react';
import { GlobalStyles } from './GlobalStyles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../services/fetch';
import { Box } from './Box.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export const App = () => {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isMore, setIsMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (value.trim() === '') {
      return;
    }

    async function fetchImagesSearch() {
      try {
        setIsLoading(true);
        const res = await fetchImages(value, page);

        if (res.hits.length === 0) {
          toast.info(`Вибачте, але за запитом ${value} нічого не знайдено`);
        }
        if (res.hits.length !== 0) {
          setImages(prevState => [...prevState, ...res.hits]);
        }
        if (page === 1 && res.hits.length !== 0) {
          toast.success(`Знайдено ${res.totalHits} зображень`);
        }

        if (res.hits.length === 12 && res.totalHits > 12) {
          setIsMore(true);
        } else {
          setIsMore(false);
        }
        setIsLoading(false);
      } catch (error) {
        toast.info('Шкода, щось пішло не так. Спробуйте ще раз');
      }
    }
    fetchImagesSearch();
  }, [value, page]);

  const handleSubmit = value => {
    setValue(value);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Box>
      <Searchbar handleSubmit={handleSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} />
      {isMore && <Button onClick={loadMore} />}
      <ToastContainer autoClose={2000} theme={'dark'} />
      <GlobalStyles />
    </Box>
  );
};
