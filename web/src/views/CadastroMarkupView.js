'use strict';

import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';

class CadastroMarkupView extends Component {

	render() {
    	return (
            <div>
 			    <AppBar
                    title="Croquil"
                    iconClassNameRight="muidocs-icon-navigation-expand-more" />

                <p>Oí nós aí patrão!!!!</p>
            </div>
    	);
	}

    // sair() {
    //     const aThis = this;

    //     fetch('http://localhost:5000/api/produtos').then((res) => {
    //         return res.json();
    //     }).then((res) => {
    //         aThis.setState({ contratos: res });
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }
}

CadastroMarkupView.contextTypes = {
    router: React.PropTypes.object.isRequired
};

module.exports = CadastroMarkupView;