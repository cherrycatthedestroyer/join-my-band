import {
  convertToLowerCamelCase,
  inputStyling,
  invalidInputStyling,
  labelStyling,
} from "../../../../scripts/helper";
import { TextField } from "@mui/material";

const Input: React.FC<{
  title: string;
  name: string;
  value: string | number;
  type: string;
  isValid: boolean;
  section: string;
  placeholder: string;
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}> = ({
  title,
  name,
  value,
  type,
  isValid,
  handleChange,
  section,
  placeholder,
}) => {
  return (
    <TextField
      id="outlined-basic"
      label={convertToLowerCamelCase(title)}
      variant="outlined"
      type={type}
      className={inputStyling}
      margin="normal"
      name={name}
      value={value}
      onChange={(e) => handleChange(e)}
      maxRows={1}
      error={isValid ? false : true}
    />
  );
};

export default Input;

//<label className={labelStyling}>{convertToLowerCamelCase(title)}</label>
