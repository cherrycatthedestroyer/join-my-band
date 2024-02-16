import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Instrument, Achievement, Personal } from "./statelist";

export interface Submission {
  _id: string;
  instruments: Instrument[];
  achievements: Achievement[];
  personal: Personal;
}

export const initialState: Submission[] = [
  {
    _id: "0",
    personal: {
      performer_name: {
        name: "performer_name",
        value: "Anthony Noujeim",
        isValid: true,
        placeholder: "Enter your name, i.e. 'Frank Mona'",
        section_name: "personal",
      },
      age: {
        name: "age",
        value: 26,
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
        value: "ZZhaut@gmail.com",
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
          value: "Guitar",
          isValid: true,
          placeholder:
            "Enter the name of an instrument you play, i.e. 'Guitar'",
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
          value: "",
          isValid: true,
          placeholder: "Select the date of completion",
          section_name: "achievements",
        },
      },
    ],
  },
];

const submissionsSlice = createSlice({
  name: "submissions",
  initialState: initialState,
  reducers: {
    ADD_SUBMISSION: (state, action: PayloadAction<Submission>) => {
      return [...state, action.payload];
    },
  },
});

export const { ADD_SUBMISSION } = submissionsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSubmissions = (state: RootState) => state.submission;

export default submissionsSlice.reducer;
