const fs = require('fs');
const path = require('path');

const pathStyles = path.join(__dirname, 'styles');
const pathProjects = path.join(__dirname, 'project-dist');


fs.readdir(pathStyles, (err, files) => {
  if (err){
    console.log(err)
  } else{
    const arrStyle = [];
    files.forEach(e => {
      fs.stat(pathStyles + `/${e}`, (err, stats) =>{
        if (stats.isFile() && path.extname(e).toLowerCase() === '.css'){
          fs.readFile(pathStyles + `/${e}`, 'utf8', (err, data) =>{
            if (err) {
              console.log(err)
            } else {
              arrStyle.push(data)
              if (arrStyle.length === files.length - 1){
                const newArr = arrStyle.join('\n')
                fs.writeFile(`${pathProjects}/bundle.css`, newArr, 'utf8', (err) =>{
                  if (err){
                    console.log(err)
                  }
                })
              }
            }
          })
        }
      })
    });
  }
})