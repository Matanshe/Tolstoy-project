import React from "react";
import "./ImageLibrary.css";

const BASE_URL = "http://127.0.0.1:5000/"

const ImageLibrary = (props) => {

  const handleImageClick = (image) => {
    props.onImageSelect(image);
  };

  return (
    <div className="image-library">
      {Array.isArray(props.images) && props.images.map((image) => (
        <div
          key={image.id}
          className="image-thumbnail"
          onClick={() => handleImageClick(image)}
        >
          <img src={BASE_URL + image.thumb_path.replace("./gallery-server/", "")} alt={image.name} />
          <p>
            <b>{image.name}&nbsp;</b>
            <span>{image.description}</span>
          </p>

        </div>
      ))}
    </div>
  );
};

export default ImageLibrary;