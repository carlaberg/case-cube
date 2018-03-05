import { FETCH_CASES, UPDATE_CASE } from '../utils/types';
import * as api from "../apiFetchFunctions";


export const fetchCases = () => {
    return async dispatch => {
        const cases = await api.getCases('/api/get-cases');

    try {
      return dispatch({
            type: FETCH_CASES,
            payload: cases
      })
    } catch (err) {
        console.log(err);
    }
  }
}

export const updateCase = (id, values) => {
  return async dispatch => {
   const updatedCase = await api.updateCase()

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
