#!/usr/bin/env node

var sys = require('util');
var rest = require('restler');
var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var CHECKSFILE_DEFAULT = "checks.json";
var URL_DEFAULT = "http://powerful-savannah-7987.herokuapp.com/";
// var url = "http://powerful-savannah-7987.herokuapp.com/";
// var checksfile = "checks.json";

var assertFileExists = function(infile) {
    var instr = infile.toString();
    if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    }
    return instr;
};

var clone = function(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};

var getTheURL = rest.get(url).on('complete', function(result) {
  if (result instanceof Error) {
    sys.puts('Error: ' + result.message);
    this.retry(5000); // try again after 5 sec
  } else {
//    sys.puts(result);
 

    var cheerioHtmlFile = function(result) {
	return cheerio.load(result);
    }
    var loadChecks = function(checksfile) {
	return JSON.parse(fs.readFileSync(checksfile));
    }
    var checkHtmlFile = function(result, checksfile) {
	$ = cheerioHtmlFile(result);
	var checks = loadChecks(checksfile).sort();
	var out = {};
	for(var ii in checks) {
	    var present = $(checks[ii]).length > 0;
	    out[checks[ii]] = present;
	}
	return out;
    }
     
  
}
});

if(require.main == module) {
    program
	.option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
	.option('-u, --url <url>', 'URL for HTML', clone(getTheURL), URL_DEFAULT)
	.parse(process.argv);
    var checkJson = checkHtmlFile(program.url, program.checks);
    var outJson = JSON.stringify(checkJson, null, 4);
    sys.puts(outJson);
} else { 
exports.checkHtmlFile = checkHtmlFile
}
 
