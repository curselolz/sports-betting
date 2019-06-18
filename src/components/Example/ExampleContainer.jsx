import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { example } from '../../actions/exampleActions';
import { getLoading } from '../../selectors/exampleSelector';

class ExampleContainer extends Component {
    componentDidMount() {
        const { exampleAction } = this.props;
        // dispatching action
        exampleAction();
    }

    render() {
        const {
            isLoadingWithSelector = false,
        } = this.props;

        return (
            <div>
                {isLoadingWithSelector ? 'isLoading' : 'Example component'}
            </div>
        );
    }
}

// prop types for all props used in component
ExampleContainer.propTypes = {
    exampleAction: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoadingWithSelector: PropTypes.bool.isRequired,
};

// get props from redux store (use selectors here)
const mapStateToProps = (state) => ({
    isLoading: state.example.isLoading,
    isLoadingWithSelector: getLoading(state), // or with selector
});

// connecting actions to component
const mapDispatchToProps = {
    exampleAction: example,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExampleContainer);
