
import axios from 'axios';
import { useState } from 'react';

const Mp4toMp3 = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/convert/mp4tomp3', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Handle response, maybe display a link to download the converted file
    } catch (error) {
      console.error('Error converting file:', error);
    }
  };

  return (
    <div className='p-36'>
      <h1>MP4 to MP3 Converter</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="video/mp4" onChange={handleFileChange} />
        <button type="submit">Convert</button>
      </form>
    </div>
  );
};

export default Mp4toMp3;
