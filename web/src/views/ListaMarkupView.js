'use strict';

import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import FlatButton from 'material-ui/lib/flat-button';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

import MarkupAction from '../actions/MarkupAction';
import MarkupStore from '../stores/MarkupStore';

class ListaMarkupView extends Component {

    constructor(props) {
        super(props);
        this.voltar = this.voltar.bind(this);
        this.onChangeListener = this.onChangeListener.bind(this);
        this.state = {
            markups: [],
        }
    }

    componentDidMount() {
        MarkupStore.addChangeListener(this.onChangeListener);
        MarkupAction.filtrarPor();
    }

    componentWillUnmount() {
        MarkupStore.removeChangeListener(this.onChangeListener);
    }

	render() {
        let registros = this.state.markups.map((m) => {
            return (
                <TableRow key={m.id}>
                    <TableRowColumn>{m.id}</TableRowColumn>
                    <TableRowColumn>{m.nome}</TableRowColumn>
                </TableRow>
            );
        });

    	return (
            <div>
                <AppBar
                    title={<span style={styles.title}>Markup</span>}
                    iconElementLeft={<IconButton onTouchTap={this.voltar}><NavigationClose /></IconButton>} />

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Código</TableHeaderColumn>
                            <TableHeaderColumn>Nome</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {registros}
                    </TableBody>
                </Table>
            </div>
    	);
	}

    onChangeListener() {
        this.setState({ markups: MarkupStore.getMarkups() })
    }

    voltar() {
        this.context.router.push('/');
    }

}

const styles = {
    title: {
        cursor: 'pointer',
    },
};

ListaMarkupView.contextTypes = {
    router: React.PropTypes.object.isRequired
};

module.exports = ListaMarkupView;
