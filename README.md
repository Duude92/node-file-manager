# RS School [Filemanager](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md) task
This project is used as [LazyInject](https://github.com/Duude92/lazyinject) sample in pure node.js
### Core concept:
Project has 3 groups of commands: fs, os, and utilities.<br>
Each command (or parameter of `os` command) exported using `Export` decorator.<br>
Container object (`src/container.js`) is configured to import commands from each set catalog.<br>
Each command group (`fs.js` | `os.js` | `utilities.js`) retrieves array of commands for each group.
