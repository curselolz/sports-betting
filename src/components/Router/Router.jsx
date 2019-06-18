import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StaticRouter } from 'react-router';
import Page404 from '../Page404/Page404';
import Layout from '../Layout/Layout';
import LobbyContainer from '../Lobby/LobbyContainer';

const Router = () => {
    const RouterToUse = typeof window !== 'undefined' ? BrowserRouter : StaticRouter;
    return (
        <RouterToUse basename="/" onUpdate={() => window?.scrollTo(0, 0)}>
            <Layout>
                <Switch>
                    <Route exact path="/" component={LobbyContainer} />

                    <Route component={Page404} />
                </Switch>
            </Layout>
        </RouterToUse>
    );
};

export default Router;
