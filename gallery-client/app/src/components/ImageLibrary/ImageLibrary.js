import React, { useEffect, useState } from "react";
import {getAllImages} from "../../api/images";
import "./ImageLibrary.css";

const BASE_URL = "http://127.0.0.1:5000/"

const ImageLibrary = ({ onImageSelect }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const images = await getAllImages();
      setImages(images);
    };
    fetchImages();
  }, []);

  const handleImageClick = (image) => {
    onImageSelect(image);
  };

  return (
    <div className="image-library">
      {Array.isArray(images) && images.map((image) => (
        <div
          key={image.image_path}
          className="image-thumbnail"
          onClick={() => handleImageClick(image)}
        >
          <img src={BASE_URL+image.thumb_path.replce("./gallery-server/", "")} alt={image.name} />
          <p>{image.name}</p>
          <p>{image.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageLibrary;