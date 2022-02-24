import React, { useState } from 'react';
import Button from '@components/Button';
import RandomTray from '@assets/img_tray.png';
import { RandomDrawContainer, Step } from './styles';
import Modal from '../../components/Modals/Modal';

function RandomDraw() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <RandomDrawContainer>
      <div className="tray_wrapper">
        <img src={RandomTray} className="img_randomtray" alt="random tray" />
        <h1>Pick what you want to eat!</h1>
      </div>

      <div className="step_wrapper">
        <Step>
          <span>Step 1</span>
          <Button text="Pick Randomly"></Button>
        </Step>
        <Step>
          <span>Step 2</span>
          <Button text="Upload Receipt" onClick={openModal}></Button>
          <Modal open={modalOpen} close={closeModal} header="Upload Receipt">
            모달
          </Modal>
        </Step>
        <Step>
          <span>Step 3</span>
          <Button text="Get NFT"></Button>
        </Step>
      </div>
    </RandomDrawContainer>
  );
}

export default RandomDraw;
