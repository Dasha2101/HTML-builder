let fs = require('fs');
const stream = new fs.createReadStream(__dirname + '/text.txt', 'utf-8');

stream.on('error', function(err){
  console.error('Ошибка файла при чтении', err.message)
})

stream.on('readable', function(){
  let data = stream.read();
  console.log(data);
});

// stream.on('end', function(){
//   console.log('the end')
// })