import {createSymbiote} from 'redux-symbiote'

export const {actions, reducer} = createSymbiote({}, {
        entitiesRequest: (state) => state,
        entitiesSuccess: (state) => state
    })
;


