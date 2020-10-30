const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const {ipcMain} = require('electron')

var pyshell =  require('python-shell');

function createWindow () {
    console.log("Window created");
    window = new BrowserWindow({width: 800, height: 600})
    window.loadFile('index.html')

  pyshell.run('hello.py',  function  (err, results)  {
  if  (err)  throw err;
  console.log('hello.py finished.');
  console.log('results', results);
  });   	

}

// Event handler for asynchronous incoming messages
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)

  pyshell.run('hello.py',  function  (err, results)  {
    if  (err)  throw err;
    console.log('hello.py finished.');
    console.log('results', results);
  });
  
  // Event emitter for sending asynchronous messages
  event.sender.send('asynchronous-reply', 'async pong')
})

// Event handler for synchronous incoming messages
ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) 

  // Synchronous event emmision
  event.returnValue = 'sync pong'
})

app.on('openChildWindow', () => {
  console.log("Hello from main.js");
  pyshell.run('hello.py',  function  (err, results)  {
    if  (err)  throw err;
    console.log('hello.py finished.');
    console.log('results', results);
    });
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
})