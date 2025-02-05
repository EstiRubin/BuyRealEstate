import React, { useEffect, useState } from "react";
import { fetchFilesForProject } from "../../api/apiService"; // מיובא מהקובץ apiService
import "./FileListViewer.css";

function FileListViewer({ projectId, isRecipe }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const data = await fetchFilesForProject(projectId, isRecipe); // קריאה לשירות
        console.log("Fetched Files:", data); // Log response

        const processedFiles = data.map((file) => {
          const base64Content = file.documentData;
          const blob = base64Content
            ? new Blob([Uint8Array.from(atob(base64Content), (char) => char.charCodeAt(0))], { type: "application/pdf" })
            : null;

          return {
            name: file.documentDescription || "Unnamed File",
            thumbnail: blob ? URL.createObjectURL(blob) : null,
            fullView: blob ? URL.createObjectURL(blob) : null,
          };
        });

        setFiles(processedFiles);
      } catch (error) {
        console.error("Error:", error.message);
        alert("Failed to load files.");
      }
    };

    fetchFiles();
  }, [projectId, isRecipe]);

  return (
    <div className="file-list-container">
      <div className="file-grid">
        {files.map((file, index) => (
          <div key={index} className="file-card">
            <h3 className="file-name">{file.name}</h3>
            {file.thumbnail ? (
              <iframe src={file.thumbnail} width="100%" height="150px" title={`Thumbnail for ${file.name}`}></iframe>
            ) : (
              <p>No preview available</p>
            )}
            <button
              onClick={() => window.open(file.fullView, "_blank")}
              className="view-button"
            >
              צפה בקובץ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileListViewer;
