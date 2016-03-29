'use strict';

import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import Divider from 'material-ui/lib/divider';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import PersonAdd from 'material-ui/lib/svg-icons/social/person-add';
import QueuePlayNextIcon from 'material-ui/lib/svg-icons/av/queue-play-next';

class Menu extends Component {

    constructor(props, context) {
        super(props, context);
        this.cadastrarMarkup = this.cadastrarMarkup.bind(this);
    }

    render() {
        return (
            <div>
                <AppBar
                    title="CPEX"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    iconElementLeft={
                    <IconMenu
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}>
                        <MenuItem primaryText="Markups" leftIcon={<QueuePlayNextIcon />} onTouchTap={this.cadastrarMarkup} />
                        <MenuItem primaryText="Produtos" leftIcon={<PersonAdd />} onTouchTap={ () => console.log('Produtos') } />
                        <Divider />
                        <MenuItem primaryText="Sair" leftIcon={<Delete />} onTouchTap={ () => console.log('sair') }/>
                    </IconMenu>
                }/>
            </div>
        )
    }

    cadastrarMarkup() {
        this.context.router.push('markup');
    }

}

Menu.contextTypes = {
    router: React.PropTypes.object.isRequired
};

module.exports = Menu;
