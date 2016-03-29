'use strict';

import React, { Component } from 'react';
import { createHashHistory } from 'history';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppView from './views/AppView';
import NotFoundView from './views/NotFoundView';
import CadastroMarkupView from './views/CadastroMarkupView';

const routes = (
	<Router history={browserHistory}>
        <Route path="/" component={AppView}>
        	<Route path="markup/novo" component={CadastroMarkupView} />
            <Route path="*" component={NotFoundView} />
        </Route>
    </Router>	
);

module.exports = routes;