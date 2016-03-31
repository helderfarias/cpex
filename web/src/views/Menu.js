'use strict';

import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Divider from 'material-ui/lib/divider';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import PersonAdd from 'material-ui/lib/svg-icons/social/person-add';
import QueuePlayNextIcon from 'material-ui/lib/svg-icons/av/queue-play-next';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Empty from '../components/Empty';


class AppMenu extends Component {

    constructor(props, context) {
        super(props, context);
        this.markups = this.markups.bind(this);
    }

    render() {
        return (
            <div>
                <AppBar title="CPEX" iconElementLeft={<Empty/>} style={styles.header}/>

                <LeftNav width={250} openLeft={true} style={styles.left}>
                    <AppBar showMenuIconButton={false}/>

                    <List style={styles.menu}>
                        <ListItem primaryText="Markups" leftIcon={<QueuePlayNextIcon />} onTouchTap={this.markups}/>
                        <ListItem primaryText="Produtos" leftIcon={<PersonAdd />} />
                        <Divider />
                        <ListItem primaryText="Sair" leftIcon={<Delete />} />
                    </List>
                </LeftNav>
            </div>
        )
    }

    markups() {
        this.context.router.push('markups');
    }

}

const styles = {
    header: {
        textAlign: 'left',
    },
    left: {
        zIndex: -1,
    },
    menu: {
        textAlign: 'left',
    },
}

AppMenu.contextTypes = {
    router: React.PropTypes.object.isRequired
};

module.exports = AppMenu;
