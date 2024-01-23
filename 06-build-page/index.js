const fs = require('fs').promises;
const path = require('path');


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



// fs.readFile(pathImport + '/template.html', 'utf8', (err, data) =>{
//   if (err){
//     console.log(err);
//   } else {
//     const newData = data;
//     fs.readdir(fileCompont, (err, file) => {
//       if (err){
//         console.log(err);
//       } else {
//         file.forEach(e =>{
//           fs.readFile(fileCompont + `/${e}`, 'utf8', (err, dataFile) => {
//             if (err){
//               console.log(err);
//             } else {
//               const name = path.parse(e).name;
//               newData.replace( `${name}`, dataFile)
//               console.log(newData)
//             }
//           })
//         })
//         fs.writeFile()
//       }
//     })
//   }
// })