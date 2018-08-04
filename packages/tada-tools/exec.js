require("colors");
const shell = require("shelljs");

const log = (prefix, message) => {
  // eslint-disable-next-line no-console
  console.log(
    message
      .toString()
      .trim()
      .split("\n")
      .map(line => `[${prefix.grey}]: ${line}`)
      .join("\n")
  );
};

const exec = (command, silent = true) => {
  const ref = shell.exec(command, { silent });
  if (ref.code === 0) {
    return ref.stdout.trim();
  }

  return null;
};

module.exports = {
  log,
  exec
};
