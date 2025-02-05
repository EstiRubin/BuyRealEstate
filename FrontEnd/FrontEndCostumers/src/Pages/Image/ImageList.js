import React, { useEffect, useState } from "react";
import { fetchImagesForProject } from "../../api/apiService"; // מיובא מהקובץ apiService
import "./ImageList.css";

const ImageList = ({ projectId }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (!projectId) {
        setError("Project ID is not defined");
        return;
      }
      try {
        const imagesData = await fetchImagesForProject(projectId); // קריאה לשירות
        if (Array.isArray(imagesData)) {
          setImages(imagesData);
        } else {
          setError("Data format error: Images data is not an array");
        }
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Failed to fetch images");
      }
    };
    fetchImages();
  }, [projectId]);

  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="image-list-container">
      <div className="left-column">
        <div className="image-grid">
          {images.length > 0 ? (
            images.map((image) => (
              <div key={image.id} className="image-card">
                <img
                  src={`data:${image.fileType};base64,${image.imageData}`}
                  alt={image.imageDescription}
                  className="image"
                />
                <div className="image-description">{image.imageDescription}</div>
              </div>
            ))
          ) : (
            <p className="no-images">No images found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageList;
