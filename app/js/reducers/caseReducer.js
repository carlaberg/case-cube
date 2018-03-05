import {FETCH_CASES} from '../utils/types'

export const caseReducer = (state={}, action) => {

    switch(action.type) {
        case FETCH_CASES:
          const caseObject = {}
          action.payload.map(item => {
            Object.assign(caseObject, {[item.caseId]: item})
          })
          return caseObject
        default:
          return state
    }
}
