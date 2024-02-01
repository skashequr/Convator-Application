import { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import Loader from './Loader'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import Copy from './Coppy';
import toast from 'react-hot-toast';
import { Button } from "keep-react";
import { Progress } from "keep-react";
function ImgToText() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
//   const [language , setLanguage] = useState("eng");
  const [lan , setlan] = useState(false)
  const handleChange = (event) => {
    setIsLoading(true);
    setImage(URL.createObjectURL(event.target.files[0]))
    setIsLoading(false);

  }
  const deleteImage = () => {
    setIsLoading(true);
    setImage(null);
    setIsLoading(false);

  }
  const handleClick = () => {
    if (!image) {
     toast('Please upload the image!',{ icon: '❌'});
      return;
    }
    
    if (lan) {
        Tesseract.recognize(
            image, 'ben',
            {
              logger: m => { setProgress(parseInt(m.progress * 100)); }
            }
          )
            .catch(err => {
              console.error(err);
            })
            .then(result => {
              // Get Confidence score
              // let confidence = result.confidence
              // Get full output
              let text = result.data.text
              setText(text);
      
            })
    }
    else{
        Tesseract.recognize(
            image, 'eng',
            {
              logger: m => { setProgress(parseInt(m.progress * 100)); }
            }
          )
            .catch(err => {
              console.error(err);
            })
            .then(result => {
              // Get Confidence score
              // let confidence = result.confidence
              // Get full output
              let text = result.data.text
              setText(text);
      
            })
    }
  }


  useEffect(() => { setText(text); }, [text])

  return (
    <div className='text-textColor'>
      <div className='pt-36'>

      </div>
      <header>
        <h1 className='text-center font-semibold text-4xl  from-violet-950'>Image to Text Converter</h1>
      </header>
      <div className=''>
        <div  className='flex justify-center items-center flex-col p-6' >
        <Button onClick={()=>setlan(!lan)} size="md" color="info">{
                    lan? <span>English text Img Scan</span> : <span>Bangla text Img Scan</span>
                }</Button>
                
          {isLoading ? <Loader /> : <>
            {!image ? <>
              <label className='label'>
                <div className='file-inner-container'>
                  <div className='flex justify-center items-center'>
                  <MdCloudUpload className='upload-icon text-7xl' />
                  </div>
                  <p className='upload-text text-center'>Click here to upload</p>
                </div>
                <input type='file' name='uploadimage' onChange={handleChange} className='upload hidden' />
              </label>
            </> : <>
              <div className=''>
                <img src={image} alt="uploaded" className='h-[500px] w-auto p-3' />
                <div className='flex justify-center items-center'> < MdDelete className='text-5xl' onClick={deleteImage} /></div>
              </div>
            </>}
          </>}
        </div>
         <div className='flex items-center justify-center'>
         <button onClick={handleClick} className='btn p-3 bg-violet-950 rounded-xl mb-2'>Convert to text</button>
         </div>
        {progress < 100 && progress > 0 && <div>
          <div className=""> <Progress
                progress={progress}
                color="info"
                rounded={true}
                showPopupLabelProgress={true}
              /></div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }} ></div>
          </div>
        </div>}


        <div className='px-15'>
        {text && <div className="flex justify-center items-center p-5"> <Copy  text={text} /></div>}
        </div>
      </div>
    </div>
  );
}

export default ImgToText
