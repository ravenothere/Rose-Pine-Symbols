const updateThemeJSONHandlers = {
  folderStyle: (themeJSON, value) => {
    if (value === "rose-pine") {
      themeJSON.folder = "_rp-folder";
      themeJSON.folderExpanded = "_rp-folder-open";
      themeJSON.hidesExplorerArrows = true;
    } else {
      themeJSON.folder = "folder";
      themeJSON.folderExpanded = "folder";
      themeJSON.hidesExplorerArrows = false;
    }
  },
};

module.exports = { updateThemeJSONHandlers };
