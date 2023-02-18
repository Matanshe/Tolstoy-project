import React, { useState } from "react";
import {uploadImage} from "../../api/upload";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successState, setSuccess] = useState(false);


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setErrorMessage("");
    } else {
      setFile(null);
      setErrorMessage("Please select a valid image file");
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setErrorMessage("Please select an image file");
      return;
    }
    debugger;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("description", description);

    try {
      const response = await uploadImage(formData);
      setSuccess(true)
      setFile(null);
      setName("");
      setDescription("");
      setErrorMessage("");
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Select an image file:</label>
          <input type="file" id="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
        {errorMessage && <div>{errorMessage}</div>}
        {successState && <div>Uploaded successful</div>}
      </form>
    </div>
  );
};

export default ImageUpload;