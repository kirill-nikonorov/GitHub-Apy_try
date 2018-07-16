import {createSymbiote} from 'redux-symbiote'

export const {actions, reducer} = createSymbiote({}, {
        entitiesSuccess: (state, data) => {
            console.log("entities = ", data);
            return state;
        }
    })
;


