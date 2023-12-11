import { useState } from 'react';

const useModal = () => {
  const [isOpenModal, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // You might want to add a function to toggle the modal state
  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return { isOpenModal, openModal, closeModal, toggleModal };
};

export default useModal;
