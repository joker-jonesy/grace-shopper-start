import motion from 'framer-motion'
import { useEffect } from 'react';
import React from 'react';
import Backdrop from '../Backdrop/index.jsx';

const flip = {
    hidden: {
      transform: "scale(0) rotateX(-360deg)",
      opacity: 0,
      transition: {
        delay: 0.3,
      },
    },
    visible: {
      transform: " scale(1) rotateX(0deg)",
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      transform: "scale(0) rotateX(360deg)",
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const Modal = ({ handleClose, text, type }) => {
  
    return (
      <Backdrop onClick={handleClose}>
        {type === "flip" && (
          <motion.div
            onClick={(e) => e.stopPropagation()}   
            className="modal  orange-gradient"
            variants={flip}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ModalText text={text} />
            <ModalButton onClick={handleClose} label="Close" />
          </motion.div>
        )}
        </Backdrop>
    );
};

const ModalText = ({ text }) => (
    <div className="modal-text">
      <h3>{text}</h3>
      <h5>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laboriosam labore, totam
        expedita voluptates tempore asperiores sequi, alias cum veritatis, minima dolor iste similique
        eos id. Porro, culpa? Officiis, placeat?
      </h5>
    </div>
);

const ModalButton = ({ onClick, label }) => (
    <motion.button
      className="modal-button"
      type="button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {label}
    </motion.button>
);

export default Modal;