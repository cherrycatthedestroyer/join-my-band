import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../store/actions";

import AchievementInfo from "@/components/form_sections/AchievmentInfo";
import InstrumentInfo from "@/components/form_sections/InstrumentInfo";
import PersonalInfo from "@/components/form_sections/PersonalInfo";
import useWindowDimensions, {
  formHeader,
  formHeaderInactive,
} from "../../scripts/helper";
import { useSession, signIn, signOut } from "next-auth/react";

import { useEffect, useState } from "react";

import { fetchRandomPokemon } from "../../scripts/helper";

import { AxiosError } from "axios";
import { Container } from "@mui/material";

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
    /*
    if (status === "authenticated") {
      setFormOpen(true);
    } else if (status === "unauthenticated") {
      signIn("google");
    }*/
    setFormOpen(true);
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
        _id: "",
        personal: stateList.personal,
        instruments: stateList.instruments,
        achievements: stateList.achievements,
      });
      postData({
        personal: stateList.personal,
        instruments: stateList.instruments,
        achievements: stateList.achievements,
      });
      setComplete();
    }
  }

  const postData = async (data: any) => {
    try {
      const response = await fetch("/api/postData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error while posting data:", error);
      return { success: false, error: "Error while posting data" };
    }
  };

  return (
    <Container>
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
                <p>apply now</p>
              </span>
            ) : (
              <p>click to apply</p>
            )}
          </button>
        </>
      )}
    </Container>
  );
};

// Connect the component to the Redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

// Generate props types for the connected component
type PropsFromRedux = ConnectedProps<typeof connector>;

// Export the connected component
export default connector(Form);
