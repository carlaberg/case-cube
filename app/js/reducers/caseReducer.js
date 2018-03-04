import {FETCH_CASES} from '../utils/types'

export const caseReducer = (state={}, action) {
    switch(action.type) {
        case FETCH_CASES:
        return {1: 'case 1'}
        default
        return state
    }
}
