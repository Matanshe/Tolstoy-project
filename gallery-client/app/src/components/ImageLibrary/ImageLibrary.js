import React, { useEffect, useState } from "react";
import {getAllImages} from "../../api/images";
import "./ImageLibrary.css";

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
      {images.map((image) => (
        <div
          key={image.image_path}
          className="image-thumbnail"
          onClick={() => handleImageClick(image)}
        >
          <img src={image.thumb_path} alt={image.name} />
          <p>{image.name}</p>
          <p>{image.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageLibrary;