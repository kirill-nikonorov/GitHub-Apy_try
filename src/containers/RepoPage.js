import React from "react"
import {compose} from "redux"
import {hot} from "react-hot-loader";
import {connect} from "react-redux";
import {loadStargazers, loadRepo} from "../actions";
import {Repo, User} from "../components"

const loadData = ({repoFullName, loadRepo, loadStargazers}) => {
    loadRepo(repoFullName);
    loadStargazers(repoFullName);
};

class RepoPage extends React.Component {

    render() {
        const {repo, stargazers} = this.props;

        return (
            <div>
                {repo ? <Repo data={repo}/> : null}
                <br/>
                {stargazers ? stargazers.map(stargazer => (
                    <User data={stargazer} key={stargazer.login}/>
                )) : null}
                <hr/>
            </div>
        )
    }

    componentWillMount() {
        loadData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.repoFullName !== nextProps.repoFullName)
            loadData(nextProps)
    }
}

const mapStateToProps = (state, ownProps) => {
    const login = ownProps.match.params.login.toLowerCase();
    const repoName = ownProps.match.params.repo.toLowerCase();
    const {pagination: {stargazersByRepo}, entities: {repos, users}} = state;

    const repoFullName = `${login}/${repoName}`;

    //console.log("repoFullName = ", repoFullName);
    const repo = repos[repoFullName];

    const stargazersByRepoIds = stargazersByRepo[repoFullName] || [];
    const stargazers = stargazersByRepoIds.map(stargazer => users[stargazer]);

    //console.log("starredRepos = ", starredRepos);

    return {
        repoFullName,
        stargazers,
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
