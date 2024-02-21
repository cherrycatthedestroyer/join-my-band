import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { getCurrentDate } from "../scripts/helper";

export interface TextInputProperties {
  [index: string]: string | boolean;
  name: string;
  value: string;
  isValid: boolean;
  placeholder: string;
  section_name: string;
}

export interface NumberInputProperties {
  [index: string]: string | boolean | number;
  name: string;
  value: number;
  isValid: boolean;
  placeholder: string;
  section_name: string;
}

export interface Instrument {
  [index: string]: TextInputProperties;
  instrument_name: TextInputProperties;
  instrument_profeciency: TextInputProperties;
  instrument_experience: TextInputProperties;
}

export interface Achievement {
  [index: string]: TextInputProperties;
  achievement_name: TextInputProperties;
  achievement_description: TextInputProperties;
  achievement_date: TextInputProperties;
}

export interface Personal {
  [index: string]: TextInputProperties | NumberInputProperties;
  performer_name: TextInputProperties;
  age: NumberInputProperties;
  transport: TextInputProperties;
  contact: TextInputProperties;
  image: TextInputProperties;
}

export interface stateStructure {
  personal: Personal;
  instruments: Instrument[];
  achievements: Achievement[];
  personal_isOpen: boolean;
  instrument_isOpen: boolean;
  achievement_isOpen: boolean;
  first_attempt: boolean;
  selected_instrument: number;
  selected_achievement: number;
  instrument_is_error: boolean;
  achievement_is_error: boolean;
  error_list: string[];
  form_open: boolean;
  complete: boolean;
  selected_page: string;
  ip_address: string;
}

const initialState: stateStructure = {
  personal: {
    performer_name: {
      name: "performer_name",
      value: "",
      isValid: true,
      placeholder: "Enter your name, i.e. 'Josh Job'",
      section_name: "personal",
    },
    age: {
      name: "age",
      value: 18,
      isValid: true,
      placeholder: "Enter how old you are in years",
      section_name: "personal",
    },
    transport: {
      name: "transport",
      value: "Car",
      isValid: true,
      placeholder: "Select your method of travel",
      section_name: "personal",
    },
    contact: {
      name: "contact",
      value: "",
      isValid: true,
      placeholder: "Enter an email or phone number",
      section_name: "personal",
    },
    image: {
      name: "image",
      value: "",
      isValid: true,
      placeholder: "Apply with profile picture",
      section_name: "personal",
    },
  },
  instruments: [
    {
      instrument_name: {
        name: "instrument_name",
        value: "",
        isValid: true,
        placeholder: "Enter the name of an instrument you play, i.e. 'Guitar'",
        section_name: "instruments",
      },
      instrument_profeciency: {
        name: "instrument_profeciency",
        value: "Novice",
        isValid: true,
        placeholder: "Select your playing level",
        section_name: "instruments",
      },
      instrument_experience: {
        name: "instrument_experience",
        value: "Casual",
        isValid: true,
        placeholder: "Select your level of performance experience",
        section_name: "instruments",
      },
    },
  ],
  achievements: [
    {
      achievement_name: {
        name: "achievement_name",
        value: "",
        isValid: true,
        placeholder: "Enter the achievement title, i.e. 'Won a Grammy'",
        section_name: "achievements",
      },
      achievement_description: {
        name: "achievement_description",
        value: "",
        isValid: true,
        placeholder: "Describe this achievement in a few sentences ...",
        section_name: "achievements",
      },
      achievement_date: {
        name: "achievement_date",
        value: getCurrentDate(),
        isValid: true,
        placeholder: "Select the date of completion",
        section_name: "achievements",
      },
    },
  ],
  personal_isOpen: true,
  instrument_isOpen: false,
  achievement_isOpen: false,
  first_attempt: true,
  selected_instrument: 0,
  selected_achievement: 0,
  instrument_is_error: false,
  achievement_is_error: false,
  error_list: [],
  form_open: false,
  complete: false,
  selected_page: "home",
  ip_address: "",
};

