import React, { ChangeEvent, DOMElement, FormEvent, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { buttonStyling, cropButtonStyling } from "../../../../scripts/helper";

interface CropperProps {
  image: string;
  onCropDone: (area: Area) => void;
  onCropCancel: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ImageCropper: React.FC<CropperProps> = ({
  image,
  onCropDone,
  onCropCancel,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [aspectRatio, setAspectRatio] = useState(1 / 1);

  const onCropComplete = (
    croppedAreaPercentage: Area,
    croppedAreaPixels: Area
  ) => {
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <div>
      <div>
        <Cropper
          image={image}
          aspect={aspectRatio}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              width: "100%",
              height: "80%",
              backgroundColor: "#fff",
              borderRadius: "0px, 0px, 10px, 10px",
            },
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: 4,
          position: "absolute",
          justifyContent: "between",
          alignItems: "center",
          top: "85%",
          left: "0%",
        }}
      >
        <p className="block text-stone-500 text-xs ml-4 mr-20 mb-2">
          crop your image
        </p>
        <button type="button" className={buttonStyling} onClick={onCropCancel}>
          Cancel
        </button>

        <button
          className={cropButtonStyling}
          type="button"
          onClick={() => {
            onCropDone(croppedArea);
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;
