import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../store/actions";
import { useEffect, useState } from "react";
import PerformerCard from "@/components/PerfomerCard";
import SearchBar from "@/components/SearchBar";
import { CircularProgress, Container, Pagination } from "@mui/material";
import { evenlyDivides, SubmissionProfile } from "../../scripts/helper";

const Submissions: React.FC<PropsFromRedux> = ({ setSelectedSub }) => {
  const [subList, setSubList] = useState<SubmissionProfile[]>([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("empty");
  const totalCount = subList ? subList.length : 0;

  useEffect(() => {
    setSelectedSub(0);
    getSubmissions();
  }, []);

  const getSubmissions = async () => {
    setStatus("loading");
    try {
      const response = await fetch(`/api/getSubmissions?page=${0}`);
      const { data } = await response.json();
      setSubList((prev) => {
        setStatus("loaded");
        return data;
      });
    } catch (error) {
      console.error("Error while retrieving submissions:", error);
      return { success: false, error: "Error while retrieving submissions" };
    }
  };

  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
  }

  function resetSubList() {
    getSubmissions();
  }

  return (
    <Container maxWidth="sm" className="self-center">
      <SearchBar
        subList={subList}
        setSubList={setSubList}
        resetSubList={resetSubList}
      />
      <div className="flex justify-center my-6">
        <Pagination
          count={evenlyDivides(totalCount, 4)}
          page={page}
          onChange={handlePageChange}
        />
      </div>
      {status === "loading" ? (
        <div className="flex justify-center my-16">
          <CircularProgress color="inherit" size={"8rem"} />
        </div>
      ) : undefined}
      {status === "loaded" ? (
        <ul>
          {totalCount > 0 ? (
            subList.map((item, item_index) => {
              if (
                item_index >= (page - 1) * 4 &&
                item_index < (page - 1) * 4 + 4
              ) {
                return (
                  <li key={item._id}>
                    <PerformerCard
                      item={item}
                      item_index={item._id}
                      key={item._id}
                    />
                  </li>
                );
              }
            })
          ) : (
            <p className="lowercase text-stone-600 text-xs font-normal mb-4 text-center">
              no submissions matching search
            </p>
          )}
        </ul>
      ) : undefined}
    </Container>
  );
};

// Connect the component to the Redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

// Generate props types for the connected component
type PropsFromRedux = ConnectedProps<typeof connector>;

// Export the connected component
export default connector(Submissions);
