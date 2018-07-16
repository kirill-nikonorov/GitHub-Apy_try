import React from 'react';
import {hot} from 'react-hot-loader';
import {Link} from 'react-router-dom';


const Repo = ({data: {fullName, name, owner: {login}}}) => (
    <div key={login}>
        <Link to={`/${fullName}`}>{name}</Link> by <Link to={`/${login}`}>{login}</Link>
    </div>
);

export default hot(module)(Repo);
