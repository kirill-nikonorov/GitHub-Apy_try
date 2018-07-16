import React from "react"
import {compose} from "redux"
import {hot} from "react-hot-loader";
import {connect} from "react-redux";
import {loadStarred, loadUser} from "../actions";
import {Repo, User, List} from "../components"


const loadData = ({login, loadUser, loadStarred}) => {
    loadUser(login);
    loadStarred(login);
};

class UserPage extends React.Component {

    handleLoadMore = () => {
        const {starredPagination: {nextPageUrl}, loadStarred, login} = this.props;
        loadStarred(login, nextPageUrl);
    };

    renderRepo(repo) {
        return <Repo repo={repo} key={repo.fullName}/>
    }


    render() {
        const {user, starredRepos, starredPagination} = this.props;

        if (!user)
            return <span>Loading</span>;
        return (
            <div>
                <User user={user}/>
                <br/>
                <List
                    items={starredRepos}
                    renderElement={this.renderRepo}
                    handleLoadMore={this.handleLoadMore}
                    {...starredPagination}
                />
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
    const {
        pagination: {starredByUser},
        entities: {repos, users}
    } = state;

    const starredPagination = starredByUser[login] || {};
    const starredRepoIds = starredPagination.ids || [];
    const starredRepos = starredRepoIds.map(repo => repos[repo]);

    return {
        login,
        user: users[login],
        starredRepos,
        starredPagination
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
