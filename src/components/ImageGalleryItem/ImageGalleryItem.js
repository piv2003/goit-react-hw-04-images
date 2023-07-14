import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageItem } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal';

export default function ImageGalleryItem({
  tags,
  smallImageURL,
  largeImageURL,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ImageItem onClick={toggleModal}>
        <img src={smallImageURL} alt={tags} />
      </ImageItem>
      {showModal && (
        <Modal onCloseModal={toggleModal} imgUrl={largeImageURL} tags={tags} />
      )}
    </>
  );
}
