import {FETCH_CASES, UPDATE_HERO} from '../utils/types'

export const caseReducer = (state={}, action) => {

    switch(action.type) {
        case FETCH_CASES:
          const caseObject = {}
          action.payload.map(item => {
            Object.assign(caseObject, {[item.caseId]: item})
          })
          return caseObject
         case UPDATE_HERO:
            const newState = { ...state, [action.payload.caseId]: action.payload }
            return newState
        default:
          return state
    }
}
