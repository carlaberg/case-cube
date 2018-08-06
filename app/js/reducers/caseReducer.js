import { FETCH_CASES, FETCH_FEATURED_CASES, ADD_CASE, UPDATE_CASE, DELETE_CASE } from '../utils/types'

export const caseReducer = (state={}, action) => {

  switch(action.type) {

    case FETCH_CASES:
    
        const cases = {};
        action.payload.forEach(item => {
          Object.assign(cases, {[item.caseId]: item})
        })
      return {
        ...state,
        cases
      };

    case FETCH_FEATURED_CASES:
      
      return {
        ...state,
        cases: {
          ...state.cases
        },
        featuredCases: action.payload
      } 

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
    
    default:
      return state;
  }
}
