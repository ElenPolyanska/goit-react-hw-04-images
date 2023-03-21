import { useState } from 'react';
import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState.isModalOpen);
  };

  return (
    <Item>
      <Image onClick={toggleModal} src={webformatURL} alt={tags} />
      {isModalOpen && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          toggleModal={toggleModal}
        />
      )}
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
