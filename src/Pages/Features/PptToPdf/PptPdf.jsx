// src/components/FileUpload.js
import { useState } from 'react';
import axios from 'axios';
import { Spinner } from "keep-react";
const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);
  const [lodding,setLodding] = useState(true);
  const [lodFile,setLodFile] = useState(true);
  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    setLodFile(false);
    try {
      // Make the Axios request
      const response = await axios.post('http://localhost:5000/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLodding(false);
      console.log('File uploaded successfully:', response.data);
      // Handle success (you can update UI or perform other actions here)
    } catch (error) {
      console.error('Error uploading file:', error);
      setLodding(true)
      // Handle error (display an error message or take appropriate action)
    }
  };


  const handleDownload = async () => {
    try {
      setDownloading(true);

      const response = await axios.get('http://localhost:5000/convert', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.pdf');
      document.body.appendChild(link);
      link.click();

      setDownloading(false);
    } catch (error) {
      console.error('Error downloading file:', error);
      setError(error.message);
      setDownloading(false);
    }
  };
  return (
    <div className="p-36">
      <h2>Upload PowerPoint File</h2>
      <form onSubmit={handleSubmit}>
        <input accept=".doc, .docx" type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {
        lodFile? " " :  <div>
        {
          lodding? <Spinner color="info" size="xl" />
          : <button onClick={handleDownload} disabled={downloading}>
          {downloading ? 'Downloading...' : 'Download File'}
        </button>
        }
      
      {error && <div>Error: {error}</div>}
    </div>
      }
    </div>
  );
};

export default FileUpload;
