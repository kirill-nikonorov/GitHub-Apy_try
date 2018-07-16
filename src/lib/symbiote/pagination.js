import {createSymbiote} from 'redux-symbiote'

export const {actions, reducer} = createSymbiote({starredByUser: {}, stargazersByRepo: {}}, {
        starredByUser: {
            starredSuccess: (state, data) => {
                const {result, login, nextPageUrl} = data,
                    {starredByUser} = state,
                    {pageCount = 0, ids = []} = starredByUser[login] || {};

                return {
                    ...state,
                    starredByUser: {
                        ...starredByUser,
                        [login]: {
                            ...starredByUser[login],
                            nextPageUrl,
                            ids: [...ids, ...result],
                            pageCount: pageCount + 1

                        }
                    }
                }
            }
        },
        stargazersByRepo: {
            stargazersSuccess: (state, data) => {
                const {result, fullName, nextPageUrl} = data,
                    {stargazersByRepo} = state,
                    {pageCount = 0, ids = []} = stargazersByRepo[fullName] || {};

                return {
                    ...state,
                    stargazersByRepo: {
                        ...stargazersByRepo,
                        [fullName]: {
                            ...stargazersByRepo[fullName],
                            nextPageUrl,
                            ids: [...ids, ...result],
                            pageCount: pageCount + 1
                        }
                    }
                };
            }
        }
    })
;


