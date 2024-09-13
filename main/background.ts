import path from "path"
import { app, ipcMain } from "electron"
import serve from "electron-serve"
import si from "systeminformation"
import { dialog } from "electron"

const { spawn } = require("child_process")

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
    await mainWindow.loadURL(`http://localhost:${port}/deploy`)
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

function streamCommand(command, args, onData, onError, onClose) {
  const cmd = spawn(command, args, { shell: "bash" })

  cmd.stdout.on("data", (data) => {
    onData(data.toString())
  })

  cmd.stderr.on("data", (data) => {
    onError(data.toString())
  })

  cmd.on("close", (code) => {
    onClose(`Command exited with code ${code}`)
  })
}

ipcMain.on("run-command", (event, command) => {
  const commands = [
    {
      command: "chmod",
      args: ["+x", "/home/lavesh/Project/kiitron/run.sh"],
    },
    {
      command: "/home/lavesh/Project/kiitron/run.sh"
    }
  ]

  const runNextCommand = (index = 0) => {
    if (index >= commands.length) {
      event.sender.send("command-output", "All commands completed.")
      return
    }

    const { command, args } = commands[index]

    streamCommand(
      command,
      args,
      (data) => event.sender.send("command-output", data),
      (error) => event.sender.send("command-error", error),
      (exitMessage) => {
        event.sender.send("command-output", exitMessage)
        runNextCommand(index + 1)
      }
    )
  }

  runNextCommand()
})

ipcMain.handle("save-key", async (event) => {
  return new Promise((resolve, reject) => {
    const commands = [
      {
        command: "/home/lavesh/kiichain/build/bin/kiichaind",
        args: ["comet", "show-validator", "--home", "/home/lavesh"],
      },
    ];

    const runNextCommand = (index = 0) => {
      if (index >= commands.length) {
        resolve("All commands completed.");
        return;
      }

      const { command, args } = commands[index];

      streamCommand(
        command,
        args,
        (data) => resolve(data), // Send the command output back to the renderer
        (error) => reject(error), // Send the error back to the renderer
        (exitMessage) => {
          resolve(exitMessage); // Resolve when the command completes
        }
      );
    };

    runNextCommand();
  });
});

ipcMain.handle("show-save-dialog", async (event) => {
  const { filePath } = await dialog.showSaveDialog({
    title: "Save Private Key",
    defaultPath: "private_key.txt",
  });

  return filePath; // Return the path chosen by the user
});
