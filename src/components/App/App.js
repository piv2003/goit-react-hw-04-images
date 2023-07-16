import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ButtonLoadMore from 'components/Button/Button';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from 'components/ImageGallery';
import Searchbar from 'components/Searchbar';
import Loader from 'components/Loader';
import { Wrapper } from './App.styled';

export const fetchImages = async (pageNum = 1, searchQuerry = '') => {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = {
    key: '32855339-ad74b3f6db15cb4a86c5df500',
    q: searchQuerry,
    image_type: 'photo',
    page: pageNum,
    orientation: 'horizontal',
    per_page: 12,
  };
  const response = await axios.get(BASE_URL, { params });
  return response.data;
};

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [status, setStatus] = useState(Status.IDLE);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [isBtnLoadMoreVisible, setIsBtnLoadMoreVisible] = useState(false);

  useEffect(() => {
    if (searchQuery === '') return;

    setStatus(Status.PENDING);
    setIsBtnLoadMoreVisible(false);

    fetchImages(page, searchQuery)
      .then(images => {
        setImages(prevImages => [...prevImages, ...images.hits]);
        setStatus(Status.RESOLVED);
        setTotal(images.total);
        setIsBtnLoadMoreVisible(true);
      })
      .catch(() => {
        setStatus(Status.REJECTED);
      });
  }, [searchQuery, page]);

  useEffect(() => {
    if (status !== Status.RESOLVED) return;

    if (images.length === 0) {
      setStatus(Status.REJECTED);
      setIsBtnLoadMoreVisible(false);
      toast.error(`Oops! Nothing found. Enter another request`);
      return;
    }

    if (total > 0 && page === 1 && images.length > 0) {
      setStatus(Status.IDLE);
      toast.success(`Success! Found ${total} images`);
    }

    if (total <= images.length && page !== 1) {
      setStatus(Status.REJECTED);
      setIsBtnLoadMoreVisible(false);
      toast.warning("Sorry, there's nothing more to show");
    }
  }, [status, page, images, total]);

  function onBtnLoadMore() {
    setPage(prevPage => prevPage + 1);
  }

  return (
    <Wrapper>
      <Searchbar
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        resetPage={setPage}
        resetImages={setImages}
        setIsBtnLoadMoreVisible={setIsBtnLoadMoreVisible}
      />
      <ImageGallery images={images} page={page} />

      {isBtnLoadMoreVisible && <ButtonLoadMore onBtnLoadMore={onBtnLoadMore} />}

      {status === Status.PENDING && <Loader />}
      <ToastContainer autoClose={2500} theme="dark" />
    </Wrapper>
  );
}
