import {combineReducers} from 'redux';
import merge from 'lodash/merge'
import {reducer as starredByUser} from '../lib/symbiote/starredByUser';
import {reducer as stargazersByRepo} from '../lib/symbiote/stargazersByRepo';

const entities = (state = {users: {}, repos: {}}, action) => {
    if (action.payload && action.payload[0].entities) {
        return merge({}, state, action.payload[0].entities);
    }
    return state
};
const rootReducer = combineReducers({
    entities,
    starredByUser,
    stargazersByRepo
});

export default rootReducer;
