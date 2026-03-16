const vscode = require("vscode");
const { applyFolderStyle } = require("./config");
const { MESSAGES } = require("./constants");

function monitorConfigChanges(event) {
  if (event && !event.affectsConfiguration("rose-pine-symbols.folderStyle")) return;

  applyFolderStyle();

  vscode.window
    .showInformationMessage(MESSAGES.needsReload, MESSAGES.reloadButton)
    .then((selection) => {
      if (selection === MESSAGES.reloadButton) {
        vscode.commands.executeCommand("workbench.action.reloadWindow");
      }
    });
}

module.exports = { monitorConfigChanges };