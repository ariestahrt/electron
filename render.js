const {ipcRenderer} = require('electron')

// document.getElementById("btn-test").click(function(){
//     ipcRenderer.send('openChildWindow')
// });

$('#btn-test').on('click', function () {
    console.log("test");
    ipcRenderer.send('asynchronous-message', "test")
});

console.log("test");