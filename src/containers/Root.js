import React from 'react';
import {Provider} from 'react-redux';
import {hot} from 'react-hot-loader';
import PropTypes from 'prop-types';
import FormPart from './FormPart';

const Root = ({store}) => {
    return (
        <Provider store={store}>
            <FormPart store={store}/>
        </Provider>
    );
};

Root.propTypes = {
    store: PropTypes.object
};

export default hot(module)(Root);
