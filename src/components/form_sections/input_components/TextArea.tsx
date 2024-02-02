import {
  labelStyling,
  inputStyling,
  invalidInputStyling,
  convertToLowerCamelCase,
} from "../../../../scripts/helper";

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
    <div>
      <label className={labelStyling}>{convertToLowerCamelCase(title)}</label>
      <textarea
        name={name}
        value={value}
        onChange={(e) => handleChange(e)}
        cols={10}
        rows={3}
        className={isValid ? inputStyling : invalidInputStyling}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextArea;
