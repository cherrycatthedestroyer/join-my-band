import Form from "@/components/Form";

import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../store/actions";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const Home: React.FC<PropsFromRedux> = () => {
  const [ip, setIp] = useState<string>();

  useEffect(() => {
    getIpAddress();
  });

  const getIpAddress = async () => {
    try {
      const response = await axios.get("/api/getIp");
      setIp(response.data.ip);
    } catch (error) {
      console.error("Error fetching IP address:", error);
      return null;
    }
  };

  return (
    <Container maxWidth="sm" className="self-center">
      <p>{ip ? ip : "loading"}</p>
      <Form />
    </Container>
  );
};

// Connect the component to the Redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

// Generate props types for the connected component
type PropsFromRedux = ConnectedProps<typeof connector>;

// Export the connected component
export default connector(Home);
