'use strict'

import { app, protocol, BrowserWindow, Menu } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

const path = require('path');
path.join(__static, 'icons/icon.ico')
console.log("a", path.join(__static, 'icons/icon.ico'))

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let win = null; // 声明一个窗口变量

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1660,
    height: 800,
    icon: path.join(__static, 'icons/icon.ico'),
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  // 设置图标
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }

  // 监听窗口关闭事件
  win.on('closed', () => {
    win = null;
  });
}

// 在 ready 事件处理函数中创建窗口
app.on('ready', async () => {
  createWindow();
  Menu.setApplicationMenu(null); // 隐藏菜单
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (!win) {
    createWindow();
  }
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
  }
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
