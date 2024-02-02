import { ReactNode } from "react";
import {
  labelStyling,
  inputStyling,
  invalidInputStyling,
  convertToLowerCamelCase,
} from "../../../../scripts/helper";

const Select: React.FC<{
  title: string;
  name: string;
  value: string | number;
  type: string;
  isValid: boolean;
  section: string;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    section: string
  ) => void;
  children: ReactNode;
}> = ({
  title,
  name,
  value,
  type,
  isValid,
  handleChange,
  section,
  children,
}) => {
  return (
    <div>
      <label className={labelStyling}>{convertToLowerCamelCase(title)}</label>
      <select
        name={name}
        value={value}
        onChange={(e) => handleChange(e, section)}
        className={isValid ? inputStyling : invalidInputStyling}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
