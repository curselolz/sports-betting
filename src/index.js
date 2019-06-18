import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

if (typeof window !== 'undefined') {
    window.renderPoolsWebComponent = ({ rootComponentId = '', ...props }) => {
        ReactDOM.render(
            <App {...props} />,
            document.getElementById(rootComponentId),
        );
    };
}
