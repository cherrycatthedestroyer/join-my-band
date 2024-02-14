import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../store/actions";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchRandomPokemon } from "../../scripts/helper";
import { AxiosError } from "axios";
import { Container } from "@mui/material";

const UserLabel: React.FC<PropsFromRedux> = () => {
  const { data: session, status } = useSession();
  const [nickname, setNickname] = useState<string | null>();

  useEffect(() => {
    fetchRandomPokemon()
      .then((p) => setNickname(p.name))
      .catch((e: Error | AxiosError) => console.log(e));
  }, []);

  if (!nickname) return null;
  function handleCancel() {
    signOut();
  }
  return (
    <button
      className={`block text-stone-700 text-xs mt-4 mr-4 ml-auto rounded${
        status !== "authenticated" ? "" : "hover:text-white"
      }`}
      onClick={status !== "authenticated" ? undefined : handleCancel}
    >
      {status !== "authenticated"
        ? "anonymous " + nickname
        : "sign out " + session?.user?.email}
    </button>
  );
};

// Connect the component to the Redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

// Generate props types for the connected component
type PropsFromRedux = ConnectedProps<typeof connector>;

// Export the connected component
export default connector(UserLabel);
