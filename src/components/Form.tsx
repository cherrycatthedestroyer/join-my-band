import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../store/actions";

import AchievementInfo from "@/components/form_sections/AchievmentInfo";
import InstrumentInfo from "@/components/form_sections/InstrumentInfo";
import PersonalInfo from "@/components/form_sections/PersonalInfo";
import useWindowDimensions from "../../scripts/helper";
import { useSession, signIn, signOut } from "next-auth/react";

import { useEffect, useState } from "react";

import { fetchRandomPokemon } from "../../scripts/helper";

import { connectToDatabase } from "../../scripts/mongodb";
import { AxiosError } from "axios";

const formHeader =
  "uppercase text-xs font-normal text-stone-700 mb-4 shrink-0 xl:text-base";
const formHeaderInactive =
  "uppercase text-xs font-normal text-stone-400 mb-4 shrink-0 xl:text-base";

const Form: React.FC<PropsFromRedux> = ({
  stateList,
  setFormOpen,
  addSubmission,
  setComplete,
}) => {
  const { data: session, status } = useSession();
  const { width } = useWindowDimensions();
  const [nickname, setNickname] = useState<string | null>();

  useEffect(() => {
    fetchRandomPokemon()
      .then((p) => setNickname(p.name))
      .catch((e: Error | AxiosError) => console.log(e));
  }, []);

  if (!nickname) return null;

  function handleClick() {
    if (status === "authenticated") {
      setFormOpen(true);
    } else if (status === "unauthenticated") {
      signIn("google");
    }
  }
  function handleCancel() {
    signOut();
    setFormOpen(false);
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (stateList.error_list.length === 0) {
      if (
        !(
          stateList.achievements[0].achievement_name.value.trim().length > 0 &&
          stateList.achievements[0].achievement_description.value.trim()
            .length > 0 &&
          stateList.achievements[0].achievement_date.value.trim().length > 0
        )
      ) {
      }
      addSubmission({
        personal: stateList.personal,
        instruments: stateList.instruments,
        achievements: stateList.achievements,
      });
      setComplete();
    }
  }
  return (
    <>
      {stateList.form_open ? (
        <>
          <button
            className="hover:text-white text-stone-700 text-xs pl-1 pb-2 rounded self-start"
            onClick={handleCancel}
          >
            {stateList.complete ? "apply as different person" : "cancel"}
          </button>
          <form
            className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            {stateList.complete ? (
              <>
                <h1 className="text-center mt-4">thank you for submitting</h1>
              </>
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
                        <sup className="ml-1 text-xs text-stone-500 font-light lowercase align-text-top">
                          optional
                        </sup>
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
        <>
          <button
            type="submit"
            className={
              "bg-stone-700 hover:bg-stone-600 text-white py-8 px-3 rounded w-full"
            }
            onClick={handleClick}
          >
            {status === "unauthenticated" ? (
              <span className="flex gap-2 justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                  width={20}
                  height={20}
                  className="fill-white self-center"
                >
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
                <p>apply with Google</p>
              </span>
            ) : (
              <p>click to apply</p>
            )}
          </button>
        </>
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
