import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./ImageLibrary.css";

const ImageLibrary = ({ onImageSelect }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:5000/api/images");
                setImages(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchImages();
    }, []);

    const handleImageClick = (image) => {
        onImageSelect(image);
    };
    console.log(images);

    console.log("Images state:", images);

    return (
        <div>
            <div>
                test
                {images.length > 0 && (
                    <div key={images[0].image_path} onClick={() => handleImageClick(images[0])}>
                        <img src={images[0].thumb_path} alt={images[0].name} />
                        <p>{images[0].name}</p>
                        <p>{images[0].description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageLibrary;
