import React from 'react';
import {hot} from 'react-hot-loader';
import {Link} from 'react-router-dom';

const User = ({user :{login, avatarUrl, name}}) =>(
    <Link to={`/${login}`}
          key={login}>
        <img src={`${avatarUrl}`} alt={login} width="72" height="72"/>
        <h3>
            {login} {name && <span>* {name}</span>}
        </h3>
    </Link>
);


export default hot(module)(User);
