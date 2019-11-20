import { 
  FETCH_CASES,
  FETCH_FEATURED_CASES,
  ADD_CASE,
  UPDATE_CASE,
  DELETE_CASE,
  LOGIN_USER,
  LOGOUT_USER,
  CURRENT_USER
} from '../utils/types';
import { CLIENT_TOKEN } from '../utils/settings'
import * as api from "../apiFetchFunctions";

export const fetchCases = () => {
  return async dispatch => {
    const cases = await api.getCases();
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

export const fetchFeaturedCases = (query = '') => {
  return async dispatch => {
    const cases = await api.getFeaturedCases(`/api/get-featured-cases/${ query }`);
    
    try {
      return dispatch({
        type: FETCH_FEATURED_CASES,
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

export const login = (credentials, callback) => {
  return async dispatch => {
    
    try {
      const response = await api.login(credentials)
      localStorage.setItem(CLIENT_TOKEN, response.token)
      
      // Redirect to admin after successful login
      callback()

      return dispatch({
        type: LOGIN_USER,
        payload: response.user
      })
    } catch (err) {
        console.log(err);
    }
  }
}

export const logout = (callback) => {
  localStorage.removeItem(CLIENT_TOKEN)
  
  // Redirect to home after logout
  callback()

  return dispatch({
    type: LOGOUT_USER
  })
}

export const currentUser = () => {
  return async dispatch => {
    
    try {
      const token = localStorage[CLIENT_TOKEN]
      if (!token) return

      const response = await api.currentUser(token)

      return dispatch({
        type: CURRENT_USER,
        payload: response
      })
    } catch (err) {
        console.log(err);
    }
  }
}

