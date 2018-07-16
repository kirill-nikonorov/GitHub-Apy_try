import {showErrorNotification, showSuccessNotification} from '../service';
import {actions as entitiesActions} from '../lib/symbiote/entities';
import {actions as starredByUser} from '../lib/symbiote/starredByUser';
import {actions as stargazersByRepo} from '../lib/symbiote/stargazersByRepo';
import api from '../api';
import {CALL_API, Schemas} from "../middlewares/api";

const fetchUser = (login) => ({
    [CALL_API]: {
        endpoint: `users/${login}`,
        types: [entitiesActions.entitiesSuccess],
        schema: Schemas.USER
    }
});

export const loadUser = (login) => dispatch => {
    // console.log("loadUser with login = ", login);
    dispatch(fetchUser(login));
};

///////////////

const fetchRepo = fullName => ({
    fullName,
    [CALL_API]: {
        endpoint: `repos/${fullName}`,
        types: [entitiesActions.entitiesSuccess],
        schema: Schemas.REPO
    }
});

export const loadRepo = fullName => dispatch => {
    // console.log("loadUser with login = ", login);
    dispatch(fetchRepo(fullName));
};

//////////////
const fetchStarred = (login) => ({
    login,
    [CALL_API]: {
        endpoint: `users/${login}/starred`,
        types: [starredByUser.starredSuccess],
        schema: Schemas.REPO_ARRAY
    }
});

export const loadStarred = (login) => dispatch => {
    //console.log("loadStarred with login = ", login);
    dispatch(fetchStarred(login));
};


/////////

const fetchStargazers = (fullName) => ({
    fullName,
    [CALL_API]: {
        endpoint: `repos/${fullName}/stargazers`,
        types: [stargazersByRepo.stargazersSuccess],
        schema: Schemas.USER_ARRAY
    }
});

export const loadStargazers = (fullName) => dispatch => {
    //console.log("loadStargazers with login = ", login);
    dispatch(fetchStargazers(fullName));
};

/////////////////////


