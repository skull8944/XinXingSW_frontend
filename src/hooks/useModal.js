import { useState } from 'react';

const useModal = (initData) => {
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState(initData);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const openModal = (data) => {
    setVisible(true);
    setModalData(data);
  };

  const closeModal = () => {
    setVisible(false);
    setModalData(initData);
  };

  return {
    visible,
    setVisible,
    modalData,
    setModalData,
    confirmLoading,
    setConfirmLoading,
    openModal,
    closeModal,
  };
};

export default useModal;