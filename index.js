var Service, Characteristic;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerPlatform("homebridge-doorbell", "Doorbell", DoorbellPlatform);
}

function DoorbellPlatform(log, config) {
  // global vars
  this.log = log;
  
  // configuration vars
  this.devices = config["doorbells"];
  
  log("Starting discovery...");
}

DoorbellPlatform.prototype = {
  accessories: function(callback) {
    var foundAccessories = [];
    var count = this.devices.length;
    
    for(index = 0; index < count; index++){
		  var accessory  = new DoorbellAccessory(this.log, this.devices[index]);
		  foundAccessories.push(accessory);
	  }
	
	  callback(foundAccessories);
  }
}

function DoorbellAccessory(log, config) {
  this.log = log;
  this.name = config["name"];
  this.doorbellName = config["doorbell_name"] || this.name; // fallback to "name" if you didn't specify an exact "button_name"
  this.binaryState = 0; // switch state, default is OFF
  this.log("Starting a homebridge-doorbell device with name '" + this.doorbellName + "'...");
  this.service;
  this.timeout = 2; // Timeout in seconds
}

DoorbellAccessory.prototype.getState = function(callback) {
  var powerOn = this.binaryState > 0;
  this.log("Power state for the '%s' is %s", this.doorbellName, this.binaryState);
  callback(null, powerOn);
}

DoorbellAccessory.prototype.setPowerOn = function(powerOn, callback) {
  var self = this;
  this.binaryState = powerOn ? 1 : 0;
  this.log("Set power state on the '%s' to %s", this.doorbellName, this.binaryState);
  callback(null);

  if(powerOn) {
    setTimeout(function() {
      self.log("BEEP! BOOP!");
      self.service.getCharacteristic(Characteristic.On).setValue(0);
    }, this.timeout * 1000);
  }
}


DoorbellAccessory.prototype.identify = function(callback) {
    this.log("Identify requested!");

    var targetChar = this.service
    .getCharacteristic(Characteristic.ProgrammableSwitchEvent);

    this.log("targetChar:", targetChar);

    if (targetChar.value == "1"){
	targetChar.setValue(0);
	this.log("Toggle state to 0");
    }
    else{
	targetChar.setValue(1);
	this.log("Toggle state to 1");
    }
    callback(); // success
}

DoorbellAccessory.prototype.getServices = function() {
    // register the service and provide the functions
    this.service = new Service.Doorbell(this.name);

    this.service
      .getCharacteristic(Characteristic.ProgrammableSwitchEvent)
      .on('get', this.getState.bind(this));
    
    var targetChar = this.service
    .getCharacteristic(Characteristic.ProgrammableSwitchEvent);

    // DBG: Fire an event 10s after start 
    setTimeout(function() {
        this.log("Ding Dong");
        this.service.getCharacteristic(Characteristic.ProgrammableSwitchEvent).setValue(1);
    }.bind(this), 10000);


return [this.service];
}
