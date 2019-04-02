'use strict';

var _cat = require('modules/cat');

var loki = new _cat.Cat('Loki', 'siamese', 'lilac point', '28-10-2013');
var turbo = new _cat.Cat('Turbo', 'oriental shorthair', 'lilac point', '22-07-2013');

window.onload = function () {
    document.getElementById('cats').innerHTML = '<ul><li>' + loki.getInfo() + '</li><li>' + turbo.getInfo() + '</li></ul>';
};
