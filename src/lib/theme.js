const fs = require("node:fs");
const path = require("node:path");
const { PKG_PROP_MAP } = require("./constants");
const { confirmReload } = require("./window");
const { log } = require("./log");

const DEFAULT  = "rose-pine-symbols-icon-theme.json";
const MODIFIED = "rose-pine-symbols-icon-theme.modified.json";
const BACKUP   = "rose-pine-symbols-icon-theme.bkp.json";

const srcDir = path.join(__dirname, "..");

function getPath()        { return path.join(srcDir, MODIFIED); }
function getDefaultPath() { return path.join(srcDir, DEFAULT); }
function getBackupPath()  { return path.join(srcDir, BACKUP); }

function resolveOrCreate(target, source) {
  if (!fs.existsSync(target)) fs.copyFileSync(source, target);
  return target;
}

function getThemeFile()  { return JSON.parse(fs.readFileSync(resolveOrCreate(getPath(), getDefaultPath()), "utf-8")); }
function getSoureFile()  { return JSON.parse(fs.readFileSync(getDefaultPath(), "utf-8")); }
function getBackupFile() { return JSON.parse(fs.readFileSync(resolveOrCreate(getBackupPath(), getDefaultPath()), "utf-8")); }
function writeThemeFile(data) { fs.writeFileSync(getPath(), JSON.stringify(data, null, 2)); }

async function syncOriginal() {
  const backupJSON   = getBackupFile();
  const originalJSON = getSoureFile();
  const configurableKeys = Object.values(PKG_PROP_MAP);
  let needsSync = false;

  for (const key in originalJSON) {
    if (configurableKeys.includes(key)) continue;
    if (!backupJSON[key] || JSON.stringify(originalJSON[key]) !== JSON.stringify(backupJSON[key])) {
      needsSync = true;
      break;
    }
  }

  if (needsSync) {
    await confirmReload();
    fs.copyFileSync(getDefaultPath(), getPath());
    fs.copyFileSync(getDefaultPath(), getBackupPath());
  }
}

module.exports = { getThemeFile, getSoureFile, writeThemeFile, syncOriginal };
