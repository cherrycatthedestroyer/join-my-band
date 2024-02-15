import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../store/actions";
import { Container } from "@mui/material";

const About: React.FC<PropsFromRedux> = () => {
  return (
    <Container maxWidth="sm" className="self-center">
      <p className="text-stone-600 font-normal mb-4 text-base text-center">
        I created this website as a way to connect with people who want to play
        some music together! In the future I&apos;d like to expand it to help
        other people find new members for their bands and to allow people to
        upload their own photos so that they don&apos;t allow have to look like
        me.
      </p>
    </Container>
  );
};

// Connect the component to the Redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

// Generate props types for the connected component
type PropsFromRedux = ConnectedProps<typeof connector>;

// Export the connected component
export default connector(About);
