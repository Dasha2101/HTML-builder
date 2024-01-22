const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
  try {
    const initDir = path.join(__dirname, 'files');
    const finalDir = path.join(__dirname, 'files-copy');

    await fs.access(initDir);
    await fs.mkdir(finalDir, { recursive: true });
    const files = await fs.readdir(initDir);

    await Promise.all(files.map(async (file) => {
      const initPath = path.join(initDir, file);
      const finalPath = path.join(finalDir, file);

      const stats = await fs.stat(initPath);

      if (stats.isFile()) {
        const data = await fs.readFile(initPath, 'utf8');
        await fs.writeFile(finalPath, data, 'utf8');
      } else if (stats.isDirectory()) {
        await copyDir(initPath, finalPath);
      }
    }));

    const finalFiles = await fs.readdir(finalDir);
    const fileDel = finalFiles.filter(file => !files.includes(file));
    await Promise.all(fileDel.map(async (fileDel) => {
      const filePathDel = path.join(finalDir, fileDel);
      await fs.unlink(filePathDel);
    }));

    console.log('Copying completed!');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

copyDir();