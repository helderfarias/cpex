'use strict';

import Dispatcher from '../Dispatcher';
import Eventos from '../configs/Eventos';

class MarkupAction {

    static filtrarPor() {
        Dispatcher.dispatch({
            actionType: Eventos.Markup.LISTAR
        });
    }

}

module.exports = MarkupAction;
