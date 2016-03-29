'use strict';

import { EventEmitter } from 'events';
import Dispatcher from '../Dispatcher';
import Eventos from '../configs/Eventos';
import MarkupService from '../services/MarkupService';

class MarkupStore extends EventEmitter {

    constructor(props) {
        super(props);
        this.erros = null;
        this.markups = [];
    }

    emitChange() {
        this.emit('change');
    }

    addChangeListener(callback) {
        this.on('change', callback);
    }

    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }

    getErros() {
        return this.erros;
    }

    getMarkups() {
        return this.markups;
    }

    consultar(callback) {
        const that = this;

        MarkupService.consultar().then((markups) => {
            that.markups = markups;
            callback();
        });
    }

}

var store = new MarkupStore();

Dispatcher.register(function(action) {
    switch (action.actionType) {
        case Eventos.Markup.LISTAR:
            store.consultar(() => store.emitChange());
            break;

        default:
            return true;
    }
});

module.exports = store;
