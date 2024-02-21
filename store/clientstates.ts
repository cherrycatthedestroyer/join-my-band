import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface clientStateStructure {
  selectedAchievement: number;
  selectedSubmission: number;
  searchString: string;
  skillFilter: boolean;
  expFilter: boolean;
  achFilter: boolean;
  likeFilter: boolean;
  hasLiked: boolean;
}

const initialState: clientStateStructure = {
  selectedAchievement: 0,
  selectedSubmission: 0,
  searchString: "",
  likeFilter: false,
  skillFilter: false,
  expFilter: false,
  achFilter: false,
  hasLiked: false,
};

const clientStateSlice = createSlice({
  name: "clientState",
  initialState: initialState,
  reducers: {
    SET_HASLIKED: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasLiked: action.payload,
      };
    },
    RESET_FILTERS: (state) => {
      return {
        ...state,
        skillFilter: false,
        expFilter: false,
        achFilter: false,
        likeFilter: false,
      };
    },
    SET_LIKE_FILTER: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        skillFilter: false,
        expFilter: false,
        achFilter: false,
        likeFilter: true,
      };
    },
    SET_EXP_FILTER: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        skillFilter: false,
        expFilter: true,
        achFilter: false,
        likeFilter: false,
      };
    },
    SET_ACH_FILTER: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        skillFilter: false,
        expFilter: false,
        achFilter: true,
        likeFilter: false,
      };
    },
    SET_SKILL_FILTER: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        skillFilter: true,
        expFilter: false,
        achFilter: false,
        likeFilter: false,
      };
    },
    UPDATE_SEARCH_FIELD: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        searchString: action.payload,
      };
    },
    SET_SELECTED_ACHIEVEMENT_SUB: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        selectedAchievement: action.payload,
      };
    },
    SET_SELECTED_SUB: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        selectedSubmission: action.payload,
      };
    },
  },
});

export const {
  SET_LIKE_FILTER,
  SET_HASLIKED,
  RESET_FILTERS,
  SET_SKILL_FILTER,
  SET_EXP_FILTER,
  SET_ACH_FILTER,
  SET_SELECTED_ACHIEVEMENT_SUB,
  SET_SELECTED_SUB,
  UPDATE_SEARCH_FIELD,
} = clientStateSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectClientState = (state: RootState) => state.submission;

export default clientStateSlice.reducer;
