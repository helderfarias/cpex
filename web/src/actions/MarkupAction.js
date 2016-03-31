'use strict';

import Dispatcher from '../Dispatcher';
import Eventos from '../configs/Eventos';

class MarkupAction {

    static filtrarPor() {
        Dispatcher.dispatch({
            actionType: Eventos.Markup.LISTAR
        });
    }

    static salvar(markup, incidente) {
        Dispatcher.dispatch({
            actionType: Eventos.Markup.INCLUIR_INCIDENTE,
            markup: markup,
            incidente: incidente
        });    	
    }

}

module.exports = MarkupAction;
