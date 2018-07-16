import React from "react"
import {compose} from "redux"
import {hot} from "react-hot-loader";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {loadStargazers, loadRepo} from "../actions";

const loadData = ({repoFullName, loadRepo, loadStargazers}) => {
    loadRepo(repoFullName);
    loadStargazers(repoFullName);
};

class RepoPage extends React.Component {


    renderRepo({fullName, name, owner: {login}}) {

        //console.log("repo = ", fullName, name, login);

        return (
            <div key={login}>
                <Link to={`${fullName}`}>{name}</Link> by <Link to={`${login}`}>{login}</Link>
            </div>)
    }

    renderUser({avatarUrl, login}) {
        return (
            <Link to={`${login}`}
                  key={login}>
                <img src={`${avatarUrl}`} alt={login} width="72" height="72"/>
                <h3>
                    {login}
                </h3>
            </Link>)
    }

    render() {
        const {repo, stargasers} = this.props;


        return (
            <div>
                Repo
                {repo ? (this.renderRepo(repo)) : null}
                {stargasers ? stargasers.map(this.renderUser) : null}
                <hr/>
            </div>
        )
    }

    componentWillMount() {
        loadData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.login !== nextProps.login)
            loadData(nextProps)
    }
}

const mapStateToProps = (state, ownProps) => {
    const login = ownProps.match.params.login.toLowerCase();
    const repoName = ownProps.match.params.repo.toLowerCase();
    const {stargazersByRepo, entities: {repos, users}} = state;

    const repoFullName = `${login}/${repoName}`;

    //console.log("repoFullName = ", repoFullName);
    const repo = repos[repoFullName];

    const stargazersByRepoIds = stargazersByRepo[repoFullName] || [];
    const stargasers = stargazersByRepoIds.map(stargazer => users[stargazer]);

    //console.log("starredRepos = ", starredRepos);

    return {
        repoFullName,
        stargasers,
        repo
    };
};


export default compose(
    hot(module),
    connect(
        mapStateToProps,
        {
            loadStargazers,
            loadRepo
        }
    )
)(RepoPage);
