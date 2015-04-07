// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This basic climate example logs a stream
of temperature and humidity to the console.
*********************************************/

var tessel = require('tessel');
var climatelib = require('climate-si7020');
var climate = climatelib.use(tessel.port['B']);

climate.on('ready', function(){
  console.log("Connected to si7020");

  climate.setHeater(true, function(error) {
    if( error ) {
      console.log('Error turning heater on:', error);
    } else {
      console.log('Turned heater on.');
    }
  });


  setTimeout(function() {
    climate.setHeater(false, function (error) {
      console.log('Heater turned off.');
    });
  }, 10000);

  setInterval(function(){
    climate.readTemperature('f', function(error, temperature) {
        console.log('Degrees:', temperature.toFixed(4) + 'F');
    });
  }, 1000);
});

climate.on('error', function(err) {
  console.log('error connecting module', err);
});
