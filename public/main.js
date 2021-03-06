const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

require("@electron/remote/main").initialize();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      enableRemoteModule: true,
    },
  });
  const startURL = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startURL);

  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  //   if (mainWindow === null) {
  //     createWindow();
  //   }
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
