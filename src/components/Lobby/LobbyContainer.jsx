import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadEvents } from '../../actions/lobbyActions';
import Loader from '../Loader/Loader';

class ExampleContainer extends Component {
    componentDidMount() {
        const { loadEventsAction } = this.props;
        // dispatching action
        loadEventsAction();
    }

    render() {
        const {
            isLoading = false,
            eventGroups = [],
        } = this.props;

        return (
            <div>
                {isLoading ? <Loader /> : ''}
            </div>
        );
    }
}

// prop types for all props used in component
ExampleContainer.propTypes = {
    loadEventsAction: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    eventGroups: PropTypes.array.isRequired,
};

// get props from redux store (use selectors here)
const mapStateToProps = (state) => ({
    eventGroups: state.lobby.eventGroups,
    isLoading: state.lobby.isLoading,
});

// connecting actions to component
const mapDispatchToProps = {
    loadEventsAction: loadEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExampleContainer);
