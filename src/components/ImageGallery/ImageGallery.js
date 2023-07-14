import PropTypes from 'prop-types';
import { ImageGalleryBox } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem';

export default function ImageGallery({ images }) {
  return (
    <>
      <ImageGalleryBox>
        {images.map(({ id, tags, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              tags={tags}
              smallImageURL={webformatURL}
              largeImageURL={largeImageURL}
            />
          );
        })}
      </ImageGalleryBox>
    </>
  );
}

ImageGallery.propTypes = {
  onCardClick: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
