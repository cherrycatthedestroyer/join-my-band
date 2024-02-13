import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../../store/actions";
import {
  submitButtonStyling,
  submitButtonInactiveStyling,
} from "../../../../scripts/helper";

interface Props extends PropsFromRedux {
  captchaToken: string;
}

const SubmitButton: React.FC<Props> = ({
  stateList,
  addErrorList,
  invalidateAchievement,
  invalidateInstrument,
  invalidatePersonal,
  captchaToken,
}) => {
  function validateForm() {
    if (stateList.personal.performer_name.value.trim().length === 0) {
      addErrorList("Provide a name");
      invalidatePersonal(stateList.personal.performer_name.name);
    }
    if (stateList.personal.age.value < 18) {
      addErrorList("Must be over 18 years of age");
      invalidatePersonal(stateList.personal.age.name);
    }
    if (stateList.personal.transport.value.trim().length === 0) {
      addErrorList("Provide a method of transport");
      invalidatePersonal(stateList.personal.form_name.name);
    }
    if (stateList.personal.contact.value.trim().length === 0) {
      addErrorList("Provide a valid email of phone number");
      invalidatePersonal(stateList.personal.contact.name);
    }
    stateList.instruments.map((item, item_index) => {
      if (item.instrument_name.value.trim().length === 0) {
        addErrorList("Provide a name for instrument " + item_index);
        invalidateInstrument(item.instrument_name.name, item_index);
      }
      if (item.instrument_profeciency.value.trim().length === 0) {
        addErrorList("Select your skill level for instrument " + item_index);
        invalidateInstrument(item.instrument_profeciency.name, item_index);
      }
      if (item.instrument_experience.value.trim().length === 0) {
        addErrorList(
          "Select your level of experience with instrument " + item_index
        );
        invalidateInstrument(item.instrument_experience.name, item_index);
      }
    });
    if (stateList.achievements.length > 1) {
      stateList.achievements.map((item, item_index) => {
        if (item.achievement_name.value.trim().length === 0) {
          addErrorList("Provide a name for achievement " + item_index);
          invalidateAchievement(item.achievement_name.name, item_index);
        }
        if (item.achievement_description.value.trim().length === 0) {
          addErrorList("Provide a description for achievement " + item_index);
          invalidateAchievement(item.achievement_description.name, item_index);
        }
        if (item.achievement_date.value.trim().length === 0) {
          addErrorList(
            "Select the date achievement " + item_index + " was completed"
          );
          invalidateAchievement(item.achievement_date.name, item_index);
        }
      });
    }
  }

  function isDisabled() {
    let disabled = false;
    if (captchaToken === "") {
      disabled = true;
    }
    if (
      stateList.achievements[0].achievement_name.value.trim().length > 0 ||
      stateList.achievements[0].achievement_description.value.trim().length > 0
    ) {
      stateList.achievements.map((item) => {
        if (
          item.achievement_name.value.trim().length <= 0 ||
          item.achievement_description.value.trim().length <= 0 ||
          item.achievement_date.value === ""
        ) {
          disabled = true;
        }
      });
    }
    return disabled;
  }

  return (
    <button
      type="submit"
      className={
        !isDisabled() ? submitButtonStyling : submitButtonInactiveStyling
      }
      disabled={isDisabled() ? true : false}
      onClick={validateForm}
    >
      Submit
    </button>
  );
};

// Connect the component to the Redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

// Generate props types for the connected component
type PropsFromRedux = ConnectedProps<typeof connector>;

// Export the connected component
export default connector(SubmitButton);
