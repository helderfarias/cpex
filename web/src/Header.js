'use strict';

import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import MenuItem from 'material-ui/lib/menus/menu-item';
import LeftNav from 'material-ui/lib/left-nav';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

class Header extends Component {

	constructor(props, context) {
    	super(props, context);
        this.sair = this.sair.bind(this);
        this.state = {
            contratos: [],
        };
	}

	render() {
        const rows = this.state.contratos.map((c) => {
            return (
              <TableRow key={c.id}>
                <TableRowColumn>{c.id}</TableRowColumn>
                <TableRowColumn>{c.numero_cartao_brisanet}</TableRowColumn>
              </TableRow>                
            );
        });

    	return (
            <div>
 			    <AppBar
    			     title="Croquil"
    			     iconClassNameRight="muidocs-icon-navigation-expand-more"
                     onLeftIconButtonTouchTap={this.sair}
                     iconElementLeft={
                          <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                            <MenuItem primaryText="Produtos" onTouchTap={ () => this.sair() } />
                            <MenuItem primaryText="Sair" onTouchTap={ () => alert('Não implementado') }/>
                          </IconMenu>
                    }/>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>Nome</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {rows}
                </TableBody>
              </Table>
            </div>
    	);
	}

    sair() {
        const aThis = this;

        fetch('http://localhost:5000/api/produtos').then((res) => {
            return res.json();
        }).then((res) => {
            aThis.setState({ contratos: res });
        }).catch((err) => {
            console.log(err);
        });
    }

}

module.exports = Header;