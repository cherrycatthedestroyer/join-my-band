import {
  convertToLowerCamelCase,
  inputStyling,
  invalidInputStyling,
  labelStyling,
} from "../../../../scripts/helper";

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
    <div>
      <label className={labelStyling}>{convertToLowerCamelCase(title)}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => handleChange(e)}
        className={isValid ? inputStyling : invalidInputStyling}
        placeholder={placeholder}
        maxLength={20}
      />
    </div>
  );
};

export default Input;
