'use strict';

var App = require('app');
var BrowserWindow = require('browser-window');
var CrashReporter = require('crash-reporter');
var server = require('./api/src/main');
var mainWindow = null;

CrashReporter.start();

App.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        App.quit();
    }
});

App.on('ready', function() {
    mainWindow = new BrowserWindow({ width: 1240, height: 800 });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
	
    if (typeof process !== 'undefined' && process.env.NODE_DEBUG === 'true') {
        mainWindow.openDevTools();
    }

    mainWindow.on('closed', function() {
        mainWindow = null;
        server.close();
    });

    console.log(mainWindow);
});