import { FETCH_CASES, ADD_CASE, UPDATE_CASE, UPDATE_HERO } from '../utils/types';
import * as api from "../apiFetchFunctions";

export const fetchCases = () => {
  return async dispatch => {
    const cases = await api.getCases('/api/get-cases');

    try {
      return dispatch({
        type: FETCH_CASES,
        payload: cases
      });
    } catch (err) {
        console.log(err);
    }
  }
}

export const addCase = theCase => {
  return async dispatch => {
    const addedCase = await api.addCase(theCase);
    try {
      return dispatch({
        type: ADD_CASE,
        payload: addedCase
      })
    } catch (err) {
        console.log(err);
    }
  }
}

export const updateHero = (id, values) => {
  return async dispatch => {
    const updatedCase = await api.updateHero(id, values);
    try {
      return dispatch({
        type: UPDATE_HERO,
        payload: updatedCase
      })
    } catch (err) {
        console.log(err);
    }
  }
}

export const updateCase = values => {
  console.log(values);
  return async dispatch => {
    const updatedCase = await api.updateCase(values);
    try {
      return dispatch({
        type: UPDATE_CASE,
        payload: updatedCase
      })
    } catch (err) {
        console.log(err);
    }
  }
}
