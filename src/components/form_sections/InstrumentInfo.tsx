import Input from "@/components/form_sections/input_components/Input";
import Select from "./input_components/Select";
import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../store/actions";
import useWindowDimensions, {
  buttonStyling,
  activeButtonStyling,
} from "../../../scripts/helper";
import Button from "./input_components/Button";

const InstrumentInfo: React.FC<PropsFromRedux> = ({
  stateList,
  setInstrumentError,
  setSelectedInstrument,
  addInstrument,
  removeInstrument,
  setInputInstrument,
  setPersonalOpen,
  setInstrumentOpen,
  setAchievementOpen,
}) => {
  const instruments = stateList.instruments;
  const isError = stateList.instrument_is_error;
  const selectedInstrument = stateList.selected_instrument;
  const { width } = useWindowDimensions();

  function instrumentsFilled() {
    let isFilled = true;
    instruments.map((item, index) => {
      if (item.instrument_name.value.trim().length <= 0) {
        isFilled = false;
      }
    });
    return isFilled;
  }

  function handleAddInstrument() {
    if (
      instruments[selectedInstrument].instrument_name.value.trim().length < 2
    ) {
      setInstrumentError(true);
    } else {
      setInstrumentError(false);
      addInstrument({
        instrument_name: {
          name: "instrument_name",
          value: "",
          isValid: true,
          placeholder:
            "Enter the name of an instrument you play, i.e. 'Guitar'",
          section_name: "instruments",
        },
        instrument_profeciency: {
          name: "instrument_profeciency",
          value: "Novice",
          isValid: true,
          placeholder: "Select your playing level",
          section_name: "instruments",
        },
        instrument_experience: {
          name: "instrument_experience",
          value: "Casual",
          isValid: true,
          placeholder: "Select your level of performance experience",
          section_name: "instruments",
        },
      });
    }
  }

  function handleRemoveInstrument() {
    setInstrumentError(false);
    removeInstrument(selectedInstrument);
  }

  function handleSelectInstrument(itemIndex: number) {
    setInstrumentError(false);
    setSelectedInstrument(itemIndex);
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setInputInstrument(value, name, selectedInstrument);
  }

  function handleClickForward(): void {
    setInstrumentOpen(false);
    setAchievementOpen(true);
  }

  function handleClickBackward(): void {
    setInstrumentOpen(false);
    setPersonalOpen(true);
  }

  return (
    <>
      <div className="flex gap-2">
        {instruments.length > 1
          ? instruments.map((_, index) => (
              <button
                onClick={() => handleSelectInstrument(index)}
                key={index}
                type="button"
                className={
                  index === selectedInstrument
                    ? activeButtonStyling
                    : buttonStyling
                }
              >
                {instruments[index].instrument_name.value.trim().length > 0
                  ? instruments[index].instrument_name.value
                  : instruments.length > 1
                  ? "Instrument " + (index + 1)
                  : "Instrument"}
              </button>
            ))
          : undefined}
      </div>
      {isError ? (
        <p className="block text-red-500 text-xs mb-2">
          complete this section before adding another
        </p>
      ) : undefined}
      <div>
        {instruments.map(
          (item, index) =>
            selectedInstrument === index && (
              <div key={index}>
                <Input
                  title={item.instrument_name.name}
                  name={item.instrument_name.name}
                  value={item.instrument_name.value}
                  isValid={item.instrument_name.isValid}
                  handleChange={handleChange}
                  section={item.instrument_name.section_name}
                  placeholder={item.instrument_name.placeholder}
                  type="text"
                />
                <div className="flex justify-between w-full gap-x-10">
                  <div className="w-1/2">
                    <Select
                      title={item.instrument_profeciency.name}
                      name={item.instrument_profeciency.name}
                      value={item.instrument_profeciency.value}
                      isValid={item.instrument_profeciency.isValid}
                      handleChange={handleChange}
                      section={item.instrument_profeciency.section_name}
                      type="number"
                      options={["Novice", "Intermediate", "Advanced"]}
                    />
                  </div>
                  <div className="w-1/2">
                    <Select
                      title={item.instrument_experience.name}
                      name={item.instrument_experience.name}
                      value={item.instrument_experience.value}
                      isValid={item.instrument_experience.isValid}
                      handleChange={handleChange}
                      section={item.instrument_experience.section_name}
                      type="number"
                      options={["Casual", "Part-Time", "Full-Time"]}
                    />
                  </div>
                </div>
              </div>
            )
        )}
      </div>
      <div className="flex justify-between">
        {instruments.length < 3 ? (
          <button
            type="button"
            onClick={handleAddInstrument}
            className="block text-blue-500 text-xs mb-2"
          >
            + add another instrument
          </button>
        ) : undefined}
        {selectedInstrument != 0 ? (
          <button
            type="button"
            onClick={handleRemoveInstrument}
            className="block text-red-500 text-xs mb-2"
          >
            remove
          </button>
        ) : undefined}
      </div>
      <div className="flex gap-2 justify-between mt-4">
        <Button
          name={width >= 768 ? "edit personal info" : "to personal info"}
          direction="back"
          handleClick={handleClickBackward}
          enabled={true}
        />
        <Button
          name={width >= 768 ? "continue to achievements" : "to achievements"}
          direction="next"
          handleClick={handleClickForward}
          enabled={instrumentsFilled() ? true : false}
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
export default connector(InstrumentInfo);
