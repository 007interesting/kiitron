import path from "path"
import { app, ipcMain } from "electron"
import serve from "electron-serve"
import si from "systeminformation"

import { createWindow } from "./helpers"

const isProd = process.env.NODE_ENV === "production"

if (isProd) {
  serve({ directory: "app" })
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow("main", {
    width: 1520,
    height: 880,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  })

  if (isProd) {
    await mainWindow.loadURL("app://./home")
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/monitor`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on("window-all-closed", () => {
  app.quit()
})

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`)
})

ipcMain.handle("get-system-info", async () => {
  try {
    const cpu = await si.cpu()
    const mem = await si.mem()
    const disk = await si.fsStats()
    const network = await si.networkStats()
    const gpu = await si.graphics()
    const currentLoad = await si.currentLoad()
    const uptime = await si.time()

    return {
      cpu,
      mem,
      disk,
      network,
      gpu,
      currentLoad,
      uptime,
    }
  } catch (err) {
    console.error(err)
  }
})
