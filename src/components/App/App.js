import React, { Component } from 'react';
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

class App extends Component {
  state = {
    searchQuery: '',
    imgUrl: '',
    tags: '',
    showModal: false,
  };

  handleSubmit = searchQuery => {
    this.setState({
      searchQuery,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onCardClick = (largeImageUrl, imageTags) => {
    this.setState({
      imgUrl: largeImageUrl,
      tags: imageTags,
    });
  };

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
