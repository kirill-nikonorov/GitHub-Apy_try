import {createSymbiote} from 'redux-symbiote'

export const {actions, reducer} = createSymbiote({}, {
        stargazersSuccess: (state, data) => {
            //console.log("starredByUser success request , = ", data);
            const {result, fullName} = data;
            return {...state, [fullName]: result};
        }
    })
;


