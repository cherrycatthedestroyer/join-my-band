import React, { ChangeEvent, DOMElement, FormEvent, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { buttonStyling } from "../../../../scripts/helper";

interface CropperProps {
  image: string;
  onCropDone: (area: Area) => void;
  onCropCancel: () => void;
}

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
  const [aspectRatio, setAspectRatio] = useState(4 / 3);

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
              marginLeft: "auto",
              marginRight: "auto",
              height: "50%",
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
            },
          }}
        />
      </div>
      <div className="absolute">
        <button type="button" className={buttonStyling} onClick={onCropCancel}>
          Cancel
        </button>

        <button
          className={buttonStyling}
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
