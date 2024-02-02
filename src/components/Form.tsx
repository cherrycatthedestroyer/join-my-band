import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../store/actions";

import AchievementInfo from "@/components/form_sections/AchievmentInfo";
import InstrumentInfo from "@/components/form_sections/InstrumentInfo";
import PersonalInfo from "@/components/form_sections/PersonalInfo";
import useWindowDimensions from "../../scripts/helper";
import Button from "./form_sections/input_components/Button";

const formHeader =
  "uppercase text-xs font-normal text-stone-700 mb-4 shrink-0 xl:text-base";
const formHeaderInactive =
  "uppercase text-xs font-normal text-stone-400 mb-4 shrink-0 xl:text-base";

interface Props extends PropsFromRedux {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<Props> = ({ stateList, handleSubmit, setFormOpen }) => {
  const { width } = useWindowDimensions();
  function handleClick() {
    setFormOpen(true);
  }
  function handleCancel() {
    setFormOpen(false);
  }
  return (
    <>
      {stateList.form_open ? (
        <>
          <form
            className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-2 lg:w-4/5 lg:mx-auto shrink-0 grow-0 flex flex-col"
            onSubmit={(e) => handleSubmit(e)}
          >
            {stateList.complete ? (
              <h1 className="text-center mt-4">Thank you for submitting</h1>
            ) : (
              <>
                <ul className="list-disc marker:text-red-500 list-inside mb-4">
                  {stateList.error_list.length > 0 && (
                    <h3 className="block uppercase tracking-wide text-s font-bold text-red-500">
                      Oops! Try doing the following ...
                    </h3>
                  )}
                  {stateList.error_list.map((item: any, index: number) => {
                    return (
                      <li className="text-red-500 indent-2" key={index}>
                        {item}
                      </li>
                    );
                  })}
                </ul>
                <div className="flex flex-col">
                  <div className="flex gap-4 mb-4">
                    {width >= 768 ||
                    (width < 768 && stateList.personal_isOpen) ? (
                      <h1
                        className={
                          stateList.personal_isOpen
                            ? formHeader
                            : formHeaderInactive
                        }
                      >
                        1. Personal Details
                      </h1>
                    ) : undefined}
                    {width >= 768 ||
                    (width < 768 && stateList.instrument_isOpen) ? (
                      <h1
                        className={
                          stateList.instrument_isOpen
                            ? formHeader
                            : formHeaderInactive
                        }
                      >
                        2. Instruments
                      </h1>
                    ) : undefined}
                    {width >= 768 ||
                    (width < 768 && stateList.achievement_isOpen) ? (
                      <h1
                        className={
                          stateList.achievement_isOpen
                            ? formHeader
                            : formHeaderInactive
                        }
                      >
                        3. Achievements
                        {width > 1024 && (
                          <sup className="ml-1 text-xs text-stone-500 font-light lowercase align-text-top">
                            optional
                          </sup>
                        )}
                      </h1>
                    ) : undefined}
                  </div>
                  {stateList.personal_isOpen && <PersonalInfo />}
                  {stateList.instrument_isOpen && <InstrumentInfo />}
                  {stateList.achievement_isOpen && <AchievementInfo />}
                </div>
              </>
            )}
          </form>
        </>
      ) : (
        <button
          type="submit"
          className={
            "mt-4 bg-stone-700 hover:bg-stone-600 text-white py-8 px-3 rounded lg:w-4/5 lg:mx-auto"
          }
          onClick={handleClick}
        >
          click to apply
        </button>
      )}
    </>
  );
};

// Connect the component to the Redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

// Generate props types for the connected component
type PropsFromRedux = ConnectedProps<typeof connector>;

// Export the connected component
export default connector(Form);

/*<InstrumentInfo />
              <AchievementInfo />*/
