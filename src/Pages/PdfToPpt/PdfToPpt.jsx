import axios from 'axios';
import { useState } from 'react';

const PdfToPpt = () => {
    const [file, setFile] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
          // Make the Axios request
          const response = await axios.post('http://localhost:5000/convert/pdftoppt', formData, {
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
      const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
    
    return (
        <div>
             <div className='p-36'>
      <h2>Upload PowerPoint File</h2>
      <form onSubmit={handleSubmit}>
        <input accept="" type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
        </div>
    );
};

export default PdfToPpt;

