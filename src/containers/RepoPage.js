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
        const {repo, stargasers} = this.props;

        return (
            <div>
                {repo ? <Repo data={repo}/> : null}
                <br/>
                {stargasers ? stargasers.map(stargazers => (
                    <User data={stargazers} key={stargazers.login}/>
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
