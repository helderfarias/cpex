'use strict';

require('../css/main.css');

import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {deepOrange500} from 'material-ui/lib/styles/colors';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Header from './Header';

class App extends Component {

	constructor(props, context) {
    	super(props, context);
	}

	render() {
    	return (
			<MuiThemeProvider muiTheme={muiTheme}>		
	        	<div style={styles.container}>
	        		<Header />
				</div>
    		</MuiThemeProvider>
    	);
	}	

}

injectTapEventPlugin();

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

ReactDom.render(<App/>, document.getElementById('content'));