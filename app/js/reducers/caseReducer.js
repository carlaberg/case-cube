import {FETCH_CASES, ADD_CASE, UPDATE_CASE, UPDATE_HERO} from '../utils/types'

export const caseReducer = (state={}, action) => {

  switch(action.type) {

    case FETCH_CASES:
      const caseObject = {cases:{}}
      action.payload.map(item => {
        Object.assign(caseObject.cases, {[item.caseId]: item})
      })
      console.log(caseObject);
      return caseObject

    case ADD_CASE:
    return {
      ...state,
      cases: {
        ...state.cases,
        [action.payload.caseId]: action.payload
      },
      msg: 'Case was successfully saved to the database!',
      msgType: 'success'
    }

    case UPDATE_CASE:
      return {
        ...state,
        cases: {
          ...state.cases,
          [action.payload.caseId]: action.payload
        },
        msg: 'Case was successfully updated!',
        msgType: 'success'
      }

    case UPDATE_HERO:
      const newState = { ...state, [action.payload.caseId]: action.payload }
      return newState
    default:
      return state
  }
}
