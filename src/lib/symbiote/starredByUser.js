import {createSymbiote} from 'redux-symbiote'

export const {actions, reducer} = createSymbiote({}, {
        starredSuccess: (state, data) => {
            //console.log("starredByUser success request , = ", data);
            const {result, login} = data;
            return {...state, [login]: result};
        }
    })
;


