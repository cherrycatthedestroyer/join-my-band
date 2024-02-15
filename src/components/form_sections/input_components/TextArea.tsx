import { inputStyling } from "../../../../scripts/helper";
import { TextField } from "@mui/material";

const TextArea: React.FC<{
  title: string;
  name: string;
  value: string | number;
  isValid: boolean;
  section: string;
  placeholder: string;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}> = ({ title, name, value, isValid, handleChange, section, placeholder }) => {
  return (
    <TextField
      name={name}
      value={value}
      onChange={(e) => handleChange(e)}
      className={inputStyling}
      id="outlined-multiline-flexible"
      margin="normal"
      label={title}
      multiline
      error={isValid ? false : true}
      maxRows={3}
      placeholder={placeholder}
    />
  );
};

export default TextArea;
