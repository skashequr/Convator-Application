import { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { GrRotateLeft, GrRotateRight } from "react-icons/gr";
import { CgMergeVertical, CgMergeHorizontal } from "react-icons/cg";
import { IoMdUndo, IoMdRedo, IoIosImage } from "react-icons/io";
import storeData from "./LinkedList";
import { Helmet } from "react-helmet-async";
// import ReactCrop, { type Crop } from 'react-image-crop'
const EditImg = () => {
  const [event, setEvent] = useState("brightness");
  const filterElement = [
    {
      name: "brightness",
      maxValue: 200,
    },
    {
      name: "grayscale",
      maxValue: 200,
    },
    {
      name: "sepia",
      maxValue: 200,
    },
    {
      name: "saturate",
      maxValue: 200,
    },
    {
      name: "contrast",
      maxValue: 200,
    },
    {
      name: "hueRotate",
    },
  ];
  const [property, setProperty] = useState({
    name: "brightness",
    maxValue: 200,
  });
  const [details, setDetails] = useState("");
  const [crop, setCrop] = useState("");
  const [state, setState] = useState({
    image: "",
    brightness: 100,
    grayscale: 0,
    sepia: 0,
    saturate: 100,
    contrast: 100,
    hueRotate: 0,
    rotate: 0,
    vartical: 1,
    horizental: 1,
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const leftRotate = () => {
    setState({
      ...state,
      rotate: state.rotate - 90,
    });

    const stateData = state;
    stateData.rotate = state.rotate - 90;
    storeData.insert(stateData);
  };

  const rightRotate = () => {
    setState({
      ...state,
      rotate: state.rotate + 90,
    });
    const stateData = state;
    stateData.rotate = state.rotate + 90;
    storeData.insert(stateData);
  };
  const varticalFlip = () => {
    setState({
      ...state,
      vartical: state.vartical === 1 ? -1 : 1,
    });
    const stateData = state;
    stateData.vartical = state.vartical === 1 ? -1 : 1;
    storeData.insert(stateData);
  };

  const horizentalFlip = () => {
    setState({
      ...state,
      horizental: state.horizental === 1 ? -1 : 1,
    });
    const stateData = state;
    stateData.horizental = state.horizental === 1 ? -1 : 1;
    storeData.insert(stateData);
  };

  const redo = () => {
    const data = storeData.redoEdit();
    if (data) {
      setState(data);
    }
  };
  const undo = () => {
    const data = storeData.undoEdit();
    if (data) {
      setState(data);
    }
  };
  const imageHandle = (e) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader();

      reader.onload = () => {
        setState({
          ...state,
          image: reader.result,
        });

        const stateData = {
          image: reader.result,
          brightness: 100,
          grayscale: 0,
          sepia: 0,
          saturate: 100,
          contrast: 100,
          hueRotate: 0,
          rotate: 0,
          vartical: 1,
          horizental: 1,
        };
        storeData.insert(stateData);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const imageCrop = () => {
    const canvas = document.createElement("canvas");
    const scaleX = details.naturalWidth / details.width;
    const scaleY = details.naturalHeight / details.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      details,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Url = canvas.toDataURL("image/jpg");

    setState({
      ...state,
      image: base64Url,
    });
  };
  const saveImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = details.naturalHeight;
    canvas.height = details.naturalHeight;
    const ctx = canvas.getContext("2d");

    ctx.filter = `brightness(${state.brightness}%) brightness(${state.brightness}%) sepia(${state.sepia}%) saturate(${state.saturate}%) contrast(${state.contrast}%) grayscale(${state.grayscale}%) hue-rotate(${state.hueRotate}deg)`;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((state.rotate * Math.PI) / 180);
    ctx.scale(state.vartical, state.horizental);

    ctx.drawImage(
      details,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );

    const link = document.createElement("a");
    link.download = "image_edit.jpg";
    link.href = canvas.toDataURL();
    link.click();
  };
  return (
    <div>
      <Helmet>
        <title>image-Edit</title>
      </Helmet>
      <div className="">
        <div>
          <h2 className="text-center font-extralight text-6xl mb-6">
            {" "}
            Image Editor{" "}
          </h2>
        </div>
        <div className="flex items-center justify-center gap-6">
          <div className="">
            <div>
              <div className="filter_section">
                <span className="font-bold text-3xl text-center">Filters</span>
                <div className="grid grid-cols-2 gap-3">
                  {filterElement.map((v, i) => (
                    <button
                      className={
                        property.name === v.name
                          ? " bg-red-900 px-8 py-3 m-1 rounded-xl"
                          : "bg-red-200 px-8 py-3 m-1 rounded-xl"
                      }
                      onClick={() => {
                        setProperty(v);
                        setEvent(v.name);
                      }}
                      key={i}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <label className="font-bold text-xl" htmlFor="range">
                    {event}
                  </label>
                  <span>Max 100%</span>
                </div>
                <input
                  name={property.name}
                  onChange={inputHandle}
                  value={state[property.name]}
                  max={property.maxValue}
                  type="range"
                  className="w-full"
                />
              </div>
              <div>
                <label className="font-bold text-lg mt-6">Rotate & Filp</label>
                <div className="flex justify-between items-center">
                  <div
                    className="px-5 py-3 border border-orange-300"
                    onClick={leftRotate}
                  >
                    <GrRotateLeft />
                  </div>
                  <div
                    className="px-5 py-3 border border-orange-300"
                    onClick={rightRotate}
                  >
                    <GrRotateRight />
                  </div>
                  <div
                    className="px-5 py-3 border border-orange-300"
                    onClick={varticalFlip}
                  >
                    <CgMergeVertical />
                  </div>
                  <div
                    className="px-5 py-3 border border-orange-300"
                    onClick={horizentalFlip}
                  >
                    <CgMergeHorizontal />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center ">
              <button
                onClick={saveImage}
                className="px-6 py-3 bg-orange-200 mt-4"
              >
                Save Image
              </button>
            </div>
          </div>
          <div className="w-[550px] border border-cyan-950">
            <div className="">
              {state.image ? (
                <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
                  <img
                    className="max-w-96 h-[500px]"
                    onLoad={(e) => setDetails(e.currentTarget)}
                    style={{
                      filter: `brightness(${state.brightness}%) brightness(${state.brightness}%) sepia(${state.sepia}%) saturate(${state.saturate}%) contrast(${state.contrast}%) grayscale(${state.grayscale}%) hue-rotate(${state.hueRotate}deg)`,
                      transform: `rotate(${state.rotate}deg) scale(${state.vartical},${state.horizental})`,
                    }}
                    src={state.image}
                    alt=""
                  />
                </ReactCrop>
              ) : (
                <label
                  htmlFor="choose"
                  className="flex justify-center items-center flex-col"
                >
                  <IoIosImage size={120} />
                  <label htmlFor="choose" className="">
                    Choose Image
                  </label>
                </label>
              )}
            </div>
            <div className="flex items-center justify-center mt-7 border gap-6">
              <button onClick={undo} className="px-4 py-2 bg-slate-500">
                <IoMdUndo />
              </button>
              <button onClick={redo} className="px-4 py-2 bg-slate-500">
                <IoMdRedo />
              </button>
              {crop && (
                <button onClick={imageCrop} className="px-4 py-2 bg-slate-500">
                  Crop Image
                </button>
              )}
              <label htmlFor="choose" className="px-4 py-2 bg-slate-500">
                Choose Image
              </label>
              <input
                className="hidden"
                onChange={imageHandle}
                type="file"
                id="choose"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditImg;
