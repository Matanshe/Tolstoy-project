import React, { useState } from "react";
import ImageUploader from "./components/ImageUpload";
import ImageLibrary from "./components/ImageLibrary";
import ImageViewer from "./components/ImageViewer";
import "./App.css";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleImageClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <h1>Image Library</h1>
      <ImageUploader />
      <ImageLibrary onImageSelect={handleImageSelect} />
      <ImageViewer image={selectedImage} onClose={handleImageClose} />
    </div>
  );
};

export default App;
