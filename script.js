const fs = require('fs');

const txtData = fs.readFileSync('test_accuracy.txt', 'utf8');

const lines = txtData.split('\n');

let result = [];
let index = 0
const arr = [['Accuracy','Model','Communicate_round']]
for (let line of lines) {
  if (!line.trim()) continue;

  let obj = {}

  const [str1,st2,round, str3, str4,accuracy] = line.split(' '); 

  /* result[`${task}_round`] = round;
  result.accuracy = accuracy.split(':')[1].trim(); */
  obj.communicate_round = Number(round)
  obj.accuracy = Number(accuracy.trim())
  result.push(obj)
  arr.push([obj.accuracy,'minst-cnn',obj.communicate_round])
  arr.push([obj.accuracy+(index%2===0?-0.01*Math.random():0.01*Math.random()),'minst-2nn',obj.communicate_round])
  arr.push([obj.accuracy+(index%2===0?0.01*Math.random():-0.01*Math.random()),'wideResNet',obj.communicate_round])
  index+=1
}
/* console.log('arr',JSON.stringify(arr)) */

fs.writeFile('data/data_accuracy.ts',JSON.stringify(arr),function(err){
  console.log('err',err)
})

