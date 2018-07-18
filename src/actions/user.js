import {CALL_API, Schemas} from "../middlewares/api";
import {userRequest, userSuccess} from '../lib/reduxActions/actions';

const fetchUser = (login) => ({
    login,
    [CALL_API]: {
        endpoint: `users/${login}`,
        types: [userRequest, userSuccess],
        schema: Schemas.USER
    }
});

export const loadUser = (login) => dispatch => {
    dispatch(fetchUser(login));
};

