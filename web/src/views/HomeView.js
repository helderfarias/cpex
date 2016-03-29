'use strict';

require('../css/main.css');

import React, { Component } from 'react';
import Menu from './Menu';

class HomeView extends Component {

	render() {
    	return (
        	<div style={styles.container}>
                <Menu />
            </div>
    	);
	}

}

const styles = {
	container: {
    	textAlign: 'center'
  	},
};

HomeView.contextTypes = {
    router: React.PropTypes.object.isRequired
};

module.exports = HomeView;
