const vscode = require("vscode");
const { MESSAGES } = require("./constants");

async function confirmReload() {
  const result = await vscode.window.showInformationMessage(
    MESSAGES.needsReload,
    MESSAGES.reloadButton
  );
  if (result === MESSAGES.reloadButton) {
    vscode.commands.executeCommand("workbench.action.reloadWindow");
  }
}

module.exports = { confirmReload };
