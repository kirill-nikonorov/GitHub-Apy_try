import {createSymbiote} from 'redux-symbiote'

export const {actions, reducer} = createSymbiote({starredByUser: {}, stargazersByRepo: {}}, {
        starredByUser: {
            starredRequest: (state, {login}) => {
                const {starredByUser} = state;
                return {
                    ...state,
                    starredByUser: {
                        ...starredByUser,
                        [login]: {
                            ...starredByUser[login],
                            isFetching: true
                        }
                    }
                }
            },
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
                            pageCount: pageCount + 1,
                            isFetching: false
                        }
                    }
                }
            }
        },
        stargazersByRepo: {
            stargazersRequest: (state, {fullName}) => {
                const {stargazersByRepo} = state;

                return {
                    ...state,
                    stargazersByRepo: {
                        ...stargazersByRepo,
                        [fullName]: {
                            ...stargazersByRepo[fullName],
                            isFetching: true
                        }
                    }
                }
            },

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
                            pageCount: pageCount + 1,
                            isFetching: false
                        }
                    }
                };
            }
        }
    })
;


