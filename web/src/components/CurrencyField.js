'use strict';

import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';

class CurrencyField extends Component {

  	constructor(props) {
		super(props)
		this.onInputType = this.onInputType.bind(this);
		this.formattedRawValue = this.formattedRawValue.bind(this);
		this.getRawValue = this.getRawValue.bind(this);
		this.state = {
			rawValue: this.props.value
		}
  	}

  	componentWillMount() {
		this.notifyParentWithRawValue(this.state.rawValue);
  	}

  	componentWillReceiveProps (nextProps) {
    	if (nextProps.value || nextProps.value === 0) {
      		this.setState({ rawValue: nextProps.value });
    	}
  	}

	onInputType (event) {
		const input = event.target.value;
	    
	    let rawValue = this.getRawValue(input);
	    if (!rawValue) {
			rawValue = 0;
	    }

	    this.notifyParentWithRawValue(rawValue);

	    this.setState({ rawValue });
	}

  	notifyParentWithRawValue (rawValue) {
    	let display = this.formattedRawValue(rawValue);

    	this.props.onChange(rawValue, display);
  	}

  	getRawValue (displayedValue) {
    	let result = displayedValue

	    result = removeOccurrences(result, this.props.delimiter);
	    result = removeOccurrences(result, this.props.separator);
	    result = removeOccurrences(result, this.props.unit);

    	return parseFloat(result);
  	}

  	formattedRawValue (rawValue) {
	    const minChars = '0'.length + this.props.precision;

	    let result = '';
	    result = `${rawValue}`;

	    if (result.length < minChars) {
			const leftZeroesToAdd = minChars - result.length;
	      	result = `${repeatZeroes(leftZeroesToAdd)}${result}`;
	    }

	    let beforeSeparator = result.slice(0, result.length - this.props.precision);
	    let afterSeparator = result.slice(result.length - this.props.precision);

	    if (beforeSeparator.length > 3) {
	      	let chars = beforeSeparator.split('').reverse();
	      	let withDots = '';

	      	for (var i = chars.length -1; i >= 0; i--) {
	        	let char = chars[i];
	        	let dot = i % 3 === 0 ? this.props.delimiter : '';
	        	withDots = `${withDots}${char}${dot}`;
	      	}

	      	withDots = withDots.substring(0, withDots.length - 1);
	      	beforeSeparator = withDots;
	    }

	    result = beforeSeparator + this.props.separator + afterSeparator;

	    if (this.props.unit) {
			result = `${this.props.unit} ${result}`;
	    }

	    return result;
  	}

  	render() {
    	return (
			<TextField {...this.props} 
						onChange={this.onInputType}  
						value={this.formattedRawValue(this.state.rawValue)} />
    	)
  	}

}

const repeatZeroes = (times) => {
	let result = '';
  	let i = 0;
  
  	for (i = 0; i < times; i++) {
    	result += '0';
  	}

  	return result;
}

const removeOccurrences = (from, toRemove) => {
	toRemove = toRemove.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  	
  	let re = new RegExp(toRemove, 'g');

  	return from.replace(re, '');
}

CurrencyField.propTypes = {
	id: React.PropTypes.string,
	delimiter: React.PropTypes.string,
	onChange: React.PropTypes.func,
	precision: React.PropTypes.number,
	separator: React.PropTypes.string,
	unit: React.PropTypes.string,
	value: React.PropTypes.number.isRequired
}

CurrencyField.defaultProps = {
	value: 0,
	precision: 2,
	separator: '.',
	delimiter: ',',
	unit: '',
	onChange: () => {}
}

module.exports = CurrencyField;