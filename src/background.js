'use strict'

import { app, protocol, BrowserWindow, Menu, ipcMain, shell } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
const { spawn } = require('child_process');

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
    height: 1000,
    icon: path.join(__static, 'icons/icon.ico'),
    webPreferences: {
      // 预加载脚本
      // 关闭上下文隔离
      contextIsolation: false,
      nodeIntegration: true,

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
// 在主进程中监听来自渲染进程的请求
ipcMain.on('message', (event, pageName) => {
  // 根据渲染进程的请求加载不同的HTML文件
  console.log("启动桌面程序")
  const programPath = 'D:\\abc\\gold.exe'; // 替换为实际的程序路径
  // shell.openItem(programPath); // 使用shell.openItem()来启动外部程序
  const childProcess = spawn(programPath);
  // 可选：处理外部程序的输出
  childProcess.stdout.on('data', (data) => {
    console.log(`外部程序输出: ${data}`);
  });

  // 可选：处理外部程序的错误
  childProcess.stderr.on('data', (data) => {
    console.error(`外部程序错误: ${data}`);
  });
});
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
