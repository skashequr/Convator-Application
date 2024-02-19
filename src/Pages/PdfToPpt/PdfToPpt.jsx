import axios from 'axios';
import { useState } from 'react';

const PdfToPpt = () => {
  const [file, setFile] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('http://localhost:5000/convert/pdftoppt', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await axios.get('http://localhost:5000/convert/getppt', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'converted.pptx');
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
    <div>
      <div className='p-36'>
        <h2>Upload PDF File</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit" disabled={loading}>Upload</button>
        </form>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        <button onClick={handleDownload} disabled={downloading || loading}>
          {downloading ? 'Downloading...' : 'Download PowerPoint'}
        </button>
      </div>
    </div>
  );
};

export default PdfToPpt;
