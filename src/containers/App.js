import React from "react"
import {compose, bindActionCreators} from "redux"
import {hot} from "react-hot-loader";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';


class App extends React.Component {

    getValue = () => {
        return this.input.value;
    };
    setValue = (newValue) => {
        this.input.value = newValue;
    };
    handleClick = (e) => {
        e.preventDefault();
        this.props.history.push(`/${this.getValue()}`)
    };

    render() {
        const {value} = this.props;
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
                <br/>
                <Link to="/kirill-nikonorov">kirill-nikonorov</Link>
                <br/>
                <Link to="/mrchebik/coconut-ide">/mrchebik/coconut-ide </Link>
                <hr/>
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

export default compose(
    hot(module),
    connect(
        mapStateToProps
    )
)(App);
