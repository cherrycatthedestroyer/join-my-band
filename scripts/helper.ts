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
import { MongoClient } from "mongodb";

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

function compareLikes(a: SubmissionProfile, b: SubmissionProfile) {
  if (a.likes > b.likes) {
    return -1;
  } else {
    return 1;
  }
  return 0;
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

export interface Comment {
  content: string;
  visitor_name: string;
  time: string;
}

export interface SubmissionProfile extends Submission {
  likes: string;
  comments: Comment[];
}

export function sortByLikes(stateObject: SubmissionProfile[]) {
  let unsortedObject = [...stateObject];
  let updatedObject = unsortedObject.sort(compareLikes);
  return updatedObject;
}

export function sortBySkill(stateObject: SubmissionProfile[]) {
  let unsortedObject = [...stateObject];
  let updatedObject = unsortedObject.sort(compareSkill);
  return updatedObject;
}

export function sortByExperience(stateObject: SubmissionProfile[]) {
  let unsortedObject = [...stateObject];
  let updatedObject = unsortedObject.sort(compareExperience);
  return updatedObject;
}

export function sortByAchievement(stateObject: SubmissionProfile[]) {
  let unsortedObject = [...stateObject];
  let updatedObject = unsortedObject.sort(compareAchievements);
  return updatedObject;
}

export function sortByFilter(stateObject: SubmissionProfile[], term: string) {
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

export function getCurrentDateTime(): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export function getTimeSince(dateParam: string): string {
  const currentDate = new Date();
  const inputDate = new Date(dateParam);

  const timeDifference = currentDate.getTime() - inputDate.getTime();

  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "less than a minute ago";
  }
}

interface SinglePokemonResponse {
  name: string;
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

function getRandomColor() {
  return Math.floor(Math.random() * 255).toString();
}

export const fetchRandomColor = async () => {
  const res = await axios.get(
    "https://random-word-form.herokuapp.com/random/adjective"
  );
  return {
    name: res.data,
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
  "Groupie",
  "Peter",
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
