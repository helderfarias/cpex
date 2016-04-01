'use strict';

import React, { Component } from 'react';
import { Table, TableHeaderColumn, TableRow, TableHeader, TableRowColumn, TableBody } from 'material-ui/lib/table';
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
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import MarkupAction from '../actions/MarkupAction';
import MarkupStore from '../stores/MarkupStore';
import CurrencyField from '../components/CurrencyField';

class NovoMarkupView extends Component {

    constructor(props) {
        super(props);
        this.voltar = this.voltar.bind(this);
        this.onChangeListener = this.onChangeListener.bind(this);
        this.iniciarIncidente = this.iniciarIncidente.bind(this);
        this.salvarIncidente = this.salvarIncidente.bind(this);
        this.cancelarIncidente = this.cancelarIncidente.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.calcularMarkupDivisor = this.calcularMarkupDivisor.bind(this);
        this.calcularMarkupMultiplicador = this.calcularMarkupMultiplicador.bind(this);
        this.criarFormMarkup = this.criarFormMarkup.bind(this);
        this.criarFormValidacao = this.criarFormValidacao.bind(this);
        this.calcularValorVenda = this.calcularValorVenda.bind(this);
        this.state = this.getInitialStateFrom();
    }

    getInitialStateFrom() {
        return {
            dialog: { open: false, text: '', title: '' },
            isIncidente: false,
            markup: MarkupStore.getMarkup(),
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


                    <Tabs>
                        <Tab label="Markup">
                            { this.criarFormMarkup() }
                        </Tab>

                        <Tab label="Validação">
                            { this.criarFormValidacao() }
                        </Tab>
                    </Tabs>
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

    calcularMarkupDivisor() {
        if (!MarkupStore.getMarkup().incidentes.length) {
            return 0.0;
        }

        let markup = MarkupStore.getMarkup();

        let totalPercentual = markup.incidentes.map((incidente) => incidente.valor)
                                               .reduce((valor1, valor2) => valor1 + valor2);

        let mkd = (100 - totalPercentual) / 100;

        return mkd.toFixed(4);
    }

    calcularMarkupMultiplicador() {
        if (!MarkupStore.getMarkup().incidentes.length) {
            return 0.0;
        }

        let mkm = 1 / this.calcularMarkupDivisor();

        return mkm.toFixed(4);
    }

    calcularTotalPercentual() {
        if (!MarkupStore.getMarkup().incidentes.length) {
            return 0.00;
        }

        let markup = MarkupStore.getMarkup();

        let total = markup.incidentes.map((incidente) => incidente.valor)
                                     .reduce((valor1, valor2) => valor1 + valor2);

        return total.toFixed(2);
    }

    calcularValorVenda() {
        if (!this.state.custoPorUnidade) {
            return 0;
        }


        let valorCusto = this.state.custoPorUnidade;

        let markupMultiplicador = this.calcularMarkupMultiplicador();

        let total = valorCusto * markupMultiplicador;

        return total.toFixed(2);
    }

    criarFormValidacao() {
        return (
            <Paper>
                <Paper style={{ margin: 10 }}>
                    <List>
                        <TextField id="nome"
                                    style={styles.input}
                                    hintText="Custo Variável por unidade"
                                    autoFocus={true}
                                    onChange={ (e) => this.setState({ custoPorUnidade: parseFloat(e.target.value) }) } />

                        <ListItem disabled={true} 
                                    primaryText={<div>Markup Multiplicador: <span style={styles.sumario}>{this.calcularMarkupMultiplicador()}%</span></div>} />

                        <ListItem disabled={true} 
                                    primaryText={<div>Valor de Venda: <span style={styles.sumario}>R$ {this.calcularValorVenda()}</span></div>} />
                    </List>
                </Paper>

                <Table>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Item Incidente</TableHeaderColumn>
                            <TableHeaderColumn>Percentual</TableHeaderColumn>
                            <TableHeaderColumn>Valor</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow selectable={false}>
                            <TableRowColumn>Simples Nacional</TableRowColumn>
                            <TableRowColumn>10</TableRowColumn>
                            <TableRowColumn>10</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    }

    criarFormMarkup() {
        let markup = this.state.markup;

        let incidentes = markup.incidentes.map((value, key) => {
            const isRenderDivider = (key < markup.incidentes.length - 1);
            const isNovo = (key === (markup.incidentes.length - 1) && !this.state.isIncidente);

            return (
                <div>
                    <ListItem primaryText={`${value.nome} (${value.valor}%)`}
                                leftIcon={<KeyboardArrowRightIcon />}
                                disabled={true}
                                secondaryTextLines={2}
                                rightIconButton={
                                    <div>
                                        <IconMenu iconButtonElement={
                                                <IconButton>
                                                    <MoreVertIcon color={Colors.grey400}/>
                                                </IconButton>
                                            }>
                                            <MenuItem onTouchTap={ () => MarkupAction.excluirIncidente(markup, value) }>Excluir</MenuItem>
                                        </IconMenu>

                                        <IconButton disabled={!isNovo} onTouchTap={this.iniciarIncidente}>
                                            { isNovo && <ContentAdd /> }
                                        </IconButton>
                                    </div>
                                }/>
                    { isRenderDivider && <Divider /> }
                </div>
            );
        });

        let vazio = null;
        if (!incidentes.length) {
            vazio = (
                <ListItem primaryText={<br/>}
                            secondaryTextLines={2}
                            disabled={true}
                            rightIconButton={
                                <div>
                                    <IconButton disabled={true}/>
                                    <IconButton onTouchTap={this.iniciarIncidente}>
                                        <ContentAdd />
                                    </IconButton>
                                </div>
                            }/>
            );
        }

        return (
            <Paper>
                <CurrencyField style={styles.input} 
                                hintText="Nome do markup" 
                                underlineShow={false}
                                precision={2}
                                separator=','
                                delimiter='.'
                                unit='R$'
                                onChange={(r, d) => {
                                    console.log(r, d);
                                    // this.setState({});
                                }}/>

                <Divider />
                <List>
                    <Paper style={{ margin: 10 }}>
                        <List>
                            {!this.state.isIncidente &&
                                incidentes
                            }

                            {!this.state.isIncidente &&
                                vazio
                            }

                            {this.state.isIncidente &&
                                <div>
                                    {!incidentes && <Divider/>}
                                    <br />
                                    <TextField id="nome"
                                                style={styles.input}
                                                hintText="Digite o nome do incidente"
                                                errorText={this.state.form[0].error}
                                                autoFocus={true}
                                                onChange={this.handleInputChange} />
                                    <br />
                                    <TextField id="valor"
                                                style={styles.input}
                                                hintText="%"
                                                errorText={this.state.form[0].error}
                                                size={5} maxLength={5}
                                                onChange={this.handleInputChange} />
                                    <br />
                                    <div style={{ textAlign: 'right', margin: 20 }}>
                                        <RaisedButton style={{ marginLeft: 4 }} label="Cancelar" primary={true} onTouchTap={this.cancelarIncidente}/>
                                        <RaisedButton style={{ marginLeft: 4 }} label="Salvar" disabled={ !!this.state.form.filter((f) => !!f.error).length } secondary={true} onTouchTap={this.salvarIncidente} />
                                    </div>
                                </div>
                            }
                        </List>
                        <Divider />
                        <List>
                            <ListItem disabled={true} primaryText={<div>Total Percentual: <span style={styles.sumario}>{this.calcularTotalPercentual()}%</span></div>} />
                            <ListItem disabled={true} primaryText={<div>Markup Divisor: <span style={styles.sumario}>{this.calcularMarkupDivisor()}%</span></div>} />
                            <ListItem disabled={true} primaryText={<div>Markup Multiplicador: <span style={styles.sumario}>{this.calcularMarkupMultiplicador()}%</span></div>} />
                        </List>
                    </Paper>
                </List>
            </Paper>
        );
    }

}

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
    },
    input: {
        marginLeft: 20,
        width: '90%'
    }
};

NovoMarkupView.contextTypes = {
    router: React.PropTypes.object.isRequired
};

module.exports = NovoMarkupView;
