const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error('Error', err);
        return;
      }

      if (stats.isFile()) {
        const fileName = path.parse(file).name;
        const fileExtension = path.parse(file).ext;
        const fileSize = stats.size;

        console.log(`${fileName} - ${fileExtension} - ${fileSize}bytes`);
      }
    });
  });
});