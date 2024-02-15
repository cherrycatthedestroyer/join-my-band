import Form from "@/components/Form";

import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../store/actions";
import { useEffect, useState } from "react";
import { Submission } from "../../store/submissions";
import PerformerCard from "@/components/PerfomerCard";
import SearchBar from "@/components/SearchBar";
import { Container } from "@mui/material";

const Submissions: React.FC<PropsFromRedux> = ({
  submission,
  setSelectedSub,
}) => {
  const [subList, setSubList] = useState<Submission[]>(submission);

  useEffect(() => {
    setSelectedSub(0);
    setSubList(submission);
  }, [submission]);

  return (
    <Container
      maxWidth="xs"
      className="w-4/5 self-center md:w-1/2 scrollbar-hide"
    >
      <SearchBar subList={subList} setSubList={setSubList} />
      <ul>
        {subList.length > 0 ? (
          subList.map((item, item_index) => {
            return (
              <PerformerCard
                item={item}
                item_index={item_index}
                key={item_index}
              />
            );
          })
        ) : (
          <p className="lowercase text-stone-600 text-xs font-normal mb-4">
            no results matching search
          </p>
        )}
      </ul>
    </Container>
  );
};

// Connect the component to the Redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

// Generate props types for the connected component
type PropsFromRedux = ConnectedProps<typeof connector>;

// Export the connected component
export default connector(Submissions);
