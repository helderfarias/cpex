'use strict';

import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import PlaylistAddIcon from 'material-ui/lib/svg-icons/av/playlist-add';
import FlatButton from 'material-ui/lib/flat-button';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';
import FontIcon from 'material-ui/lib/font-icon';
import Colors from 'material-ui/lib/styles/colors';
import AddIcon from 'material-ui/lib/svg-icons/content/add';
import ClearIcon from 'material-ui/lib/svg-icons/content/clear';
import SaveIcon from 'material-ui/lib/svg-icons/content/save';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import KeyboardArrowRightIcon from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-right';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FloatingActionButton from 'material-ui/lib/floating-action-button';

import MarkupAction from '../actions/MarkupAction';
import MarkupStore from '../stores/MarkupStore';


class ListagemIncidenteView extends Component {

    constructor(props) {
        super(props);
        this.calcularMarkupDivisor = this.calcularMarkupDivisor.bind(this);
        this.calcularMarkupMultiplicador = this.calcularMarkupMultiplicador.bind(this);
    }

    render() {
        return (
            <Paper zDepth={2}>
                <TextField style={style} hintText="Nome do markup" fullWidth={true} underlineShow={false} />

                <Divider />

                <div>
                    <List subheader="Incidentes" subheaderStyle={{ fontSize: 16 }}>
                        {this.props.initialIncidentes}
                    </List>

                    <Divider />

                    <List>
                        <ListItem primaryText={<div>Markup Divisor Mkd=(100-Tot. Perc.)/100: <span style={styles.sumario}>{this.calcularMarkupDivisor()}</span></div>} />
                        <ListItem primaryText={<div>Markup Multiplicador Mkm=1/Mkd: <span style={styles.sumario}>{this.calcularMarkupMultiplicador()}</span></div>} />
                    </List> 
                </div>
            </Paper>
        );
    }

    calcularMarkupDivisor() {
        if (!MarkupStore.getMarkup().incidentes.length) {
            return 0.0;
        }

        let markup = MarkupStore.getMarkup();

        let totalPercentual = markup.incidentes.map((i) => i.valor)
                                               .reduce((a, b) => parseFloat(a.valor) + parseFloat(b.valor));

        let mkd = (100 - totalPercentual) / 100;

        return mkd;
    }

    calcularMarkupMultiplicador() {
        if (!MarkupStore.getMarkup().incidentes.length) {
            return 0.0;
        }

        let mkd = this.calcularMarkupDivisor();

        return 1 / mkd;
    }

}


class NovoMarkupView extends Component {

    constructor(props) {
        super(props);
        this.voltar = this.voltar.bind(this);
        this.onChangeListener = this.onChangeListener.bind(this);
        this.iniciarIncidente = this.iniciarIncidente.bind(this);
        this.salvarIncidente = this.salvarIncidente.bind(this);
        this.cancelarIncidente = this.cancelarIncidente.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = this.getInitialStateFrom();
    }

    getInitialStateFrom() {
        return {
            dialog: { open: false, text: '', title: '' },
            isIncidente: false,
            markup: { incidentes: [] },
            form: [
                { value: null, error: null },
                { value: null, error: null },
            ]
        };
    }

    componentDidMount() {
        MarkupStore.addChangeListener(this.onChangeListener);
    }

    componentWillUnmount() {
        MarkupStore.removeChangeListener(this.onChangeListener);
    }