const statelistSlice = createSlice({
  name: "statelist",
  initialState,
  reducers: {
    SET_IP: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        ip_address: action.payload,
      };
    },
    SET_SELECTED_PAGE: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        selected_page: action.payload,
      };
    },
    SET_COMPLETE: (state) => {
      return {
        ...state,
        complete: true,
      };
    },
    SET_FORM_OPEN: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        form_open: action.payload,
      };
    },
    SET_ACHIEVEMENT_OPEN: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        achievement_isOpen: action.payload,
      };
    },
    SET_INSTRUMENT_OPEN: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        instrument_isOpen: action.payload,
      };
    },
    SET_PERSONAL_OPEN: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        personal_isOpen: action.payload,
      };
    },
    INVALIDATE_PERSONAL: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        personal: {
          ...state.personal,
          [action.payload]: {
            ...state.personal[action.payload],
            isValid: false,
          },
        },
      };
    },
    INVALIDATE_INSTRUMENT: (
      state,
      action: PayloadAction<{ input_name: string; item_index: number }>
    ) => {
      const { item_index, input_name } = action.payload;
      return {
        ...state,
        instruments: state.instruments.map((instrument, instrument_index) =>
          instrument_index === item_index
            ? {
                ...instrument,
                [input_name]: {
                  ...instrument[input_name],
                  isValid: false,
                },
              }
            : instrument
        ),
      };
    },
    INVALIDATE_ACHIEVEMENT: (
      state,
      action: PayloadAction<{ input_name: string; item_index: number }>
    ) => {
      const { item_index, input_name } = action.payload;
      return {
        ...state,
        achievements: state.achievements.map((achievement, achievement_index) =>
          achievement_index === item_index
            ? {
                ...achievement,
                [input_name]: {
                  ...achievement[input_name],
                  isValid: false,
                },
              }
            : achievement
        ),
      };
    },
    UPDATE_PERSONAL: (
      state,
      action: PayloadAction<{
        input_value: string;
        input_name: string;
      }>
    ) => {
      const { input_value, input_name } = action.payload;
      return {
        ...state,
        personal: {
          ...state.personal,
          [input_name]: {
            ...state.personal[input_name],
            value: input_value,
            isValid: state.first_attempt
              ? true
              : input_value.trim().length > 0
              ? true
              : false,
          },
        },
      };
    },
    UPDATE_INSTRUMENT: (
      state,
      action: PayloadAction<{
        input_value: string;
        input_name: string;
        item_index: number;
      }>
    ) => {
      const { input_value, input_name, item_index } = action.payload;
      return {
        ...state,
        instruments: state.instruments.map((instrument, instrument_index) =>
          instrument_index === item_index
            ? {
                ...instrument,
                [input_name]: {
                  ...instrument[input_name],
                  value: input_value,
                  isValid: state.first_attempt
                    ? true
                    : input_value.trim().length > 0
                    ? true
                    : false,
                },
              }
            : instrument
        ),
      };
    },
    UPDATE_ACHIEVEMENT: (
      state,
      action: PayloadAction<{
        input_value: string;
        input_name: string;
        item_index: number;
      }>
    ) => {
      const { input_value, input_name, item_index } = action.payload;
      return {
        ...state,
        achievements: state.achievements.map((achievement, achievement_index) =>
          achievement_index === item_index
            ? {
                ...achievement,
                [input_name]: {
                  ...achievement[input_name],
                  value: input_value,
                  isValid: state.first_attempt
                    ? true
                    : input_value.trim().length > 0
                    ? true
                    : false,
                },
              }
            : achievement
        ),
      };
    },
    ADD_INSTRUMENT: (state, action: PayloadAction<Instrument>) => {
      return {
        ...state,
        instruments: [...state.instruments, action.payload],
        selected_instrument: state.selected_instrument + 1,
      };
    },
    REMOVE_INSTRUMENT: (state, action: PayloadAction<number>) => {
      const indexToRemove = action.payload;
      return {
        ...state,
        instruments: state.instruments.filter(
          (_, index) => index !== indexToRemove
        ),
        selected_instrument: state.selected_instrument - 1,
      };
    },
    ADD_ACHIEVEMENT: (state, action: PayloadAction<Achievement>) => {
      return {
        ...state,
        achievements: [...state.achievements, action.payload],
        selected_achievement: state.selected_achievement + 1,
      };
    },
    REMOVE_ACHIEVEMENT: (state, action: PayloadAction<number>) => {
      const indexToRemove = action.payload;
      return {
        ...state,
        achievements: state.achievements.filter(
          (_, index) => index !== indexToRemove
        ),
        selected_achievement: state.selected_achievement - 1,
      };
    },
    SET_INSTRUMENT_ERROR: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        instrument_is_error: action.payload,
      };
    },
    SET_ACHIEVEMENT_ERROR: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        achievement_is_error: action.payload,
      };
    },
    SET_SELECTED_INSTRUMENT: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        selected_instrument: action.payload,
      };
    },
    SET_SELECTED_ACHIEVEMENT: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        selected_achievement: action.payload,
      };
    },
    ADD_ERROR_LIST: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error_list: [...state.error_list, action.payload],
      };
    },
    SET_FIRST_ATTEMPT: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        first_attempt: action.payload,
      };
    },
  },
});

export const {
  SET_IP,
  SET_SELECTED_PAGE,
  SET_COMPLETE,
  SET_FORM_OPEN,
  SET_ACHIEVEMENT_OPEN,
  SET_INSTRUMENT_OPEN,
  SET_PERSONAL_OPEN,
  SET_FIRST_ATTEMPT,
  ADD_ERROR_LIST,
  INVALIDATE_ACHIEVEMENT,
  INVALIDATE_INSTRUMENT,
  INVALIDATE_PERSONAL,
  UPDATE_ACHIEVEMENT,
  UPDATE_INSTRUMENT,
  UPDATE_PERSONAL,
  ADD_ACHIEVEMENT,
  REMOVE_ACHIEVEMENT,
  ADD_INSTRUMENT,
  REMOVE_INSTRUMENT,
  SET_INSTRUMENT_ERROR,
  SET_ACHIEVEMENT_ERROR,
  SET_SELECTED_INSTRUMENT,
  SET_SELECTED_ACHIEVEMENT,
} = statelistSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectStatelist = (state: RootState) => state.stateList;

export default statelistSlice.reducer;
