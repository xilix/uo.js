'use strict';

module.exports = function uo() {
  var value = arguments[0];

  for (var i = 1; value !== undefined && i < arguments.length; i += 1) {
    value = value[arguments[i]];
  }

  return value;
};