	render() {
        const rightIconMenu = (
            <IconMenu iconButtonElement={
                    <IconButton>
                        <MoreVertIcon color={Colors.grey400} />
                    </IconButton>
                }>
                <MenuItem>Editar</MenuItem>
                <MenuItem>Excluir</MenuItem>
            </IconMenu>
        );

        let incidentes = this.state.markup.incidentes.map((i) => {
            return (
                 <ListItem key={i.nome} style={styles.itemIncidente} primaryText={`${i.nome} (${i.valor}%)`} leftIcon={<KeyboardArrowRightIcon />} secondaryTextLines={2} rightIconButton={rightIconMenu}/>
            );
        });

      	return (
            <div>
                <AppBar
                    title={<span style={styles.title}>Novo Markup</span>}
                    iconElementLeft={<IconButton onTouchTap={this.voltar}><NavigationClose /></IconButton>}
                    iconElementRight={<FlatButton label="Salvar" />}/>

                    <Dialog
                        title={this.state.dialog.title}
                        actions={[
                            <FlatButton
                                label="OK"
                                primary={true}
                                onTouchTap={ () => this.setState({ dialog: {open: false} }) }
                            />
                        ]}
                        modal={false}
                        open={this.state.dialog.open}
                        onRequestClose={this.handleClose}>
                        {this.state.dialog.text}
                    </Dialog>

                    { !this.state.isIncidente && 
                        <ListagemIncidenteView initialMarkup={this.state.markup} initialIncidentes={incidentes}/> 
                    }

                    { this.state.isIncidente && 
                        <Paper zDepth={2}>
                            <List subheader="Incidentes" subheaderStyle={{ fontSize: 16 }}>
                                <TextField id="nome" style={style} hintText="Digite o nome do incidente" autoFocus={true} fullWidth={true} underlineShow={false} errorText={this.state.form[0].error} onChange={this.handleInputChange} />                                
                                <Divider />
                                <TextField id="valor" style={style} hintText="%" fullWidth={true} size={5} maxLength={5} underlineShow={false} errorText={this.state.form[1].error} onChange={this.handleInputChange} />
                                <Divider />
                                <div style={{ paddingTop: 10, textAlign: 'right' }}>
                                    <IconButton
                                        tooltip="Cancelar"
                                        tooltipPosition={"top-right"}
                                        onTouchTap={this.cancelarIncidente}>
                                        <ClearIcon />
                                    </IconButton>
                                    <IconButton
                                        disabled={ !!this.state.form.filter((f) => !!f.error).length }
                                        tooltip="Salvar"
                                        tooltipPosition={"top-left"}
                                        onTouchTap={this.salvarIncidente}>
                                        <SaveIcon />
                                    </IconButton>
                                </div>
                            </List>
                        </Paper>
                    }

                    { !this.state.isIncidente && 
                        <FloatingActionButton secondary={true} style={styles.novo} onTouchTap={this.iniciarIncidente}>
                            <ContentAdd />
                        </FloatingActionButton>
                    }
            </div>
    	);
	}

    onChangeListener() {
        if (MarkupStore.getErros()) {
            this.setState({ dialog: {open: true, title: 'Atenção!', text: MarkupStore.getErros()} })
            return;   
        }

        this.setState({ 
            dialog: {open: false}, 
            isIncidente: false,
            markup: MarkupStore.getMarkup(),
        });
    }

    salvarIncidente() {
        let markup = this.state.markup;

        let incidente = {
            nome: this.state.form[0].value,
            valor: this.state.form[1].value,
        };

        console.log(incidente);

        MarkupAction.salvar(markup, incidente);
    }

    cancelarIncidente() {
        this.setState({ 
            dialog: {open: false}, 
            isIncidente: false,
            form: this.state.form,
        });
    }

    iniciarIncidente() {
        this.setState({ isIncidente: true });
    }

    voltar() {
        this.context.router.push('markups');
    }

    handleInputChange(e) {
        if (e.target.id === 'nome') {
            this.state.form[0].value = e.target.value;
            this.state.form[0].error = (e.target.value ? null : 'Campo obrigatório');
            this.setState({ form: this.state.form });
            return;
        }

        if (e.target.id === 'valor') {
            this.state.form[1].value = parseFloat(e.target.value);
            this.state.form[1].error = (e.target.value ? null : 'Campo obrigatório');
            this.setState({ form: this.state.form });
            return;
        }
    }

}

const style = {
  marginLeft: 20,
};

const styles = {
    title: {
        cursor: 'pointer',
    },
    labelIncidente: {
        marginLeft: 20,
        paddingTop: 15,
        fontSize: 16,
    },
    itemIncidente: {
        marginLeft: 20,
    },
    buttonNovo: {
        margin: 10,
    },
    sumario: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'red',
    },
    novo: {
        position: 'fixed',
        bottom: 50,
        right: 50,
    }    
};

NovoMarkupView.contextTypes = {
    router: React.PropTypes.object.isRequired
};

module.exports = NovoMarkupView;
