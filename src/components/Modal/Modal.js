import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalBox, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onCloseModal, imgUrl, tags }) {
  useEffect(() => {
    function handleEscDown(evt) {
      if (evt.code === 'Escape') {
        onCloseModal();
      }
    }
    window.addEventListener('keydown', handleEscDown);


Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};