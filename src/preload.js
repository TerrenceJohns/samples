const {ipcRenderer, remote, ipcMain} = require('electron');


window.closeApp = function() {
    ipcRenderer.send('close-app');
}

window.renderMobile = function(landscape) {
    if(landscape){
        ipcRenderer.send('tablet-landscape');
    } else {
        ipcRenderer.send('tablet-portrait');
    }
}

window.reset = function() {
    ipcRenderer.send('reset');
}

window.getSystemInfo = function() {
    return new Promise(function(resolve){
        ipcRenderer.once('system-info-response',function(e,data){
            resolve(data);
        });
        ipcRenderer.send('system-info');
    });
}

window.startServer = function(server){
    ipcRenderer.send('start-dbserver',server);
}
window.stopServer = function(server){
    ipcRenderer.send('stop-dbserver',server);
}


