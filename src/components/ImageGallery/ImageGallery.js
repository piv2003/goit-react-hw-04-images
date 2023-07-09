import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchImages } from '../App/App';
import { ImageGalleryBox } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';
import ButtonLoadMore from 'components/Button';
import Loader from 'components/Loader';
import { toast } from 'react-toastify';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  state = {
    status: Status.IDLE,
    error: null,
    page: 1,
    images: [],
    total: null,
  };

  async componentDidUpdate(prevProps, _) {
    try {
      const prevImgName = prevProps.searchQuery;
      const nextImgName = this.props.searchQuery;

      if (prevImgName !== nextImgName) {
        this.setState({
          images: [],
          page: 1,
          status: Status.PENDING,
        });

        const images = await fetchImages(1, nextImgName);

        this.setState({
          page: this.state.page + 1,
          status: Status.RESOLVED,
          images: images.hits,
          total: images.total,
        });
        if (images.total > 0 && images.total <= 10) {
          toast.warning("Sorry, there's nothing more to show");
        }
        if (images.total > 0) {
          toast.success(`Success! Found ${images.total} images`);
        }
        if (images.total === 0) {
          toast.error(`Oops! Nothing found. Enter another request`);
        }
      }
    } catch (error) {
      this.setState({
        error,
        status: Status.REJECTED,
      });
    }
  }

  onBtnLoadMore = () => {
    const imgQuery = this.props.searchQuery;
    const nextPage = this.state.page;

    this.setState({
      status: Status.PENDING,
    });
    fetchImages(nextPage, imgQuery)
      .then(nextImages => {
        this.setState({
          page: nextPage + 1,
          status: Status.RESOLVED,
          images: [...this.state.images, ...nextImages.hits],
        });
        if (
          nextImages.total === this.state.images.length ||
          nextImages.total < this.state.images.length + nextImages.hits.length
        ) {
          toast.error(`Sorry we have nothing more to show you.`);
        }
      })
      .catch(error =>
        this.setState({
          error,
          status: Status.REJECTED,
        })
      );
  };

  onCardClick = e => {
    if (e.currentTarget !== e.target) {
      const currentImageUrl = e.target.currentSrc;
      const imageArr = this.state.images.filter(
        ({ webformatURL }) => webformatURL === currentImageUrl
      );
      const largeImageURL = imageArr[0].largeImageURL;
      const imageTags = imageArr[0].tags;

      this.props.onCardClick(largeImageURL, imageTags);
      this.props.onOpenModal();
    }
  };

  render() {
    const { status, images, total } = this.state;

    return (
      <>
        <ImageGalleryBox onClick={this.onCardClick}>
          {images.map(({ id, webformatURL, tags }) => {
            return (
              <ImageGalleryItem
                key={id}
                smallImageURL={webformatURL}
                tags={tags}
              />
            );
          })}
        </ImageGalleryBox>
        {status === Status.RESOLVED &&
          images.length !== total &&
          images.length < total && (
            <ButtonLoadMore onBtnLoadMore={this.onBtnLoadMore} />
          )}
        {status === Status.PENDING && <Loader />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  onCardClick: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
