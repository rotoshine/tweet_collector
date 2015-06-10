var mongoose = require('mongoose');
var express = require('express');
var config = require('./server/conf/conf');
var Collector = require('./server/Collector');
var collectingCycle = config.collecting_cycle || 1000 * 60;
var DEFAULT_PORT = 3000;
var port = config.port || DEFAULT_PORT;

// mongoose init
mongoose.connect(config.mongodb_url);

// model loading
console.log('collecting cycle:' + collectingCycle);

var query = {
  q: config.search.q,
  lang: config.search.lang
};

var collector = new Collector(config.twitter, query, collectingCycle);
collector.collectStart();

// express init
var app = express();
require('./server/api')(app);
app.listen(port);
