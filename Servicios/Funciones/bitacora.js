var fs = require("fs");
var dateFormat = require("dateformat");

var fnError = function Error(strMsjError){
	var _fechaHoy = dateFormat(new Date(), "yyyymmdd");
	var _strLineaLog = dateFormat(new Date(), "hh:MM:ss TT") +  " => " + strMsjError + '\n';
	fs.appendFile('logs/' + _fechaHoy + "_ErrorLog.txt", _strLineaLog, function (err) {
		if (err) throw err;
	});
}

var fndbLog = function dblog(strQuery){
	var _fechaHoy = dateFormat(new Date(), "yyyymmdd");
	var _strLineaLog = dateFormat(new Date(), "hh:MM:ss TT") +  " => " + strQuery + '\n';
	fs.appendFile('logs/' + _fechaHoy + "_BDLog.txt", _strLineaLog, function (err) {
		if (err) throw err;
	});
}

module.exports.error = fnError;
module.exports.dblog = fndbLog;
