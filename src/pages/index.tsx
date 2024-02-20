import Form from "@/components/Form";
import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../store/actions";
import { Container } from "@mui/material";

const Home: React.FC<PropsFromRedux> = () => {
  return (
    <Container maxWidth="sm" className="self-center">
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
