import React from 'react';
import {Provider} from 'react-redux';
import {hot} from 'react-hot-loader';
import PropTypes from 'prop-types';
import DevTools from "./DevTools"
import {Route, Link} from 'react-router-dom';

import App from "./App"
import UserPage from "./UserPage"
import RepoPage from "./RepoPage"


const Root = ({store}) => {
    return (
        <Provider store={store}>
            <div>
                <button onClick={() => console.log(store.getState())}>logStore</button>
                <Route path="/" component={App}/>
                <Route exact path="/:login" component={UserPage}/>
                <Route path="/:login/:repo" component={RepoPage}/>

                <Link to="/kirill-nikonorov">kirill-nikonorov</Link>
                <br/>
                <Link to="/mrchebik/coconut-ide">/mrchebik/coconut-ide
                </Link>
                <DevTools/>
            </div>
        </Provider>
    );
};

Root.propTypes = {
    store: PropTypes.object
};

export default hot(module)(Root);
