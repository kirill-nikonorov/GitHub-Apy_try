import {handleActions} from 'redux-actions';

export const paginate = ({types, mapActionToKey}) => {

    const [requestType, successType] = types;

    const starredReducer = handleActions({
            [requestType]: (state) => {
                return {
                    ...state,
                    isFetching: true
                }
            },
            [successType]:
                (state, {payload: {result, nextPageUrl}}) => {
                    const {pageCount, ids} = state;

                    return {
                        ...state,
                        nextPageUrl,
                        ids: [...ids, ...result],
                        pageCount: pageCount + 1,
                        isFetching: false
                    };
                }
        },
        {
            ids: [],
            isFetching: false,
            pageCount: 0
        });

    return (state = {}, action) => {
        switch (action.type) {
            case requestType.toString():
            case successType.toString():
                const key = mapActionToKey(action)

                return {...state, [key]: starredReducer(state[key], action)};
            default :
                return state;
        }
    }
};


