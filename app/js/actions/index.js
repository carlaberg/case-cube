import {FETCH_CASES} from '../utils/types'

export const fetchCases = () => {
    return async dispatch => {
        const cases = await fetch('/api/get-cases')
    }

    return {
        type: FETCH_CASES,
        payload:
    }
}
