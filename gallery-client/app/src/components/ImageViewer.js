import React from "react";
import Modal from "react-modal";
import "./ImageViewer.css";


const ImageViewer = ({ image, onClose }) => {
  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      contentLabel="Image Viewer"
    >
      {image && (
        <div>
          <button onClick={onClose}>Close</button>
          <img src={image.url} alt={image.name} />
          <p>{image.name}</p>
          <p>{image.description}</p>
        </div>
      )}
    </Modal>
  );
};

export default ImageViewer;
