import {CALL_API, Schemas} from "../middlewares/api";
import {repoRequest, repoSuccess} from '../lib/reduxActions/actions';

const fetchRepo = fullName => ({
    fullName,
    [CALL_API]: {
        endpoint: `repos/${fullName}`,
        types: [repoRequest, repoSuccess],
        schema: Schemas.REPO
    }
});

export const loadRepo = fullName => dispatch => {
    // console.log("loadUser with login = ", login);
    dispatch(fetchRepo(fullName));
};
