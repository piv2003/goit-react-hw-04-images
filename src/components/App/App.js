import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from 'components/ImageGallery';
import Searchbar from 'components/Searchbar';
import Modal from 'components/Modal';
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

  useEffect(() => {
    if (searchQuery === '') return;
    setStatus(Status.PENDING);
    fetchImagesByName(page, searchQuery)
      .then(images => {
        setImages(prevImages => [...prevImages, ...images.hits]);
        setStatus(Status.RESOLVED);
        setTotal(images.total);        
      })
      .catch(() => {
        setStatus(Status.REJECTED);
      });
  }, [searchQuery, page]);

useEffect(() => {
    if (status !== Status.RESOLVED) return;

    if (images.length === 0) {
      setStatus(Status.REJECTED);
      /* setIsBtnLoadMoreVisible(false); */
      toast.error(`Oops! Nothing found. Enter another request`);
      return;
    }

    if (totalHits > 0 && page === 1 && images.length > 0) {
      setStatus(Status.IDLE);
      toast.success(`Success! Found ${totalHits} images`);
    }

    if (totalHits <= images.length && page !== 1) {
      setStatus(Status.REJECTED);
      /* setIsBtnLoadMoreVisible(false); */
      toast.warning("Sorry, there's nothing more to show");
    }
  }, [status, page, images, totalHits]);





  render() {
    const { searchQuery, imgUrl, tags, showModal } = this.state;
    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleSubmit} searchQuery={searchQuery} />
        <ImageGallery
          onCardClick={this.onCardClick}
          searchQuery={searchQuery}
          onOpenModal={this.toggleModal}
        />
        {showModal && (
          <Modal onCloseModal={this.toggleModal}>
            {<img src={imgUrl} alt={tags} />}
          </Modal>
        )}
        <ToastContainer autoClose={2500} theme="dark" />
      </Wrapper>
    );
  }
}

export default App;
