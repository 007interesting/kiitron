import React, { useState, useEffect } from "react"
import { UploadIcon } from "lucide-react"
import { Switch } from "@headlessui/react"
import { Button } from "../ui"

const DeployPage = () => {
  const [validatorName, setValidatorName] = useState("")
  const [filePath, setFilePath] = useState("~/config/.kiitron")
  const [debugMode, setDebugMode] = useState(false)
  const [commandOutput, setCommandOutput] = useState("")
  const [deploying, setDeploying] = useState(false)
  const [isStarted, setIsStarted] = useState(false)

  const handleDeploy = () => {
    setDeploying(true)
    setCommandOutput("")
    setIsStarted(true)

    window.ipc.runCommand("deploy-validator")

    console.log({
      validatorName,
      chain: "Kiichain",
      filePath,
      debugMode,
    })
  }

  const handleExportPrivateKey = async () => {
    try {
      const result = await window.ipc.invoke("save-key");
      console.log(result)
  
      // Prompt user to save the file (use Electron's file save dialog)
      const { filePath } = await window.ipc.invoke("show-save-dialog");
  
      if (filePath) {
        // Save the result to the selected file
        await window.ipc.writeFile(filePath, result);
        alert("Private key exported successfully!");
      }
    } catch (error) {
      console.error("Error exporting private key:", error);
      alert("Failed to export private key.");
    }
  };

  useEffect(() => {
    const handleOutput = (output) => {
      setCommandOutput((prev) => prev + "\n" + output)
    }

    const handleError = (error) => {
      setCommandOutput((prev) => prev + "\nError: " + error)
    }

    window.ipc.onCommandOutput(handleOutput)
    window.ipc.onCommandError(handleError)

    return () => {
      window.ipc.onCommandOutput(() => {})
      window.ipc.onCommandError(() => {})
    }
  }, [])

  return isStarted ? (
	<div className="flex items-center justify-center bg-gray-900 p-6 text-gray-100">
	  <div className="mt-4 rounded-lg bg-gray-700 p-4 text-white relative">
	    <h2 className="text-lg font-bold">Logs :</h2>
	    <pre>{commandOutput}</pre>
	    
	    {/* Export Private Key Button */}
	    <button
	      onClick={handleExportPrivateKey}
	      className="absolute bottom-4 right-4 bg-primary hover:bg-primary-dark rounded-lg px-4 py-2 text-gray-100 font-medium"
	    >
	      Export Private Key
	    </button>
	  </div>
	</div>
) : (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-6 text-gray-100">
      <div className="w-full max-w-lg space-y-6 rounded-lg bg-gray-800 p-8 shadow-lg">
        <h1 className="text-primary text-center text-2xl font-bold">Deploy Validator</h1>
        <form className="space-y-4">
          {/* Validator Name */}
          <div>
            <label
              htmlFor="validatorName"
              className="block text-sm font-medium"
            >
              Validator Name
            </label>
            <input
              type="text"
              id="validatorName"
              value={validatorName}
              onChange={(e) => setValidatorName(e.target.value)}
              placeholder="Enter validator name"
              className="focus:ring-primary focus:border-primary mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-gray-100 focus:outline-none focus:ring"
            />
          </div>

          {/* Chain Selection */}
          <div>
            <label className="block text-sm font-medium">Chain to Deploy To</label>
            <select
              className="focus:ring-primary focus:border-primary mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-gray-100 focus:outline-none focus:ring"
              defaultValue="kiichain"
            >
              <option value="kiichain">Kiichain</option>
            </select>
          </div>

          {/* File Path */}
          {/* <div>
              <label
              htmlFor="filePath"
              className="block text-sm font-medium"
              >
              Location for Files
              </label>
              <div className="mt-1 flex items-center">
              <input
              type="file"
              id="filePath"
              onChange={handleFileChange}
              className="hidden"
              />
              <label
              htmlFor="filePath"
              className="bg-primary hover:bg-primary-dark inline-flex cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-100"
              >
              <UploadIcon className="mr-2 h-5 w-5" />
              {filePath ? filePath : "Browse Files"}
              </label>
              </div>
              </div> */}
          <div>
            <label
              htmlFor="filePath"
              className="block text-sm font-medium"
            >
              Location for Files
            </label>
            <input
              type="text"
              id="filePath"
              value={filePath}
              onChange={(e) => setFilePath(e.target.value)}
              placeholder="Enter file path or use default"
              className="focus:ring-primary focus:border-primary mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-gray-100 focus:outline-none focus:ring"
            />
            <small className="mt-1 block text-gray-400">
              Default path: <code>/config/.kiitron</code>
            </small>
          </div>

          {/* Debug Mode */}
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">Debug Mode</label>
            <Switch
              checked={debugMode}
              onChange={setDebugMode}
              className={`${debugMode ? "bg-primary" : "bg-gray-600"} relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable Debug Mode</span>
              <span
                className={`${
                  debugMode ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>

          {/* Deploy Button */}
          <div className="pt-6">
            <Button
              type="button"
              onClick={handleDeploy}
              className="bg-primary hover:bg-primary-dark w-full rounded-lg px-4 py-2 font-medium text-gray-100 transition"
            >
              Deploy
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DeployPage
