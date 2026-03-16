const log = {
  info: (...args) => console.log("[rose-pine-symbols]", ...args),
  error: (...args) => console.error("[rose-pine-symbols]", ...args),
};

module.exports = { log };
