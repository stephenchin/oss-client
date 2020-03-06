import { BrowserWindow, app, ipcMain } from "electron";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

export default class MainWindow {
  private window: BrowserWindow | null = null;

  createWindow(): void {
    this.window = new BrowserWindow({
      frame: false,
      height: 645,
      // FIXME: 渲染进程不使用 node
      webPreferences: { nodeIntegration: true },
      width: 1090,
      titleBarStyle: "hiddenInset"
    });

    this.window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY).then(() => {
      console.log("main page loaded ~");
    });

    this.window.webContents.openDevTools();

    this.window.on("closed", () => {
      this.window = null;
    });
  }

  onActivate(): void {
    if (!this.window) {
      this.createWindow();
    }
  }

  close() {
    if (this.window) this.window.close();
    app.quit();
  }

  minimize() {
    if (this.window) this.window.minimize();
  }

  maximize() {
    if (this.window) this.window.maximize();
  }
}
