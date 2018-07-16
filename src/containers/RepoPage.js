import React from "react"
import {compose} from "redux"
import {hot} from "react-hot-loader";
import {connect} from "react-redux";
import {loadStargazers, loadRepo} from "../actions";
import {Repo, User, List} from "../components"

const loadData = ({repoFullName, loadRepo, loadStargazers}) => {
    loadRepo(repoFullName);
    loadStargazers(repoFullName);
};

class RepoPage extends React.Component {
    handleLoadMore = () => {
        const {stargazersPagination: {nextPageUrl}, loadStargazers, repoFullName} = this.props;
        console.log("loadStargazers = ", nextPageUrl);
        loadStargazers(repoFullName, nextPageUrl);
    };

    renderUser(user) {
        return <User user={user} key={user.login}/>
    };

    render() {
        const {repo, stargazers, stargazersPagination: {nextPageUrl}} = this.props;

        if (!repo)
            return <span>Loading</span>;

        return (
            <div>
                <Repo repo={repo}/>
                <br/>
                <List items={stargazers}
                      renderElement={this.renderUser}
                      nextPageUrl={nextPageUrl}
                      handleLoadMore={this.handleLoadMore}/>
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

    const {
        pagination: {stargazersByRepo},
        entities: {repos, users}
    } = state;

    const repoFullName = `${login}/${repoName}`;

    const stargazersPagination = stargazersByRepo[repoFullName] || {ids: []};
    const stargazersByRepoIds = stargazersPagination.ids;
    const stargazers = stargazersByRepoIds.map(stargazer => users[stargazer]);

    //console.log("nextPageUrl = " + stargazersPagination.nextPageUrl);
    //console.log("starredRepos = ", starredRepos);
    return {
        repoFullName,
        stargazers,
        repo: repos[repoFullName],
        stargazersPagination
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
