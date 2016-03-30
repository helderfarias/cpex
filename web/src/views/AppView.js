'use strict';

require('../css/main.css');

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Menu from './Menu';

class AppView extends Component {

	render() {
    	return (
        	<div>
                {this.props.children}
    		</div>
    	);
	}

}

AppView.contextTypes = {
    router: React.PropTypes.object.isRequired
};

module.exports = AppView;
