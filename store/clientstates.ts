import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface clientStateStructure {
  selectedAchievement: number;
  selectedSubmission: number;
  searchString: string;
  skillFilter: boolean;
  expFilter: boolean;
  achFilter: boolean;
}

const initialState: clientStateStructure = {
  selectedAchievement: 0,
  selectedSubmission: 0,
  searchString: "",
  skillFilter: false,
  expFilter: false,
  achFilter: false,
};

const clientStateSlice = createSlice({
  name: "clientState",
  initialState: initialState,
  reducers: {
    RESET_FILTERS: (state) => {
      return {
        ...state,
        skillFilter: false,
        expFilter: false,
        achFilter: false,
      };
    },
    SET_EXP_FILTER: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        skillFilter: false,
        expFilter: true,
        achFilter: false,
      };
    },
    SET_ACH_FILTER: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        skillFilter: false,
        expFilter: false,
        achFilter: true,
      };
    },
    SET_SKILL_FILTER: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        skillFilter: true,
        expFilter: false,
        achFilter: false,
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
