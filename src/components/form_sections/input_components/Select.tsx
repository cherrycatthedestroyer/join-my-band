import {
  inputStyling,
  convertToLowerCamelCase,
} from "../../../../scripts/helper";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";

const Select: React.FC<{
  title: string;
  name: string;
  value: string | number;
  type: string;
  isValid: boolean;
  section: string;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    section: string
  ) => void;
  options: string[];
}> = ({ title, name, value, isValid, options }) => {
  return (
    <div>
      <Autocomplete
        disablePortal
        id={name}
        options={options}
        value={value as string}
        renderInput={(params) => (
          <TextField
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
