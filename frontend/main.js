const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let mainWindow;
let djangoProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`http://localhost:3000`); // React development server
}

function startDjangoServer() {
  djangoProcess = exec('python manage.py runserver 127.0.0.1:8000', {
    cwd: path.join(__dirname, 'backend'),
  });

  djangoProcess.stdout.on('data', (data) => console.log(`Django: ${data}`));
  djangoProcess.stderr.on('data', (data) => console.error(`Django Error: ${data}`));
}

app.whenReady().then(() => {
  startDjangoServer();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (djangoProcess) djangoProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});
