import { RootState } from "../store/store";
import {
  SET_COMPLETE,
  SET_FORM_OPEN,
  SET_ACHIEVEMENT_OPEN,
  SET_INSTRUMENT_OPEN,
  SET_PERSONAL_OPEN,
  SET_FIRST_ATTEMPT,
  ADD_ERROR_LIST,
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
  INVALIDATE_ACHIEVEMENT,
  INVALIDATE_INSTRUMENT,
  INVALIDATE_PERSONAL,
  Instrument,
  Achievement,
} from "../store/statelist";
import {
  RESET_FILTERS,
  SET_SKILL_FILTER,
  SET_EXP_FILTER,
  SET_ACH_FILTER,
  SET_SELECTED_SUB,
  SET_SELECTED_ACHIEVEMENT_SUB,
  UPDATE_SEARCH_FIELD,
} from "./clientstates";
import { ADD_SUBMISSION } from "./submissions";
import { Submission } from "./submissions";

export function mapStateToProps(state: RootState) {
  const { stateList, submission, clientState } = state;
  return { stateList, submission, clientState };
}

export const mapDispatchToProps = {
  resetFilters: () => RESET_FILTERS(),
  setSkillFilter: (value: boolean) => SET_SKILL_FILTER(value),
  setExpFilter: (value: boolean) => SET_EXP_FILTER(value),
  setAchFilter: (value: boolean) => SET_ACH_FILTER(value),
  updateSearchField: (value: string) => UPDATE_SEARCH_FIELD(value),
  setSelectedSub: (index: number) => SET_SELECTED_SUB(index),
  setSelectedAchievementSub: (index: number) =>
    SET_SELECTED_ACHIEVEMENT_SUB(index),
  addSubmission: (value: Submission) => ADD_SUBMISSION(value),
  setInputPersonal: (value: string, name: string) =>
    UPDATE_PERSONAL({
      input_value: value,
      input_name: name,
    }),
  setInputInstrument: (value: string, name: string, itemIndex: number) =>
    UPDATE_INSTRUMENT({
      input_value: value,
      input_name: name,
      item_index: itemIndex,
    }),
  setInputAchievement: (value: string, name: string, itemIndex: number) =>
    UPDATE_ACHIEVEMENT({
      input_value: value,
      input_name: name,
      item_index: itemIndex,
    }),
  invalidateAchievement: (value: string, index: number) =>
    INVALIDATE_ACHIEVEMENT({ input_name: value, item_index: index }),
  invalidateInstrument: (value: string, index: number) =>
    INVALIDATE_INSTRUMENT({ input_name: value, item_index: index }),
  setAchievementOpen: (value: boolean) => SET_ACHIEVEMENT_OPEN(value),
  setInstrumentOpen: (value: boolean) => SET_INSTRUMENT_OPEN(value),
  setPersonalOpen: (value: boolean) => SET_PERSONAL_OPEN(value),
  invalidatePersonal: (value: string) => INVALIDATE_PERSONAL(value),
  addInstrument: (value: Instrument) => ADD_INSTRUMENT(value),
  removeInstrument: (value: number) => REMOVE_INSTRUMENT(value),
  addAchievement: (value: Achievement) => ADD_ACHIEVEMENT(value),
  removeAchievement: (value: number) => REMOVE_ACHIEVEMENT(value),
  setInstrumentError: (value: boolean) => SET_INSTRUMENT_ERROR(value),
  setAchievementError: (value: boolean) => SET_ACHIEVEMENT_ERROR(value),
  setSelectedInstrument: (value: number) => SET_SELECTED_INSTRUMENT(value),
  setSelectedAchievement: (value: number) => SET_SELECTED_ACHIEVEMENT(value),
  addErrorList: (value: string) => ADD_ERROR_LIST(value),
  setFirstAttempt: (value: boolean) => SET_FIRST_ATTEMPT(value),
  setFormOpen: (value: boolean) => SET_FORM_OPEN(value),
  setComplete: () => SET_COMPLETE(),
};
