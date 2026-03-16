const vscode = require("vscode");
const { log } = require("./log");
const { getSoureFile, writeThemeFile } = require("./theme");
const { updateThemeJSONHandlers } = require("./theme-json-handlers");

function getFolderStyle() {
  return vscode.workspace
    .getConfiguration("rose-pine-symbols")
    .get("folderStyle", "rose-pine");
}

function applyFolderStyle() {
  const themeJSON = getSoureFile();
  const style = getFolderStyle();
  log.info(`applying folderStyle: ${style}`);
  updateThemeJSONHandlers.folderStyle(themeJSON, style);
  writeThemeFile(themeJSON);
}

module.exports = { applyFolderStyle, getFolderStyle };
