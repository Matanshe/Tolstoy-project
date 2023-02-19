import React from "react";
import Modal from "react-modal";

import "./ImageViewer.css";

const BASE_URL = "http://127.0.0.1:5000/"

const ImageViewer = (props) => {
  const image = props.image
  return (
    <Modal
      isOpen={!!image}
      onRequestClose={props.onClose}
      contentLabel="Image Viewer"
    >
      {image && (
        <div>
          <img src={BASE_URL + image.image_path.replace("./gallery-server/", "")} alt={image.name} />
          <p>
            <b>{image.name} &nbsp; </b> 
            <span>{image.description}</span>
          </p>
          <button onClick={props.onClose}>Close</button>
          <button onClick={() => props.HandleDeleteImage(image)}>delete</button>
        </div>
      )}
    </Modal>
  );
};

export default ImageViewer;
