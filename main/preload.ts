import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron"

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value)
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => callback(...args)
    ipcRenderer.on(channel, subscription)

    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  },
  invoke: (channel, data) => ipcRenderer.invoke(channel, data),
  onCommandOutput: (callback: (data: string) => void) => {
    ipcRenderer.on("command-output", (event, data) => callback(data))
  },
  onCommandError: (callback: (error: string) => void) => {
    ipcRenderer.on("command-error", (event, error) => callback(error))
  },
  runCommand: (command) => ipcRenderer.send("run-command", command),
}

contextBridge.exposeInMainWorld("ipc", handler)

export type IpcHandler = typeof handler
