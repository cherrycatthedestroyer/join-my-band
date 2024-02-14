import Form from "@/components/Form";

import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../store/actions";

const About: React.FC<PropsFromRedux> = () => {
  return (
    <div className="w-4/5 self-center md:w-1/2">
      <p className="text-stone-600 font-normal mb-4 text-base">
        I created this website as a way to connect with people who want to play
        some music together! In the future I&apos;d like to expand it to help
        other people find new members for their bands and to allow people to
        upload their own photos so that they don&apos;t allow have to look like
        me.
      </p>
    </div>
  );
};

// Connect the component to the Redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

// Generate props types for the connected component
type PropsFromRedux = ConnectedProps<typeof connector>;

// Export the connected component
export default connector(About);
