import React from 'react';
import { Provider } from 'react-redux';
import './static/styles/index.scss';
import PropTypes from 'prop-types';
import Router from './components/Router/Router';
import configureStore from './store/configureStore';
import defaultConfig from './utils/defaultConfig';
import endpoints from './services';
import Api from './utils/api';

// import WebSocket from './utils/websocket';

class App extends React.PureComponent {
    static defaultProps = {
        config: { ...defaultConfig },
    };

    componentWillMount() {
        const { config = {} } = this.props;
        Api.setEndpoins(endpoints);
        Api.setHosts({ host: config.host });
        // WebSocket.setConfig({ envName, pusherKey, cluster: clusterName });
    }

    render() {
        const { config } = this.props;
        return (
            <Provider store={configureStore({ config })}>
                <Router />
            </Provider>
        );
    }
}

App.propTypes = {
    config: PropTypes.any,
};


export default App;
