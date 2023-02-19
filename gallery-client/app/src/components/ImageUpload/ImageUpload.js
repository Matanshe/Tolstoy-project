import React, { useState } from "react";

const ImageUpload = (props) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("description", description);

    try {
      props.imageUpload(formData)
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
        <label htmlFor="file">Select an image file:</label>
        <input type="file" id="file" accept="image/*" onChange={handleFileChange} />
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
        />
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <button type="submit">Save</button>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
    </div>

  );
};

export default ImageUpload;