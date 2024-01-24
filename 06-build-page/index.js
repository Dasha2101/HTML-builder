const fs = require('fs').promises;
const { readdir } = require('fs');
const path = require('path');
const { start } = require('repl');

const importDir = path.join(__dirname, 'project-dist');
const rootDir = path.join(__dirname);
const fileCompont = path.join(__dirname, 'components');
const assetsPath = path.join(__dirname, 'assets');
const importPathAssets = path.join(importDir, 'assets');

async function createHTML(){
  try {

    await fs.mkdir(importDir, {recursive: true});

    let data = await fs.readFile(path.join(rootDir, 'template.html'), 'utf8');
    const files = await fs.readdir(fileCompont);

    await Promise.all(files.map(async (file) => {
      const filesPath = path.join(fileCompont, file);
      const fileName = path.parse(file).name;
      const newData = await fs.readFile(filesPath, 'utf8');
      data = data.toString().replace(`{{${fileName}}}`, newData);
    }));

    await fs.writeFile(path.join(importDir, 'index.html'), data, 'utf8');

  }
  catch(err){
    console.error('Error:', err.message);
}
}

async function mergeCSS(){
  const pathStyles = path.join(__dirname, 'styles');
  const arrStyle = [];

  const files = await fs.readdir(pathStyles);

  await Promise.all(files.map(async (file) => {
    const stats = await fs.stat(path.join(pathStyles, file));
    if (stats.isFile() && path.extname(file).toLowerCase() === '.css'){
      const data = await fs.readFile(path.join(pathStyles, file), 'utf8')
      arrStyle.push(data);
    }
  }));

  const newArr = arrStyle.join('\n');
  await fs.writeFile(path.join(importDir, 'style.css'), newArr, 'utf8');
}

async function addAssets(mainPath, importPath){
  const checkDir = await fs.stat(importPath).catch(() => null)

  if (!checkDir || !checkDir.isDirectory()){
    await fs.mkdir(importPath, {recursive: true});
  }

  const files =  await fs.readdir(mainPath);

  await Promise.all(files.map(async (file) =>{
    const startPath = path.join(mainPath, file);
    const endPath = path.join(importPath, file);
    const stats = await fs.stat(startPath);

    if (stats.isFile()){

      const checkFile = await fs.stat(endPath).catch(() => null)

      if (!checkFile || !checkFile.isFile()){
        const data = await fs.readFile(startPath, 'binary');
        await fs.writeFile(endPath, data, 'binary');
      }
    } else if (stats.isDirectory()) {
      await addAssets(startPath, endPath);
    }
  }));
}


createHTML()
mergeCSS()
addAssets(assetsPath, importPathAssets)

// const fileCompont = path.join(__dirname, 'components');
// const pathStyle = path.join(__dirname, 'styles');
// const rootDir = path.join(__dirname);
// const importDir = path.join(__dirname, 'project-dist');


// async function createHTML(){
//   try {
//     await fs.mkdir(importDir);
//     const data = await fs.readFile(rootDir, '/template.html');

//     const files = await fs.readdir(fileCompont);
//     await Promise.all(files.map(async (file) => {
//       const newData = fs.readFile(files, `/${file}`, 'utf8');
//       const fileName = path.parse(file).name;
//       data = data.toString().replace(`{{${fileName}}}`, newData)
//   }))
  
//     await fs.writeFile(importDir, data)

// }


// createHTML();


//
// fs.readFile(mainPath + '/template.html', 'utf8', (err, data)=>{
//   if (err) {console.log(err)}
//   else{
//     const tData = data
//     fs.readdir(componentPath, (err, files)=>{
//       if (err) {console.log(err)}
//       else {
//         files.forEach(file => {
//           fs.readFile(componentPath + `/${file}`, 'utf8', (err, dataComp) => {
//             if (err) {console.log(err)}
//             else {
//               const fileName = path.parse(file).name
//               newData = tData.replace(`{{${fileName}}}`, dataComp)
//             }
//           })
//         })
//         fs.writeFile(newDir + '/index.html', newData, 'utf8', (err)=>{
//           if (err) {console.log(err)}
//         })
//       }
//     })
//   }
//
// })