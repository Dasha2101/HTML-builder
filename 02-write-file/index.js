const fs = require('fs');
const readline = require('readline')

const writeableStream = fs.createWriteStream(__dirname + '/text.txt', 'utf-8');


const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Ввод текста..')


r1.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    r1.close();
    process.exit(0);
  }
    writeableStream.write(input + '\n');
})

r1.on('close', () =>{
  console.log('Goodbye!');
})
