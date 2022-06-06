const { app, BrowserWindow } = require('electron');
var newValue = 0;
var currentValue = 0;
const maxValue = 9999;
var temp = 100;
var pos = 0;
var ind = 0;
var read = true;
var win;
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

function showPortOpen() {
	console.log('port open. Data rate: ' + port.baudRate);
}

function readSerialData(data) {
	if (read) {
		newValue = Math.floor(data.toString('utf8'));
		//console.log(`NewValue : ${newValue}`);
		if (!isNaN(newValue)) {
			currentValue = newValue;
		}
	}
}

function getValue() {
	var tempValue = Math.floor(currentValue - pos);
	//console.log(`Temp : ${tempValue}`);
	return tempValue;
}

function showPortClose() {
	console.log('port closed.');
}

function showError(error) {
	console.log('Serial port error: ' + error);
}

const port = new SerialPort({
	path: 'COM3',
	baudRate: 9600,
	parity: 'none',
	flowControl: false
})

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }))

port.on('open', showPortOpen);
parser.on('data', readSerialData);
port.on('close', showPortClose);
port.on('error', showError);

app.whenReady().then(() => {
	win = new BrowserWindow({
		width: 1920,
		height: 1080,
		transparent: false,
		hasShadow: false,
		frame: false,
		resizable: false,
		alwaysOnTop: true,
		minimizable: false,
		maximizable: true,
		kiosk: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		},
	})

	win.setVisibleOnAllWorkspaces(false, {
		visibleOnFullScreen: false,
		skipTransformProcessType: false,
	});

	pos = 0;
	
	setInterval(() => {
		pos += getValue();
		win.webContents.send("position-changed", { pos });
		//console.log(pos);
	}, 100);
	

	win.loadFile('Site/index.html');
})

