import {FETCH_CASES, ADD_CASE, UPDATE_CASE, DELETE_CASE, UPDATE_HERO} from '../utils/types'

export const caseReducer = (state={}, action) => {

  switch(action.type) {

    case FETCH_CASES:
      const caseObject = {cases:{}}
      action.payload.map(item => {
        Object.assign(caseObject.cases, {[item.caseId]: item})
      })

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

    case DELETE_CASE:
      const afterDelete = { ...state };
      delete afterDelete.cases[action.payload];

      return {
        ...afterDelete,
        msg: 'Case was successfully deleted!',
        msgType: 'success'
      }

    case UPDATE_HERO:
      const newState = { ...state, [action.payload.caseId]: action.payload }
      return newState
    default:
      return state
  }
}
