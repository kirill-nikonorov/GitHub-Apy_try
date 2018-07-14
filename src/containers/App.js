import React from "react"
import {compose, bindActionCreators} from "redux"
import {hot} from "react-hot-loader";
import {connect} from "react-redux";
import * as actions from "../actions"


class App extends React.Component {

    getValue = () => {
        return this.input.value;
    };
    setValue = (newValue) => {
        this.input.value = newValue;
    };
    handleClick = (e) => {
        e.preventDefault();
        console.log(this.getValue());
        this.props.actions.loadUser(this.getValue());
    };

    render() {
        const {value} = this.props;
        console.log(value);

        return (
            <div>
                <input
                    type='text'
                    defaultValue={value}
                    ref={(input => this.input = input)}
                />
                <button
                    onClick={this.handleClick}
                >Go
                </button>
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setValue(nextProps.value)
        }

    }
}

const mapStateToProps = (state, ownProps) => {
    const value = ownProps.location.pathname.substring(1);
    return {
        value
    };
};
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default compose(
    hot(module),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(App);
