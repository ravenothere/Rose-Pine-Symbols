const vscode = require("vscode");
const { monitorConfigChanges } = require("./lib/change-listener");
const { applyFolderStyle } = require("./lib/config");
const { log } = require("./lib/log");

async function activate(_context) {
  log.info("ravenothere.rose-pine-symbols activated");
  applyFolderStyle();
  vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration("rose-pine-symbols.folderStyle")) {
      monitorConfigChanges(event);
    }
  });
}

function deactivate() {}

module.exports = { activate, deactivate };
