'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(Routes, document.getElementById('content'));