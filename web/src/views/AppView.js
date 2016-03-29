'use strict';

require('../css/main.css');

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {deepOrange500} from 'material-ui/lib/styles/colors';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import Menu from './Menu';

class AppView extends Component {

	render() {
    	return (
        	<div style={styles.container}>
                {this.props.children}
    		</div>
    	);
	}

}

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

AppView.contextTypes = {
    router: React.PropTypes.object.isRequired
};

module.exports = AppView;
