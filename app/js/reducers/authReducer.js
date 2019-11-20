import { 
  LOGIN_USER,
  LOGOUT_USER,
  CURRENT_USER 
} from '../utils/types'
const initialState = {
  currentUser: {}
}

export const authReducer = (state = initialState, action) => {

  switch(action.type) {

    case LOGIN_USER:
      return {
        ...state,
        currentUser: action.payload
      }

    case LOGOUT_USER:
      return {
        ...state,
        currentUser: {}
      }

    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    
    default:
      return state;
  }
}
