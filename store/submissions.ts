import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Instrument, Achievement, Personal } from "./statelist";

export interface Submission {
  instruments: Instrument[];
  achievements: Achievement[];
  personal: Personal;
}

export const initialState: Submission[] = [
  {
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
  {
    personal: {
      performer_name: {
        name: "performer_name",
        value: "Josh Job",
        isValid: true,
        placeholder: "Enter your name, i.e. 'Frank Mona'",
        section_name: "personal",
      },
      age: {
        name: "age",
        value: 27,
        isValid: true,
        placeholder: "Enter how old you are in years",
        section_name: "personal",
      },
      transport: {
        name: "transport",
        value: "Train",
        isValid: true,
        placeholder: "Select your method of travel",
        section_name: "personal",
      },
      contact: {
        name: "contact",
        value: "josh96j@gmail.com",
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
      {
        instrument_name: {
          name: "instrument_name",
          value: "Recorder",
          isValid: true,
          placeholder:
            "Enter the name of an instrument you play, i.e. 'Guitar'",
          section_name: "instruments",
        },
        instrument_profeciency: {
          name: "instrument_profeciency",
          value: "Advanced",
          isValid: true,
          placeholder: "Select your playing level",
          section_name: "instruments",
        },
        instrument_experience: {
          name: "instrument_experience",
          value: "Professional",
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
          value: "Opened for Alicia Keys",
          isValid: true,
          placeholder: "Enter the achievement title, i.e. 'Won a Grammy'",
          section_name: "achievements",
        },
        achievement_description: {
          name: "achievement_description",
          value:
            "Won a radio competition that resulted in an opening performance slot during her girl on fire tour.",
          isValid: true,
          placeholder: "Describe this achievement in a few sentences ...",
          section_name: "achievements",
        },
        achievement_date: {
          name: "achievement_date",
          value: "2013-12-15",
          isValid: true,
          placeholder: "Select the date of completion",
          section_name: "achievements",
        },
      },
      {
        achievement_name: {
          name: "achievement_name",
          value: "Opened for Eric Clapton",
          isValid: true,
          placeholder: "Enter the achievement title, i.e. 'Won a Grammy'",
          section_name: "achievements",
        },
        achievement_description: {
          name: "achievement_description",
          value:
            "Played the opening performance for Clapton's show at the Dubai Media Ampitheatre.",
          isValid: true,
          placeholder: "Describe this achievement in a few sentences ...",
          section_name: "achievements",
        },
        achievement_date: {
          name: "achievement_date",
          value: "2014-01-15",
          isValid: true,
          placeholder: "Select the date of completion",
          section_name: "achievements",
        },
      },
    ],
  },
  {
    personal: {
      performer_name: {
        name: "performer_name",
        value: "Trevor Ainsworth",
        isValid: true,
        placeholder: "Enter your name, i.e. 'Frank Mona'",
        section_name: "personal",
      },
      age: {
        name: "age",
        value: 21,
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
        value: "TAinsworth@gmail.com",
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
          value: "Drums",
          isValid: true,
          placeholder:
            "Enter the name of an instrument you play, i.e. 'Guitar'",
          section_name: "instruments",
        },
        instrument_profeciency: {
          name: "instrument_profeciency",
          value: "Advanced",
          isValid: true,
          placeholder: "Select your playing level",
          section_name: "instruments",
        },
        instrument_experience: {
          name: "instrument_experience",
          value: "Professional",
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
          value: "2023 Jazz Festival Performer",
          isValid: true,
          placeholder: "Enter the achievement title, i.e. 'Won a Grammy'",
          section_name: "achievements",
        },
        achievement_description: {
          name: "achievement_description",
          value: "Won best creative writing piece for a poem I wrote.",
          isValid: true,
          placeholder: "Describe this achievement in a few sentences ...",
          section_name: "achievements",
        },
        achievement_date: {
          name: "achievement_date",
          value: "2023-04-15",
          isValid: true,
          placeholder: "Select the date of completion",
          section_name: "achievements",
        },
      },
    ],
  },
  {
    personal: {
      performer_name: {
        name: "performer_name",
        value: "Victoria Canal",
        isValid: true,
        placeholder: "Enter your name, i.e. 'Frank Mona'",
        section_name: "personal",
      },
      age: {
        name: "age",
        value: 24,
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
        value: "vyonce@gmail.com",
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
          value: "Piano",
          isValid: true,
          placeholder:
            "Enter the name of an instrument you play, i.e. 'Guitar'",
          section_name: "instruments",
        },
        instrument_profeciency: {
          name: "instrument_profeciency",
          value: "Advanced",
          isValid: true,
          placeholder: "Select your playing level",
          section_name: "instruments",
        },
        instrument_experience: {
          name: "instrument_experience",
          value: "Professional",
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
          value: "Songwriter Magazine 2023",
          isValid: true,
          placeholder: "Enter the achievement title, i.e. 'Won a Grammy'",
          section_name: "achievements",
        },
        achievement_description: {
          name: "achievement_description",
          value:
            "Was featured on the front cover of the well established Songwriters Magazine.",
          isValid: true,
          placeholder: "Describe this achievement in a few sentences ...",
          section_name: "achievements",
        },
        achievement_date: {
          name: "achievement_date",
          value: "2023-12-17",
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
