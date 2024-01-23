const fs = require('fs').promises;
const path = require('path');

async function mergeStyle(){
  try{
    const pathStyles = path.join(__dirname, 'styles');
    const pathProjects = path.join(__dirname, 'project-dist');
    const arrStyle = [];

    await fs.mkdir(pathProjects, { recursive: true });
    const files = await fs.readdir(pathStyles);

    await Promise.all(files.map(async (file) => {
      const stats = await fs.stat(path.join(pathStyles, file));
      if (stats.isFile() && path.extname(file).toLowerCase() === '.css'){
        const data = await fs.readFile(path.join(pathStyles, file), 'utf8')
        arrStyle.push(data);
      }
    }));

    const newArr = arrStyle.join('\n');
    await fs.writeFile(path.join(pathProjects, 'bundle.css'), newArr, 'utf8');
  } catch(err){
    console.error('Error:', err.message);
  }
}

mergeStyle();

// fs.readdir(pathStyles, (err, files) => {
//   if (err){
//     console.log(err)
//   } else{
//     const arrStyle = [];
//     files.forEach(e => {
//       fs.stat(pathStyles + `/${e}`, (err, stats) =>{
//         if (stats.isFile() && path.extname(e).toLowerCase() === '.css'){
//           fs.readFile(pathStyles + `/${e}`, 'utf8', (err, data) =>{
//             if (err) {
//               console.log(err)
//             } else {
//               arrStyle.push(data)
//               if (arrStyle.length === files.length - 1){
//                 const newArr = arrStyle.join('\n')
//                 fs.writeFile(`${pathProjects}/bundle.css`, newArr, 'utf8', (err) =>{
//                   if (err){
//                     console.log(err)
//                   }
//                 })
//               }
//             }
//           })
//         }
//       })
//     });
//   }
// })
