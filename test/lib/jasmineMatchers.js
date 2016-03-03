/**
 * Adds matchers to Jasmine so they can be called from test units
 * These are handy for debugging because they produce better error
 * messages than "Expected false to be true"
 */
beforeEach(function() {
  'use strict';

	function isArray(x) {
    if (typeof Array.isArray !== 'function') {
      return x && typeof x === 'object' && Object.prototype.toString.call(x) === '[object Array]';
    }
    return Array.isArray(x);
  }
  function extendedTypeOf(x) {
    var actual;
    if( isArray(x) ) {
      actual = 'array';
    }
    else if( x === null ) {
      actual = 'null';
    }
    else {
      actual = typeof x;
    }
    return actual.toLowerCase();
  }

  jasmine.addMatchers({
    toBeAPromise: function() {
      return {
        compare: function(obj) {
          var objType = extendedTypeOf(obj);
          var pass =
            objType === 'object' &&
            typeof obj.then === 'function' &&
            typeof obj.catch === 'function' &&
            typeof obj.finally === 'function';
          var notText = pass? ' not' : '';
          var msg = 'Expected ' + objType + notText + ' to be a promise';
          return {pass: pass, message: msg};
        }
      }
    }
  });

});