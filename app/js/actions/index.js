import { FETCH_CASES, ADD_CASE, UPDATE_CASE, DELETE_CASE } from '../utils/types';
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

export const updateCase = values => {

  return async dispatch => {
    const updatedCase = await api.updateCase(values);
    try {
      console.log(updatedCase);
      return dispatch({
        type: UPDATE_CASE,
        payload: updatedCase
      })
    } catch (err) {
        console.log(err);
    }
  }
}

export const deleteCase = (id, callback) => {

  return async dispatch => {
    const deletedCase = await api.deleteCase(id);

    // Redirect to case listing after deletion
    callback();

    try {
      return dispatch({
        type: DELETE_CASE,
        payload: id
      })
    } catch (err) {
        console.log(err);
    }
  }
}
