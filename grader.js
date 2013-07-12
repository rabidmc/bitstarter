#!/usr/bin/env node

var util = require('util');
var rest = require('restler');

var testRestler = rest.get('powerful-savannah-7987.herokuapp.com').on('complete', function(result) {
    console.log(result);
});


