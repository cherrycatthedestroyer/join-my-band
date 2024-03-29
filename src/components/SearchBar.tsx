import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../store/actions";

import {
  sortByLikes,
  sortByExperience,
  sortByFilter,
  sortBySkill,
  filterButtonSelectedStyle,
  filterButtonStyle,
  SubmissionProfile,
} from "../../scripts/helper";
import { SetStateAction, useRef } from "react";
import { Container } from "@mui/material";

interface SearchBarProps extends PropsFromRedux {
  subList: SubmissionProfile[];
  setSubList: (value: SetStateAction<SubmissionProfile[]>) => void;
  resetSubList: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  clientState,
  resetFilters,
  setLikeFilter,
  setSkillFilter,
  setExpFilter,
  setSubList,
  resetSubList,
}) => {
  const searchInput = useRef<HTMLInputElement>(null);
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value.trim();
    if (value !== "") {
      setSubList((prev) => sortByFilter(prev, value));
    } else {
      resetSubList();
    }
    filterList();
  }
  function filterList() {
    if (clientState.likeFilter) {
      setSubList((prev) => sortByLikes(prev));
    } else if (clientState.expFilter) {
      setSubList((prev) => sortByExperience(prev));
    } else if (clientState.skillFilter) {
      setSubList((prev) => sortBySkill(prev));
    }
  }
  function handleFilter(filterType: string) {
    if (filterType === "skill") {
      if (clientState.skillFilter) {
        handleReset();
      } else {
        setSkillFilter(true);
        setSubList((prev) => sortBySkill(prev));
      }
    } else if (filterType === "likes") {
      if (clientState.likeFilter) {
        handleReset();
      } else {
        setLikeFilter(true);
        setSubList((prev) => sortByLikes(prev));
      }
    } else if (filterType === "experience") {
      if (clientState.expFilter) {
        handleReset();
      } else {
        setExpFilter(true);
        setSubList((prev) => sortByExperience(prev));
      }
    }
  }
  function handleReset() {
    resetFilters();
    searchInput.current!.value = "";
    resetSubList();
  }
  return (
    <Container disableGutters>
      <div className="flex shadow mb-4 border rounded">
        <input
          type="text"
          placeholder="search by instrument"
          onChange={(e) => handleSearch(e)}
          ref={searchInput}
          className={
            "rounded-l py-2 pl-3 w-4/5 text-gray-700 leading-tight focus:outline-stone-300"
          }
        />
        <button
          className={`w-1/5 rounded-r bg-stone-100 text-xs py-2 pr-3 ${
            searchInput.current !== null
              ? searchInput.current!.value.trim().length > 0
                ? " text-red-500"
                : ""
              : ""
          }`}
          onClick={handleReset}
        >
          clear
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button
          className={
            clientState.skillFilter
              ? filterButtonSelectedStyle
              : filterButtonStyle
          }
          onClick={() => handleFilter("skill")}
        >
          Skill
        </button>
        <button
          className={
            clientState.expFilter
              ? filterButtonSelectedStyle
              : filterButtonStyle
          }
          onClick={() => handleFilter("experience")}
        >
          Experience
        </button>
        <button
          className={
            clientState.likeFilter
              ? filterButtonSelectedStyle
              : filterButtonStyle
          }
          onClick={() => handleFilter("likes")}
        >
          Likes
        </button>
      </div>
    </Container>
  );
};

// Connect the component to the Redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

// Generate props types for the connected component
type PropsFromRedux = ConnectedProps<typeof connector>;

// Export the connected component
export default connector(SearchBar);
