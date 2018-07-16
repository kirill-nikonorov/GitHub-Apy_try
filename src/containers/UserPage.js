import React from "react"
import {compose, bindActionCreators} from "redux"
import {hot} from "react-hot-loader";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {loadStarred, loadUser} from "../actions";


const loadData = ({login, loadUser, loadStarred}) => {
    loadUser(login);
    loadStarred(login);
};

class UserPage extends React.Component {


    renderUser({login, avatarUrl, name}) {
        return (
            <Link to={`${login}`}
                  key={login}>
                <img src={`${avatarUrl}`} alt={login} width="72" height="72"/>
                <h3>
                    {login} {name && <span>* {name}</span>}
                </h3>
            </Link>)
    }

    renderRepos({fullName, name, owner: {login}}) {
        return (
            <div key={fullName}>
                <Link to={`${fullName}`}>{name} </Link><Link to={`${login}`}>by {login}</Link>
            </div>
        )
    }

    render() {
        const {user, starredRepos} = this.props;
        return (
            <div>
                {user ? (this.renderUser(user)) : null}
                {starredRepos ? starredRepos.map(this.renderRepos) : null}
                <hr/>
            </div>
        )
    }

    componentWillMount() {
        loadData(this.props);
    }

    componentWillReceiveProps(nextProps) {
       // console.log(this.props);
        if (this.props.login !== nextProps.login)
            loadData(nextProps)
    }
}

const mapStateToProps = (state, ownProps) => {
    const login = ownProps.match.params.login.toLowerCase();
    const {starredByUser, entities: {repos, users}} = state;

    const user = users[login];

    //console.log(login + " " + user);

    const starredRepoIds = starredByUser[login] || [];
    const starredRepos = starredRepoIds.map(repo => repos[repo]);

    //console.log("starredRepos = ", starredRepos);

    return {
        login,
        user,
        starredRepos
    };
};


export default compose(
    hot(module),
    connect(
        mapStateToProps,
        {
            loadStarred,
            loadUser
        }
    )
)(UserPage);
