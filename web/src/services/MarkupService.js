'use strict';

class MarkupService {

    consultar() {
        return fetch('http://localhost:5000/api/markups').then((res) => res.json());
    }

}

module.exports = new MarkupService();
