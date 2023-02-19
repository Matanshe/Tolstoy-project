import React, { useState, useEffect } from "react";
import "./App.css";
import ImageUploader from "./components/ImageUpload/ImageUpload";
import ImageLibrary from "./components/ImageLibrary/ImageLibrary";
import ImageViewer from "./components/ImageViewer/ImageViewer";
import { getAllImages } from "./api/images";
import {deleteImage} from "./api/delete"
import {uploadImage} from "./api/upload"



const Container = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleImageUpload = async (formData) => {
    try {
      const response = await uploadImage(formData);
      setSuccessMessage("Image uploaded");
      setErrorMessage("");
      fetchImages();
    } catch {
      setSuccessMessage("");
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleImageClose = () => {
    setSelectedImage(null);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const HandleDeleteImage = async (image) => {
    try {
      const delete_resp = await deleteImage(image.id);
      setSuccessMessage("Image deleted successfully");
      setErrorMessage("");
      fetchImages();
    } catch (error) {
      console.log(error);
      setSuccessMessage("");
      setErrorMessage("An error occurred. Please try again later.");
    }
    handleImageClose();
  };

  const fetchImages = async () => {
    try {
      const images_resp = await getAllImages();
      setImages(images_resp.images);
      setErrorMessage("");
    } catch {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="App">
      <h1>Image Library</h1>
      <ImageUploader imageUpload={handleImageUpload} />
      {errorMessage && <div>{errorMessage}</div>}
      {successMessage && <div>{successMessage}</div>}
      <ImageLibrary images={images} onImageSelect={handleImageSelect} />
      <ImageViewer
        HandleDeleteImage={HandleDeleteImage}
        errorMessage={errorMessage}
        image={selectedImage}
        onClose={handleImageClose}
      />
    </div>
  );
};

export default Container;