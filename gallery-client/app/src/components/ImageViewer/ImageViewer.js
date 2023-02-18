import React from "react";
import Modal from "react-modal";
import "./ImageViewer.css";

const BASE_URL = "http://127.0.0.1:5000/"

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
          <img src={BASE_URL+image.path.replce("./gallery-server/", "")} alt={image.name} />
          <p>{image.name}</p>
          <p>{image.description}</p>
        </div>
      )}
    </Modal>
  );
};

export default ImageViewer;
