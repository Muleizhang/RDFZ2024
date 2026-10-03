const {app,BrowserWindow,Menu}=require('electron');
const path=require('path');

app.setName('RDFZ 2024级风云');

function createWindow(){
  Menu.setApplicationMenu(null);
  const win=new BrowserWindow({
    width:1440,
    height:900,
    minWidth:1100,
    minHeight:700,
    backgroundColor:'#09070a',
    autoHideMenuBar:true,
    show:false,
    webPreferences:{
      contextIsolation:true,
      nodeIntegration:false,
      sandbox:true
    }
  });
  win.loadFile(path.join(__dirname,'index.html'));
  win.once('ready-to-show',()=>{win.show();win.maximize()});
}

app.whenReady().then(()=>{
  createWindow();
  app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow()});
});

app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});
