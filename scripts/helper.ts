import axios from "axios";

export function convertToLowerCamelCase(str: string) {
  const words = str.split("_");
  return words.join(" ");
}

export const inputStyling = "rounded w-full leading-tight";
export const labelStyling = "block text-stone-500 text-xs font-bold mb-2";
export const invalidInputStyling =
  "shadow appearance-none border-2 border-rose-600 rounded w-full py-2 px-3 text-gray-700 leading-tight mb-2";
export const buttonStyling =
  "leading-tight tracking-tighter bg-stone-200 hover:bg-stone-300 text-xs font py-2 px-2 rounded mb-2";
export const cropButtonStyling =
  "leading-tight tracking-tighter bg-stone-700 hover:bg-stone-600 text-white text-xs font py-2 px-2 rounded mb-2";
export const activeButtonStyling =
  "leading-tight tracking-tighter bg-stone-300 text-xs font py-2 px-2 rounded mb-2";
export const submissionButtonStyling =
  "leading-tighter tracking-tighter bg-stone-200 hover:bg-stone-300 text-xs py-2 px-2 rounded mb-2 shrink";
export const activeSubmissionButtonStyling =
  "leading-tighter tracking-tighter bg-stone-300 text-xs text-stone-700 py-2 px-2 rounded mb-2 shrink";
export const submitButtonStyling =
  "bg-stone-700 hover:bg-stone-600 text-white text-s py-2 px-3 rounded";
export const submitButtonInactiveStyling =
  "bg-stone-200 text-stone-400 text-s py-2 px-3 rounded";
export const formButtonStyle =
  "flex gap-2 form-button md:text-m text-xs my-auto text-nowrap";
export const forumButtonInactiveStyle =
  "flex gap-2 form-button-inactive text-xs md:text-m my-auto text-nowrap";
export const filterButtonStyle =
  "bg-stone-100 hover:bg-stone-200 text-xs text-stone-700 font py-2 px-2 rounded mb-2";
export const filterButtonSelectedStyle =
  "bg-stone-200 text-xs text-stone-700 font py-2 px-2 rounded mb-2";
export const cardButtonStyling =
  "leading-tight tracking-tighter bg-stone-200 text-xs font py-2 px-2 rounded mb-2";
export const formHeader =
  "uppercase text-xs font-normal text-stone-700 mb-4 shrink-0 xl:text-base";
export const formHeaderInactive =
  "uppercase text-xs font-normal text-stone-400 mb-4 shrink-0 xl:text-base";

import { useState, useEffect } from "react";
import { Submission } from "../store/submissions";

export function evenlyDivides(dividend: number, divisor: number) {
  return Math.ceil(dividend / divisor);
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 100,
    height: 100,
  });

  useEffect(() => {
    function handleResize() {
      const { innerWidth: width, innerHeight: height } = window;
      setWindowDimensions({ width, height });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export function getCurrentDate(): string {
  const date: Date = new Date();
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();

  // Pad single digit month/day with leading zero if necessary
  const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
  const formattedDay: string = day < 10 ? `0${day}` : `${day}`;

  // Construct the date string in yyyy-MM-dd format
  const formattedDate: string = `${year}-${formattedMonth}-${formattedDay}`;

  return formattedDate;
}

function totalSkills(stateObject: Submission) {
  let results = 0;
  stateObject.instruments.map((item) => {
    if (item.instrument_profeciency.value === "Novice") {
      results += 1;
    } else if (item.instrument_profeciency.value === "Intermediate") {
      results += 2;
    } else if (item.instrument_profeciency.value === "Advanced") {
      results += 3;
    }
  });
  return results;
}

function totalExperience(stateObject: Submission) {
  let results = 0;
  stateObject.instruments.map((item) => {
    if (item.instrument_experience.value === "Casual") {
      results += 1;
    } else if (item.instrument_experience.value === "Part-time") {
      results += 2;
    } else if (item.instrument_experience.value === "Professional") {
      results += 3;
    }
  });
  return results;
}

function compareSkill(a: Submission, b: Submission) {
  if (totalSkills(a) > totalSkills(b)) {
    return -1;
  } else {
    return 1;
  }
  return 0;
}

function compareExperience(a: Submission, b: Submission) {
  if (totalExperience(a) > totalExperience(b)) {
    return -1;
  } else {
    return 1;
  }
  return 0;
}

function compareAchievements(a: Submission, b: Submission) {
  if (a.achievements.length > b.achievements.length) {
    return -1;
  } else {
    return 1;
  }
  return 0;
}

function containsInstrument(a: Submission, term: string) {
  let found = false;
  a.instruments.map((item) =>
    item.instrument_name.value.toLowerCase().includes(term)
      ? (found = true)
      : undefined
  );
  return found;
}

export function sortBySkill(stateObject: Submission[]) {
  let unsortedObject = [...stateObject];
  let updatedObject = unsortedObject.sort(compareSkill);
  return updatedObject;
}

export function sortByExperience(stateObject: Submission[]) {
  let unsortedObject = [...stateObject];
  let updatedObject = unsortedObject.sort(compareExperience);
  return updatedObject;
}

export function sortByAchievement(stateObject: Submission[]) {
  let unsortedObject = [...stateObject];
  let updatedObject = unsortedObject.sort(compareAchievements);
  return updatedObject;
}

export function sortByFilter(stateObject: Submission[], term: string) {
  let searchVal = term.trim().toLowerCase();
  if (searchVal !== "" && term.length > 2) {
    let unsortedObject = [...stateObject];
    let updatedObject = unsortedObject.filter(
      (item) => containsInstrument(item, searchVal) === true
    );
    return updatedObject;
  }
  return stateObject;
}

interface SinglePokemonResponse {
  name: string;
  // Other properties might be included here, such as abilities, types, stats, etc.
}

export const fetchRandomPokemon = async () => {
  const res = await axios.get<SinglePokemonResponse>(
    ("https://pokeapi.co/api/v2/pokemon/" +
      (Math.floor(Math.random() * 360) + 1)) as string
  );
  return {
    name: res.data.name,
  };
};

export const instrumentTypes = [
  "Accordion",
  "Triangle",
  "Cajone",
  "Piano",
  "Violin",
  "Guitar",
  "Drums",
  "Flute",
  "Trumpet",
  "Saxophone",
  "Cello",
  "Clarinet",
  "Harp",
  "Bass Guitar",
  "Trombone",
  "Banjo",
  "Accordion",
  "Harmonica",
  "French Horn",
  "Viola",
  "Oboe",
  "Ukulele",
  "Mandolin",
  "Xylophone",
  "Bagpipes",
  "Organ",
  "Dulcimer",
  "Theremin",
  "Sitar",
  "Tabla",
  "Balalaika",
  "Didgeridoo",
  "Bouzouki",
  "Kalimba",
  "Marimba",
  "Tambourine",
  "Zither",
  "Steelpan",
  "Cajón",
  "Concertina",
  "Glockenspiel",
  "Gong",
  "Pan flute",
  "Harpsichord",
  "Koto",
  "Shamisen",
  "Taiko",
  "Mbira",
  "Djembe",
  "Baglama",
  "Dizi",
  "Erhu",
];
