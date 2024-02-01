const Downloadimg = ({ url, index, fileName, handleClose }) => {
  const downloadImage = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}_${index + 1}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // handleClose();
  };

  return (
    <div>
      <button onClick={downloadImage}>Download Image</button>
    </div>
  );
};

export default Downloadimg;
