


const fs = require('fs')


/* const txtData = fs.readFileSync('aaa.txt', 'utf8')

const lines = txtData.split('\n')


 */




const result = [['Accuracy', 'Model', 'Communicate_round']]

/* mnist_2nn.forEach((item, index) => {

  const res = Number(item[0]) + Math.random() * 0.05
  result.push([res, 'wideResNet', index + 1])

}) */
/* for (let line of lines) {
  if (!line.trim()) continue


  const [str1, st2, round, str3, str4, accuracy] = line.split(' ');

  result.push([Number(accuracy), 'mnist_2nn', round])
} */
fs.writeFile('src/data/aaa.ts', JSON.stringify(result), function (err) {
  console.log('err', err)
})
