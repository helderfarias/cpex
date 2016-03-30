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

import MarkupAction from '../actions/MarkupAction';
import MarkupStore from '../stores/MarkupStore';

class NovoMarkupView extends Component {

    constructor(props) {
        super(props);
        this.voltar = this.voltar.bind(this);
        this.onChangeListener = this.onChangeListener.bind(this);
        this.novoIncidente = this.novoIncidente.bind(this);
        this.salvarIncidente = this.salvarIncidente.bind(this);
        this.cancelarIncidente = this.cancelarIncidente.bind(this);
        this.state = this.getInitialStateFrom();
    }

    getInitialStateFrom() {
        return {
            open: false,
            erros: '',
            markup: { incidentes: [] },
            isNovoIncidente: false,
            nome: null,
            valor: null,
            form: {
                nome: null,
                valor: null,
                invalido: false,
            }
        };
    }

    getInitialFormFrom() {
        return {
            nome: null,
            valor: null,
            invalido: false,
        };
    }

    componentDidMount() {
        MarkupStore.addChangeListener(this.onChangeListener);
    }

    componentWillUnmount() {
        MarkupStore.removeChangeListener(this.onChangeListener);
    }

	render() {
        let incidentes = this.state.markup.incidentes.map((i) => {
            return (
                 <ListItem key={i.id} primaryText={i.nome} leftIcon={<NavigationClose />} />
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
                                onTouchTap={ () => this.setState({open: false}) }
                            />
                        ]}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}>
                        {this.state.dialog.text}
                    </Dialog>

                    <Card>
                        <CardText>
                            <TextField
                                floatingLabelText="Nome"
                                hintText="Digite o nome do markup"
                                fullWidth={true} />

                            <div style={styles.labelIncidente}>
                                <PlaylistAddIcon style={{verticalAlign: 'middle'}}/>
                                <span style={{marginLeft: 10}}>Itens Incidente</span>
                            </div>

                            <div style={styles.itemIncidente}>
                                { !this.state.isNovoIncidente &&
                                    <List>{incidentes}</List>
                                }

                                { this.state.isNovoIncidente &&
                                    <div>
                                        <TextField
                                            floatingLabelText="Incidente"
                                            hintText="Digite o nome do incidente"
                                            autoFocus={true}
                                            fullWidth={true}
                                            errorText={this.state.form.nome}
                                            onChange={ (e) => this.setState({ nome: e.target.value, form: this.getInitialFormFrom() }) }/>

                                        <TextField
                                            floatingLabelText="Percentual"
                                            hintText="%"
                                            fullWidth={true}
                                            size={3}
                                            maxLength={3}
                                            errorText={this.state.form.valor}
                                            onChange={ (e) => this.setState({ valor: e.target.value, form: this.getInitialFormFrom() }) }/>

                                        <div style={{ paddingTop: 10, textAlign: 'right' }}>
                                            <IconButton
                                                tooltip="Cancelar"
                                                tooltipPosition={"top-right"}
                                                onTouchTap={this.cancelarIncidente}>
                                                <ClearIcon />
                                            </IconButton>
                                            <IconButton
                                                tooltip="Salvar"
                                                tooltipPosition={"top-left"}
                                                onTouchTap={this.salvarIncidente}>
                                                <SaveIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                }

                                { !this.state.isNovoIncidente &&
                                    <FlatButton
                                          label="Adicionar novo incidente"
                                          labelPosition="after"
                                          backgroundColor={'transparent'}
                                          icon={<AddIcon />}
                                          labelStyle={{'textTransform': 'none'}}
                                          style={styles.buttonNovo}
                                          onTouchTap={this.novoIncidente}/>
                                }
                            </div>
                        </CardText>
                    </Card>
            </div>
    	);
	}

    onChangeListener() {
        this.setState({ markups: MarkupStore.getMarkups() })
    }

    salvarIncidente() {
        if (!this.state.nome) {
            this.state.form.nome = 'Campo requerido';
            this.state.form.invalido = true;
        }

        if (!this.state.valor) {
            this.state.form.valor = 'Campo requerido';
            this.state.form.invalido = true;
        } else if (isNaN(this.state.valor)) {
            this.state.form.valor = 'Valor inválido';
            this.state.form.invalido = true;
        }

        if (this.state.form.invalido) {
            this.setState({ isNovoIncidente: true, form: this.state.form });
            return;
        }

        //Recuperar anterior
        let markup = this.state.markup;
        markup.incidentes = markup.incidentes || [];

        //Validar percentual total
        let somatorio = 0;
        markup.incidentes.filter((i) => somatorio = somatorio + parseFloat(i.valor));
        somatorio = somatorio + parseFloat(this.state.valor);
        if (somatorio > 100) {
            this.setState({ open: true, erros: 'Percentual ultrapassou 100%' });
            return;
        }

        //Se válido adiciona
        markup.incidentes.push({
            id: markup.incidentes.length + 1,
            nome: this.state.nome,
            valor: this.state.valor
        });

        let state = this.getInitialStateFrom();
        state.markup = markup;
        this.setState(state);
    }

    cancelarIncidente() {
        this.setState({ isNovoIncidente: false, form: this.state.form });
    }

    novoIncidente() {
        this.setState({ isNovoIncidente: true });
    }

    voltar() {
        this.context.router.push('markups');
    }

}

const styles = {
    title: {
        cursor: 'pointer',
    },
    labelIncidente: {
        paddingTop: 25,
        fontSize: 16,
    },
    itemIncidente: {
        marginLeft: 50,
    },
    buttonNovo: {
        margin: 5,
    }
};

NovoMarkupView.contextTypes = {
    router: React.PropTypes.object.isRequired
};

module.exports = NovoMarkupView;
