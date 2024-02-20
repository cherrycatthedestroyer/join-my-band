import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../store/actions";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchRandomColor, fetchRandomPokemon } from "../../scripts/helper";
import axios from "axios";
import { Container } from "@mui/material";

const UserLabel: React.FC<PropsFromRedux> = () => {
  const { data: session, status } = useSession();
  const [nickname, setNickname] = useState<string>("none");
  const [isLoading, setIsLoading] = useState("unloaded");

  useEffect(() => {
    if (isLoading === "unloaded") {
      setIsLoading("loading");
      checkIpAddress();
    }
  }, [isLoading]);

  const checkIpAddress = async () => {
    let ip_address: string;
    try {
      const response = await axios.get("/api/getIp").then((res) => {
        ip_address = res.data.ip;
        return axios.get(`/api/getVisitors?ip=${res.data.ip}`);
      });
      if (response.status === 200) {
        if (response.data.success) {
          setNickname(response.data.data.name);
          setIsLoading("loaded");
        } else {
          try {
            const response2 = await Promise.all([
              fetchRandomPokemon(),
              fetchRandomColor(),
            ]).then(function ([pokemon, color]) {
              return axios.post(
                "/api/postVisitor",
                JSON.stringify({
                  ip_id: ip_address,
                  name: color.name + " " + pokemon.name,
                }),
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
            });
            if (response2.status === 201) {
              setNickname(response2.data.data.name);
              setIsLoading("loaded");
            }
          } catch (error) {
            console.log("error posting ip address", error);
          }
        }
        setIsLoading("loaded");
      }
    } catch (error) {
      console.log("Error while checking IP address:", error);
    }
  };

  if (!nickname) return null;
  function handleCancel() {
    signOut();
  }

  return (
    <Container disableGutters>
      <button
        className={`block text-stone-700 text-xs mt-4 ml-auto rounded${
          status !== "authenticated" ? "" : "hover:text-white"
        }`}
        onClick={status !== "authenticated" ? undefined : handleCancel}
      >
        {status !== "authenticated"
          ? isLoading === "loaded"
            ? "anonymous " + nickname
            : "loading ..."
          : "sign out " + session?.user?.email}
      </button>
    </Container>
  );
};

// Connect the component to the Redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

// Generate props types for the connected component
type PropsFromRedux = ConnectedProps<typeof connector>;

// Export the connected component
export default connector(UserLabel);
