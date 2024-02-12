import React, { useRef } from "react";

const ImageInput: React.FC<{
  onImageSelected: (img: string) => void;
  setImage: (img: string) => void;
}> = ({ onImageSelected }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function (e) {
        if (typeof reader.result === "string") onImageSelected(reader.result);
      };
    }
  };

  const onChooseImg = () => {
    inputRef.current!.click();
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleOnChange}
        style={{ display: "none" }}
      />

      <button className="btn" onClick={onChooseImg}>
        Choose Image
      </button>
    </div>
  );
};

export default ImageInput;
