'use strict';

require('../css/main.css');

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {deepOrange500} from 'material-ui/lib/styles/colors';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Menu from './Menu';

class AppView extends Component {

	render() {
    	return (
			<MuiThemeProvider muiTheme={muiTheme}>		
	        	<div style={styles.container}>
	        		<Menu />
				</div>
    		</MuiThemeProvider>
    	);
	}	

}

AppView.contextTypes = {
	router: React.PropTypes.object.isRequired
};

const styles = {
	container: {
    	textAlign: 'center'
  	},
};

const muiTheme = getMuiTheme({
	palette: {
    	accent1Color: deepOrange500,
  	},
});

module.exports = AppView;