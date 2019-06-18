import React from 'react';
import './loader.scss';
import { ReactComponent as Spinner } from '../../static/svg/spinner.svg';

export default () => (
    <div className="list-loading">
        <Spinner />
    </div>
);
