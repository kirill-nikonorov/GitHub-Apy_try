import React from 'react';
import {Provider} from 'react-redux';
import {hot} from 'react-hot-loader';
import PropTypes from 'prop-types';

import {Route, Link} from 'react-router-dom';

import App from "./App"


const Root = ({store}) => {
    return (
        <Provider store={store}>
            <div>
                <Route path="/" component={App}/>
                <Link to="/aqq">Link</Link>
                <br/>
                <Link to="/">root</Link>
            </div>
        </Provider>
    );
};

Root.propTypes = {
    store: PropTypes.object
};

export default hot(module)(Root);
