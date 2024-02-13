// src/components/FileUpload.js
import { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Make the Axios request
      const response = await axios.post('http://localhost:5000/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);
      // Handle success (you can update UI or perform other actions here)
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error (display an error message or take appropriate action)
    }
  };

  return (
    <div className='p-36'>
      <h2>Upload PowerPoint File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUpload;
