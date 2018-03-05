import { FETCH_CASES, UPDATE_HERO } from '../utils/types';
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

export const updateHero = (id, values) => {
  return async dispatch => {
   const updatedCase = await api.updateHero(id, values);

   console.log(updatedCase);

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
