# homebridge-doorbell

`homebridge-doorbell` is a plugin for Homebridge.

## Installation

If you are new to Homebridge, please first read the Homebridge [documentation](https://www.npmjs.com/package/homebridge).
If you are running on a Raspberry, you will find a tutorial in the [homebridge-punt Wiki](https://github.com/cflurin/homebridge-punt/wiki/Running-Homebridge-on-a-Raspberry-Pi).

1 Install homebridge:
```sh
sudo npm install -g homebridge
```
2 Install homebridge-doorbell:
```sh
sudo npm install -g git+https://github.com/Samfox2/homebridge-doorbell.git
```
3 Configure plugin:
```sh
 Update your configuration file. See sample-config.json in this repository for a sample. 
```
## Configuration

Add the platform in `config.json` in your home directory inside `.homebridge`.

```js
{
	    "platform": "Doorbell",
	    "doorbells": [
	    {
            "name": "Doorbell Front",
            "mac": "21:11:11:11:21:11"
	    }
	    ]
}
```

## Note
Currently the plugin only emulates the doorbell with the identify command.
If placed in a room with a camera it sends a notification with a snapshot/stream to your ios device after pushing the "identify" button in a homekit app.

Feel free to contribute to make this a better plugin!

