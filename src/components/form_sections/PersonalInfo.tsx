import Input from "@/components/form_sections/input_components/Input";
import Select from "./input_components/Select";
import Button from "./input_components/Button";

import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../store/actions";
import useWindowDimensions from "../../../scripts/helper";

const PersonalInfo: React.FC<PropsFromRedux> = ({
  stateList,
  setInputPersonal,
  setPersonalOpen,
  setInstrumentOpen,
}) => {
  const { width } = useWindowDimensions();
  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setInputPersonal(value, name);
  }

  function handleClick() {
    setPersonalOpen(false);
    setInstrumentOpen(true);
  }

  return (
    <>
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
            handleChange={handleChange}
            section={stateList.personal.transport.section_name}
            type="number"
          >
            <option value="Car">Car</option>
            <option value="Train">Train</option>
            <option value="Taxi">Taxi</option>
          </Select>
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
      <div className="flex gap-2 justify-end mt-4">
        <Button
          name={width >= 768 ? "continue to instruments" : "to instruments"}
          direction="next"
          handleClick={handleClick}
          enabled={
            stateList.personal.performer_name.value.trim().length > 0 &&
            stateList.personal.contact.value.trim().length > 0
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
