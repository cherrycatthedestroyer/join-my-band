import { Autocomplete, TextField } from "@mui/material";
import {
  convertToLowerCamelCase,
  inputStyling,
} from "../../../../scripts/helper";

const Select: React.FC<{
  title: string;
  name: string;
  value: string;
  type: string;
  isValid: boolean;
  section: string;
  handleChange: (value: string, name: string) => void;
  options: string[];
}> = ({ title, name, value, isValid, options, handleChange, section }) => {
  function handleOnChange(value: string | null) {
    if (value !== null) {
      handleChange(value, name);
    }
  }
  return (
    <div>
      <Autocomplete
        disablePortal
        id={name}
        options={options}
        value={value}
        onChange={(_, value) => handleOnChange(value)}
        renderInput={(params) => (
          <TextField
            type="text"
            margin="normal"
            className={inputStyling}
            name={name}
            label={convertToLowerCamelCase(title)}
            error={isValid ? false : true}
            {...params}
          />
        )}
      />
    </div>
  );
};

export default Select;
