import {CALL_API, Schemas} from "../middlewares/api";
import {starredRequest, starredSuccess} from '../lib/reduxActions/actions';

const fetchStarred = (login, nextPageUrl) => ({
    login,
    [CALL_API]: {
        endpoint: nextPageUrl,
        types: [starredRequest, starredSuccess],
        schema: Schemas.REPO_ARRAY
    }
});

export const loadStarred = (login, nextPage) => (dispatch, getState) => {

    const {
        pageCount,
        nextPageUrl = `users/${login}/starred`
    } = getState().pagination.starredByUser[login] || {};

    if (pageCount > 0 && !nextPage) return;

    dispatch(fetchStarred(login, nextPageUrl));
};



