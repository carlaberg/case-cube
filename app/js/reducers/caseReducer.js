import {FETCH_CASES, UPDATE_CASE, UPDATE_HERO} from '../utils/types'

export const caseReducer = (state={}, action) => {

  switch(action.type) {

    case FETCH_CASES:
      const caseObject = {}
      action.payload.map(item => {
        Object.assign(caseObject, {[item.caseId]: item})
      })
      return caseObject

    case UPDATE_CASE:
      const newUpdateCaseState = { ...state, [action.payload.caseId]: action.payload }
      return newUpdateCaseState

    case UPDATE_HERO:
      const newState = { ...state, [action.payload.caseId]: action.payload }
      return newState
    default:
      return state
  }
}
