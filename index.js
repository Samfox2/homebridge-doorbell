var Service, Characteristic;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory("homebridge-doorbell", "Doorbell", DoorbellAccessory);
}

function DoorbellAccessory(log, config) {
    // global vars
    this.log = log;

    // configuration vars
    this.name = config["name"];

    // state vars
    this.switchState = 0;

    // register the service and provide the functions
    this.service = new Service.Doorbell(this.name);

    // the current switch state
    this.service
        .getCharacteristic(Characteristic.ProgrammableSwitchEvent)
        .on('get', this.getSwitchState.bind(this));

    var targetChar = this.service
    .getCharacteristic(Characteristic.ProgrammableSwitchEvent);

    targetChar.setValue(1);
    this.log("Ding");
    setTimeout(function(){targetChar.setValue(0);}, 10000);
    this.log("Dong");


    //setTimeout(function() {
    //    this.log("Ding Dong");
    //    this.service.getCharacteristic(Characteristic.ProgrammableSwitchEvent).setValue(1);
    //}.bind(this), 10000);
}

DoorbellAccessory.prototype.getSwitchState = function(callback) {
    this.log("Requested Switch State: %s", this.switchState);

    var targetChar = this.service
    .getCharacteristic(Characteristic.ProgrammableSwitchEvent);

    targetChar.setValue(1);
    setTimeout(function(){targetChar.setValue(0);}, 10000);
    callback(null, this.switchState);
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
	//setTimeout(function(){targetChar.setValue(0);}, 10000);
	//}
    }
    callback(); // success
},


DoorbellAccessory.prototype.getServices = function() {
  return [this.service];
}
