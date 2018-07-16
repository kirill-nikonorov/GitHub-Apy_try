import {combineReducers} from 'redux';
import merge from 'lodash/merge'
import {reducer as pagination} from '../lib/symbiote/pagination';

const entities = (state = {users: {}, repos: {}}, action) => {
    if (action.payload && action.payload[0].entities) {
        return merge({}, state, action.payload[0].entities);
    }
    return state
};

const rootReducer = combineReducers({
    entities,
    pagination
});

export default rootReducer;
