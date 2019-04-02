'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.birthdateToAge = birthdateToAge;
var stringToDate = function stringToDate(dateAsString) {
    var date = dateAsString.split('-');
    var d = date[0];
    var m = date[[1] - 1];
    var y = date[2];
    return new Date(y, m, d, 23, 59, 59);
};

function birthdateToAge(birthdate) {

    return stringToDate(birthdate);
};
