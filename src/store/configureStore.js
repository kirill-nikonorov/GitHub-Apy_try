import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import apiMiddleware from "../middlewares/api"
import DevTools from '../containers/DevTools'

import persistState from 'redux-localstorage';

const slicer = () => state => {
    return state.token;
};

const configureStore = preloadedState => {
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(thunk, apiMiddleware),
            DevTools.instrument()
            // persistState('token', slicer)
        )
    );

    if (module.hot) {
        module.hot.accept('../reducers/rootReducer', () => {
            store.replaceReducer(rootReducer);
        });
    }

    return store;
};

export default configureStore;
