const { app, BrowserWindow, ipcMain, Menu, screen } = require("electron");
const path = require("path");
const Store = require("electron-store");
const isDev = require("electron-is-dev");
var child = require("child_process").execFile;

let store = new Store();
let win = null;
let menuTemplate = [];

//child("./backend/dist/main.exe", function (err, data) {
//  if (err) {
//    console.error("Error starting backend process:", error);
//  }
//  console.log("Backend process started.");
//});

// Create the browser window.

function createWindow() {
  const displays = screen.getAllDisplays();
  const displayIndex = 0;
  const specificDisplay = displays[displayIndex];

  win = new BrowserWindow({
    width: 1920,
    height: 1080,

    x: specificDisplay.bounds.x,
    y: specificDisplay.bounds.y,

    autoHideMenuBar: false,
    //fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: "Superpool",
    frame: true,
    icon: __dirname + "/favicon.ico",
  });

  // and load the index.html of the app.
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  let menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  //exec("taskkill /f /t /im main.exe", (err, stdout, stderr) => {
  //  if (err) {
  //    console.log(err);
  //    return;
  //  }
  //  console.log(`stdout: ${stdout}`);
  //  console.log(`stderr: ${stderr}`);
  //});

  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
