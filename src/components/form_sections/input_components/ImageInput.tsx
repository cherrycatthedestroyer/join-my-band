import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { cropButtonStyling, formHeader } from "../../../../scripts/helper";
import Button from "./Button";

const ImageInput: React.FC<{
  onImageSelected: (img: string) => void;
  setImage: (img: string) => void;
  clearImage: () => void;
  imageFile: string;
}> = ({ onImageSelected, imageFile, clearImage }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          if (img.width >= 600 && img.height >= 600) {
            if (typeof reader.result === "string") {
              onImageSelected(reader.result);
            }
          } else {
            handleClickOpen();
            if (inputRef.current) {
              inputRef.current.value = "";
            }
          }
        };
        img.src = URL.createObjectURL(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const onChooseImg = () => {
    inputRef.current!.click();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <h2 className={formHeader}>Image too small</h2>
          <p>
            Please select an image with dimensions greater than or equal to
            600x600 px.
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            handleClick={handleClose}
            name={"continue"}
            enabled
            direction=""
          />
        </DialogActions>
      </Dialog>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleOnChange}
        style={{ display: "none" }}
      />
      <button
        className={`block text-xs mb-2 ${
          imageFile !== "" ? "text-red-500" : "text-blue-500"
        }`}
        type="button"
        onClick={imageFile !== "" ? clearImage : onChooseImg}
      >
        {imageFile !== ""
          ? "remove profile photo"
          : "+ apply with profile photo"}
      </button>
    </div>
  );
};

export default ImageInput;
