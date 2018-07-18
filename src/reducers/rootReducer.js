import {combineReducers} from 'redux';
import merge from 'lodash/merge'
import {paginate} from './pagination'
import {starredRequest, starredSuccess, stargazersRequest, stargazersSuccess} from "../lib/reduxActions/actions";

const entities = (state = {users: {}, repos: {}}, action) => {
    if (action.payload && action.payload && action.payload.entities) {
        return merge({}, state, action.payload.entities);
    }
    return state
};


const paginationReducer = combineReducers({
    starredByUser: paginate({
        mapActionToKey: ({payload: {login}}) => login,
        types: [starredRequest, starredSuccess]
    }),
    stargazersByRepo: paginate({
        mapActionToKey: ({payload: {fullName}}) => fullName,
        types: [stargazersRequest, stargazersSuccess]
    })
});


const rootReducer = combineReducers({
    entities,
    pagination: paginationReducer
});

export default rootReducer;
