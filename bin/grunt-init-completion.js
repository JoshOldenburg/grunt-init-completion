#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var tab = require('tabalot');
var noop = function() {}
var homedir = path.resolve(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], '.grunt-init');

if (process.argv.indexOf('completion') !== -1 && process.argv.indexOf('--') === -1) {
	process.argv.push('--bin');
	process.argv.push('grunt-init');
	process.argv.push('--completion');
	process.argv.push('grunt-init-completion');
}

fs.readdir(path.join(homedir), function(err, files) {
	if (err) process.exit(2);

	files = files.filter(function(file) {
		return fs.statSync(path.join(homedir, file)).isDirectory();
	});

	files.forEach(function(file) {
		tab(file)(noop);
	});

	tab.parse();
});
