'use strict';

import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import AppView from './views/AppView';
import HomeView from './views/HomeView';
import ListaMarkupView from './views/ListaMarkupView';

const routes = (
	<Router history={hashHistory}>
        <Route path="/" component={AppView}>
            <IndexRoute component={HomeView}/>
        	<Route path="markup" component={ListaMarkupView} />
            <Route path="*" component={HomeView} />
        </Route>
    </Router>
);

module.exports = routes;
