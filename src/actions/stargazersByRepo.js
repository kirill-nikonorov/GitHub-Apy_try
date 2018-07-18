import {CALL_API, Schemas} from "../middlewares/api";
import {stargazersRequest, stargazersSuccess} from '../lib/reduxActions/actions';

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




