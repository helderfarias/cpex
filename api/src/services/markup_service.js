'use strict';

class MarkupService {

	constructor(props) {
		this.db = props.db;
	}

	obterTodos() {
		return this.db.select('*').from('markups');
	}

}

module.exports = MarkupService;
