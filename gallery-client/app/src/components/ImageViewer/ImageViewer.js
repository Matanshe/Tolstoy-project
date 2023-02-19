import React, { useState } from "react";
import Modal from "react-modal";
import {deleteImage} from "../../api/delete";

import "./ImageViewer.css";

const BASE_URL = "http://127.0.0.1:5000/"

const ImageViewer = ({ image, onClose }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const HandleDeleteImage = async (image) => {
    debugger;
    try{
      const delete_resp = await deleteImage(image.id);
      onClose()
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  }     
  

  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      contentLabel="Image Viewer"
    >
      {image && (
        <div>
          <button onClick={onClose}>Close</button>
          <button onClick={() => HandleDeleteImage(image)}>delete</button>
          <img src={BASE_URL+image.image_path.replace("./gallery-server/", "")} alt={image.name} />
          <p>{image.name}</p>
          <p>{image.description}</p>
          {errorMessage && <div>{errorMessage}</div>}
        </div>
      )}
    </Modal>
  );
};

export default ImageViewer;
