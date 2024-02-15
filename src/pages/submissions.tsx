import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../store/actions";
import { useEffect, useState } from "react";
import { Submission } from "../../store/submissions";
import PerformerCard from "@/components/PerfomerCard";
import SearchBar from "@/components/SearchBar";
import { Container, Pagination, Stack } from "@mui/material";
import getSubmissionsCount from "./api/getSubmissionsCount";
import { evenlyDivides } from "../../scripts/helper";

const Submissions: React.FC<PropsFromRedux> = ({
  submission,
  setSelectedSub,
}) => {
  const [subList, setSubList] = useState<Submission[]>(submission);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setSelectedSub(0);
    setSubList(submission);
    getSubmissions(page);
    fetchTotalCount();
  }, [submission, page]);

  const getSubmissions = async (page: number) => {
    try {
      const response = await fetch(`/api/getSubmissions?page=${page}`);
      const { data } = await response.json();
      setSubList(data);
    } catch (error) {
      console.error("Error while retrieving submissions:", error);
      return { success: false, error: "Error while retrieving submissions" };
    }
  };

  const fetchTotalCount = async () => {
    try {
      const response = await fetch(`/api/getSubmissionsCount`);
      const result = await response.json();
      setTotalCount(result.total);
    } catch (error) {
      console.error("Error while fetching total count:", error);
      return 0;
    }
  };

  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
  }

  return (
    <Container maxWidth="sm" className="self-center">
      <SearchBar subList={subList} setSubList={setSubList} />
      <div className="flex justify-center my-6">
        <Pagination
          count={evenlyDivides(totalCount, 4)}
          page={page}
          onChange={handlePageChange}
        />
      </div>
      <ul>
        {subList.length > 0 ? (
          subList.map((item, item_index) => {
            return (
              <li key={item_index}>
                <PerformerCard
                  item={item}
                  item_index={item_index}
                  key={item_index}
                />
              </li>
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
