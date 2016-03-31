'use strict';

require('../css/main.css');

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Menu from './Menu';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import BaseTheme from '../configs/BaseTheme';
import DevTheme from '../configs/DevTheme';


class AppView extends Component {

	render() {
    	return (
            <MuiThemeProvider muiTheme={getMuiTheme(BaseTheme)}>
            	<div>
                    {this.props.children}
        		</div>
            </MuiThemeProvider>
    	);
	}

}

AppView.contextTypes = {
    router: React.PropTypes.object.isRequired
};

module.exports = AppView;
