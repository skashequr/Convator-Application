// frontend/src/components/PdfToPPT.js
import React, { useState } from 'react';
import axios from 'axios';

const PdfToPPT = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("selectedFile", selectedFile);

      const response = await axios.put("http://localhost:5000/convert", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      alert("File Uploaded Successfully");
      console.log(response);
    } catch (error) {
      alert("Error uploading file: " + error.message);
      console.error(error);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log(file);
  };

  return (
    <div className="p-36">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileSelect} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PdfToPPT;
