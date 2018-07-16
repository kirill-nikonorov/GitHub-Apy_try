import React from "react"
import {compose, bindActionCreators} from "redux"
import {hot} from "react-hot-loader";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {loadStarred, loadUser} from "../actions";
import {Repo, User} from "../components"


const loadData = ({login, loadUser, loadStarred}) => {
    loadUser(login);
    loadStarred(login);
};

class UserPage extends React.Component {






    render() {
        const {user, starredRepos} = this.props;
        return (
            <div>
                {user ? <User data={user}/> : null}
                {starredRepos ?  starredRepos.map(repo => (
                    <Repo data={repo} key={repo.fullName}/>
                )) : null}
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
