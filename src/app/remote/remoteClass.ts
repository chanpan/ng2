const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;
const path = require('path');
const url = require('url');

const win = remote.app.win;
export class RemoteClass{
    static Views(){
     
       var child = new BrowserWindow({ width: 800, height: 600 ,parent: win, modal:true,frame: false});
       child.loadURL(url.format({
            pathname: path.join(__dirname, 'views/demo1.html'),
            protocol: 'file:',
            
        }));
    }
}