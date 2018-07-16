import {actions as entitiesActions} from '../lib/symbiote/entities';
import {actions as pagination} from '../lib/symbiote/pagination';
import {CALL_API, Schemas} from "../middlewares/api";

const fetchUser = (login) => ({
    login,
    [CALL_API]: {
        endpoint: `users/${login}`,
        types: [entitiesActions.entitiesRequest, entitiesActions.entitiesSuccess],
        schema: Schemas.USER
    }
});

export const loadUser = (login) => dispatch => {
    dispatch(fetchUser(login));
};

///////////////

const fetchRepo = fullName => ({
    fullName,
    [CALL_API]: {
        endpoint: `repos/${fullName}`,
        types: [entitiesActions.entitiesRequest, entitiesActions.entitiesSuccess],
        schema: Schemas.REPO
    }
});

export const loadRepo = fullName => dispatch => {
    // console.log("loadUser with login = ", login);
    dispatch(fetchRepo(fullName));
};

//////////////

const {
    starredByUser: {starredRequest, starredSuccess},
    stargazersByRepo: {stargazersRequest, stargazersSuccess}
} = pagination;

const fetchStarred = (login, nextPageUrl) => ({
    login,
    [CALL_API]: {
        endpoint: nextPageUrl,
        types: [starredRequest, starredSuccess],
        schema: Schemas.REPO_ARRAY
    }
});

export const loadStarred = (login, nextPage) => (dispatch, getState) => {

    console.log();
    const {
        pageCount = 0,
        nextPageUrl = `users/${login}/starred`
    } = getState().pagination.starredByUser[login] || {};

    if (pageCount > 0 && !nextPage) return;

    dispatch(fetchStarred(login, nextPageUrl));
};


/////////

const fetchStargazers = (fullName, nextPageUrl) => ({
    fullName,
    [CALL_API]: {
        endpoint: nextPageUrl,
        types: [stargazersRequest, stargazersSuccess],
        schema: Schemas.USER_ARRAY
    }
});

export const loadStargazers = (fullName, nextPage) => (dispatch, getState) => {

        const {
            pageCount = 0,
            nextPageUrl = `repos/${fullName}/stargazers`
        } = getState().pagination.stargazersByRepo[fullName] || {};

        if (pageCount > 0 && !nextPage) return;
        dispatch(fetchStargazers(fullName, nextPageUrl));
    }
;




