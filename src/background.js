'use strict'

import { app, protocol, BrowserWindow,ipcMain ,dialog, Menu } from 'electron'
// ipcMain, shell 
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const fs = require('fs');
const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production'

path.join(__static, 'icons/icon.ico')
console.log("a", path.join(__static, 'icons/icon.ico'))

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let win = null; // 声明一个窗口变量

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1760,
    height: 1000,
    icon: path.join(__static, 'icons/icon.ico'),
    webPreferences: {
      // 预加载脚本
      // 关闭上下文隔离
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }

    
  })
   // 获取或生成唯一 ID
   const userDataPath = app.getPath('userData');
   const filePath = path.join(userDataPath, 'unique-id.txt');
   let uniqueId = '';
 
   try {
     // 尝试从文件中读取唯一 ID
     uniqueId = fs.readFileSync(filePath, 'utf-8');
   } catch (error) {
     // 如果文件不存在或读取失败，生成唯一 ID
     uniqueId = generateUniqueId();
     // 将唯一 ID 写入文件
     fs.writeFileSync(filePath, uniqueId, 'utf-8');
    //  C:\Users\<username>\AppData\Roaming\electro-vue3\unique-id.txt
   }
 
   // 向渲染进程发送唯一 ID
   win.webContents.on('did-finish-load', () => {
    win.webContents.send('unique-id', uniqueId);
   });
  // win.webContents.openDevTools()

  // 设置图标
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) {
      // win.webContents.openDevTools()
    } 
  } else {
    createProtocol('app')
    // win.loadURL('app://./index.html')
  }

  // 监听窗口关闭事件
  win.on('closed', () => {
    win = null;
  });
}
function generateUniqueId() {
  // 在这里编写生成唯一 ID 的逻辑，可以使用 UUID 或其他方法
  return Date.now().toString() + Math.random().toString(36);
}

// 在 ready 事件处理函数中创建窗口
app.on('ready', async () => {
  createWindow();
  // focusedWindow.webContents.openDevTools();

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
// ipcMain.on('message', (event, pageName) => {
//   console.log("启动桌面程序")

//   const programPath = 'D:\\WWW\\webAPP\\dist_electron\\win-unpacked\\gold.exe'; // 替换为实际的程序路径
//   // const programPath2 = "D:\\ChatGPT\\ChatGPT.exe"; // 替换为实际的程序路径
//   shell.openPath(programPath)
//   .then(() => {
//     console.log('成功启动外部程序');
//   })
//   .catch((error) => {
//     console.error('启动外部程序时出错:', error.message);
//   });
  // shell.openItem(programPath); // 使用shell.openItem()来启动外部程序
  // const childProcess = spawn(programPath);
  // // const childProcess2 = spawn(programPath2);

  // // 可选：处理外部程序的输出
  // childProcess.stdout.on('data', (data) => {
  //   console.log(`外部程序输出: ${data}`);
  // });

  // // 可选：处理外部程序的错误
  // childProcess.stderr.on('data', (data) => {
  //   console.error(`外部程序错误: ${data}`);
  // });
// });
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
