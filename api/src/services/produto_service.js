'use strict';

class ProdutoService {

	constructor(props) {
		this.db = props.db;
	}

	obterTodos() {
		return this.db.select('*').from('produtos');
	}

}

module.exports = ProdutoService;
