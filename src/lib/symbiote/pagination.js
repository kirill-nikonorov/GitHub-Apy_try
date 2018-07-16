import {createSymbiote} from 'redux-symbiote'

export const {actions, reducer} = createSymbiote({starredByUser: {}, stargazersByRepo: {}}, {
        starredByUser: {
            starredSuccess: (state, data) => {
                //console.log("starredByUser success request , = ", data);
                const {result, login} = data;
                return {...state, starredByUser: {...state.starredByUser, [login]: result}};
            }
        },
        stargazersByRepo: {
            stargazersSuccess: (state, data) => {
                //console.log("starredByUser success request , = ", data);
                const {result, fullName} = data;
                return {...state, stargazersByRepo: {...state.stargazersByRepo, [fullName]: result}};
            }
        }
    })
;


