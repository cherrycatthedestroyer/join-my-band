import Input from "@/components/form_sections/input_components/Input";
import Select from "./input_components/Select";
import Button from "./input_components/Button";

import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../store/actions";
import useWindowDimensions, {
  formHeader,
  formHeaderInactive,
} from "../../../scripts/helper";
import { useState } from "react";
import { Area } from "react-easy-crop";
import ImageCropper from "@/components/form_sections/input_components/Cropper";
import ImageInput from "@/components/form_sections/input_components/ImageInput";
import { Box, Container, Modal } from "@mui/material";

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
  borderRadius: "5px",
};

const PersonalInfo: React.FC<PropsFromRedux> = ({
  stateList,
  setInputPersonal,
  setPersonalOpen,
  setInstrumentOpen,
}) => {
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [imgAfterCrop, setImgAfterCrop] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  // Invoked when new image file is selected
  const onImageSelected = (selectedImg: string) => {
    setImage(selectedImg);
    handleOpen();
  };

  // Generating Cropped Image When Done Button Clicked
  const onCropDone = (imgCroppedArea: Area) => {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext("2d");

    let imageObj1 = new Image(600, 600);
    imageObj1.src = image;
    imageObj1.onload = function () {
      context!.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );

      const dataURL = canvasEle.toDataURL("image/jpeg");
      setImgAfterCrop(dataURL);
      setInputPersonal(dataURL, "image");
    };
    handleClose();
  };

  // Handle Cancel Button Click
  const onCropCancel = () => {
    handleClose();
    setImage("");
  };

  function clearImage() {
    setImage("");
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setInputPersonal(value, name);
  }

  function handleSelectChange(value: string, name: string) {
    setInputPersonal(value, name);
  }

  function handleClick() {
    setPersonalOpen(false);
    setInstrumentOpen(true);
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="z-100">Crop Your image</h2>
          <ImageCropper
            image={image}
            onCropDone={onCropDone}
            onCropCancel={onCropCancel}
          />
        </Box>
      </Modal>
      {width >= 768 || (width < 768 && stateList.personal_isOpen) ? (
        <h1
          className={
            stateList.personal_isOpen ? formHeader : formHeaderInactive
          }
        >
          1. Personal Details
        </h1>
      ) : undefined}
      <Input
        title={stateList.personal.performer_name.name}
        name={stateList.personal.performer_name.name}
        value={stateList.personal.performer_name.value}
        isValid={stateList.personal.performer_name.isValid}
        handleChange={handleChange}
        section={stateList.personal.performer_name.section_name}
        placeholder={stateList.personal.performer_name.placeholder}
        type="text"
      />
      <div className="flex gap-x-10">
        <Input
          title={stateList.personal.age.name}
          name={stateList.personal.age.name}
          value={stateList.personal.age.value}
          isValid={stateList.personal.age.isValid}
          handleChange={handleChange}
          section={stateList.personal.age.section_name}
          placeholder={stateList.personal.age.placeholder}
          type="number"
        />
        <div className="w-full">
          <Select
            title={stateList.personal.transport.name}
            name={stateList.personal.transport.name}
            value={stateList.personal.transport.value}
            isValid={stateList.personal.transport.isValid}
            handleChange={handleSelectChange}
            section={stateList.personal.transport.section_name}
            type="number"
            options={["Car", "Train", "Taxi", "Horse"]}
          />
        </div>
      </div>
      <div>
        <Input
          title={stateList.personal.contact.name}
          name={stateList.personal.contact.name}
          value={stateList.personal.contact.value}
          isValid={stateList.personal.contact.isValid}
          handleChange={handleChange}
          section={stateList.personal.contact.section_name}
          placeholder={stateList.personal.contact.placeholder}
          type="text"
        />
      </div>
      <div className="flex justify-between">
        <ImageInput
          setImage={setImage}
          onImageSelected={onImageSelected}
          imageFile={image}
          clearImage={clearImage}
        />
      </div>
      <div className="flex gap-2 justify-end mt-4">
        <Button
          name={width >= 768 ? "continue to instruments" : "to instruments"}
          direction="next"
          handleClick={handleClick}
          enabled={
            stateList.personal.performer_name.value.trim().length > 0 &&
            stateList.personal.contact.value.trim().length > 0 &&
            stateList.personal.transport.value.trim().length > 0
              ? true
              : false
          }
        />
      </div>
    </>
  );
};

// Connect the component to the Redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

// Generate props types for the connected component
type PropsFromRedux = ConnectedProps<typeof connector>;

// Export the connected component
export default connector(PersonalInfo);
