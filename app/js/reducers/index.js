import { combineReducers } from 'redux';
import { caseReducer } from './caseReducer';
import { authReducer } from './authReducer';

const rootReducer = combineReducers({
    cases: caseReducer,
    auth: authReducer
});

export default rootReducer;
