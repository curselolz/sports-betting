import React from 'react';
import './layout.scss';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
    <div className="fleshbet-app">
        {children}
    </div>
);

Layout.propTypes = {
    children: PropTypes.any.isRequired,
};

export default Layout;
