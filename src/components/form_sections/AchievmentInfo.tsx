import Input from "@/components/form_sections/input_components/Input";
import TextArea from "./input_components/TextArea";
import SubmitButton from "./input_components/SubmitButton";
import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../store/actions";
import Button from "./input_components/Button";

import ReCAPTCHA from "react-google-recaptcha";

import { useState } from "react";
import useWindowDimensions, { getCurrentDate } from "../../../scripts/helper";

const buttonStyling =
  "leading-tight tracking-tighter bg-stone-200 hover:bg-stone-300 text-xs font py-2 px-2 rounded mb-2";
const activeButtonStyling =
  "leading-tight tracking-tighter bg-stone-300 text-xs font py-2 px-2 rounded mb-2";

const AchievementInfo: React.FC<PropsFromRedux> = ({
  stateList,
  setAchievementError,
  setSelectedAchievement,
  addAchievement,
  removeAchievement,
  setInputAchievement,
  setInstrumentOpen,
  setAchievementOpen,
}) => {
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const achievments = stateList.achievements;
  const selectedAchievment = stateList.selected_achievement;
  const isError = stateList.achievement_is_error;
  const { width } = useWindowDimensions();

  function handleAddAchievment() {
    if (
      stateList.achievements[selectedAchievment].achievement_name.value.trim()
        .length < 2
    ) {
      console.log("yes");
      setAchievementError(true);
    } else {
      console.log("no");
      setAchievementError(false);
      addAchievement({
        achievement_name: {
          name: "achievement_name",
          value: "",
          isValid: true,
          placeholder: "Enter the achievement title, i.e. 'Won a Grammy'",
          section_name: "achievements",
        },
        achievement_description: {
          name: "achievement_description",
          value: "",
          isValid: true,
          placeholder: "Describe this achievement in a few sentences ...",
          section_name: "achievements",
        },
        achievement_date: {
          name: "achievement_date",
          value: getCurrentDate(),
          isValid: true,
          placeholder: "Select the date of completion",
          section_name: "achievements",
        },
      });
    }
    console.log("woah");
  }

  function handleRemoveAchievment() {
    setAchievementError(false);
    removeAchievement(selectedAchievment);
  }

  function handleSelectAchievment(itemIndex: number) {
    setAchievementError(false);
    setSelectedAchievement(itemIndex);
  }

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputAchievement(value, name, selectedAchievment);
  };

  function handleClick(): void {
    setAchievementOpen(false);
    setInstrumentOpen(true);
  }

  return (
    <>
      <div className="flex gap-2">
        {achievments.length > 1
          ? achievments.map((achievement, index) => (
              <button
                onClick={() => handleSelectAchievment(index)}
                key={index}
                type="button"
                className={
                  index === selectedAchievment
                    ? activeButtonStyling
                    : buttonStyling
                }
              >
                {achievement.achievement_name.value.trim().length > 0
                  ? achievement.achievement_name.value
                  : achievments.length > 1
                  ? "Achievment " + (index + 1)
                  : "Achievment"}
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
        {achievments.map(
          (item, index) =>
            selectedAchievment === index && (
              <div key={index}>
                <Input
                  title={item.achievement_name.name}
                  name={item.achievement_name.name}
                  value={item.achievement_name.value}
                  isValid={item.achievement_name.isValid}
                  handleChange={handleChange}
                  section={item.achievement_name.section_name}
                  placeholder={item.achievement_name.placeholder}
                  type="text"
                />
                <TextArea
                  title={item.achievement_description.name}
                  name={item.achievement_description.name}
                  value={item.achievement_description.value}
                  isValid={item.achievement_description.isValid}
                  handleChange={handleChange}
                  section={item.achievement_description.section_name}
                  placeholder={item.achievement_description.placeholder}
                />
                <Input
                  title={item.achievement_date.name}
                  name={item.achievement_date.name}
                  value={item.achievement_date.value}
                  isValid={item.achievement_date.isValid}
                  handleChange={handleChange}
                  section={item.achievement_date.section_name}
                  placeholder={""}
                  type="date"
                />
              </div>
            )
        )}
      </div>
      <div className="flex justify-between">
        {achievments.length < 3 ? (
          <button
            type="button"
            onClick={handleAddAchievment}
            className="block text-blue-500 text-xs mb-2"
          >
            + add another achievement
          </button>
        ) : undefined}
        {selectedAchievment != 0 ? (
          <button
            type="button"
            onClick={handleRemoveAchievment}
            className="block text-red-500 text-xs mb-2"
          >
            remove
          </button>
        ) : undefined}
      </div>
      <div className="mt-6">
        <ReCAPTCHA
          sitekey="6LdZjGEpAAAAALpXo_AZOnvnGfDvVqX4lJBDYW5U"
          onChange={(token) => {
            if (token === null) {
              setCaptchaToken("");
            } else {
              setCaptchaToken(token);
            }
          }}
          className="g-recaptcha"
        />
      </div>
      <div className="flex justify-between items-center">
        <Button
          name={width >= 768 ? "edit instruments" : "to instruments"}
          direction="back"
          handleClick={handleClick}
          enabled={true}
        />
        <SubmitButton captchaToken={captchaToken} />
      </div>
    </>
  );
};

// Connect the component to the Redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

// Generate props types for the connected component
type PropsFromRedux = ConnectedProps<typeof connector>;

// Export the connected component
export default connector(AchievementInfo);
