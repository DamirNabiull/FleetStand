const { app, BrowserWindow } = require('electron');
var newValue = 0;
var currentValue = 0;
const maxValue = 9999;
var temp = 100;
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

function showPortOpen() {
	console.log('port open. Data rate: ' + port.baudRate);
}

function readSerialData(data) {
	// try {
	// 	newValue = Math.floor(data.toString('utf8'));
	// } catch (error) {
	// 	newValue = currentValue;
	// }
	// currentValue = (newValue) / maxValue;
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
	const win = new BrowserWindow({
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

	setInterval(() => {
		currentValue += temp;
		if (currentValue >= 9999) {
			temp = -temp;
		}
		else if (currentValue <= 0) {
			temp = -temp;
		}
		var pos = currentValue/maxValue
		win.webContents.send("position-changed", { pos });
	}, 50);

	win.loadFile('Site/index.html');
})

