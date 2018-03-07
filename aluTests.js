import Alu from './alu-compiled';

// ***********************
//	ALU TEST FILE
// ***********************

//Addition of Two Positives // 15 + 13 = 28
let test_1 = new Alu([0,0,0,0,1,1,1,1], [0,0,0,0,1,1,0,1]);
let results_1 = test_1.run([0,0,0,1]);

console.log('Positive plus positive');
console.log(`Result: ${JSON.stringify(results_1)}`); 

(JSON.stringify(results_1) === JSON.stringify({'Output':[0,0,0,1,1,1,0,0], 'Overflow':0})) ? console.log('Passed') : console.log('Failed');


//Addition of Two Negatives // -15 + -13 = -28
let test_2 = new Alu([1,0,0,0,1,1,1,1], [1,0,0,0,1,1,0,1]);
let results_2 = test_2.run([0,0,0,1]);

console.log('Negative plus negative');
console.log(`Result: ${JSON.stringify(results_2)}`); 

(JSON.stringify(results_2) === JSON.stringify({'Output':[1,0,0,1,1,1,0,0], 'Overflow':0})) ? console.log('Passed') : console.log('Failed'); 

//Positive Subtracted from Positive; Positive Result // 15 - 13 = 2
let test_3 = new Alu([0,0,0,0,1,1,1,1], [0,0,0,0,1,1,0,1]);
let results_3 = test_3.run([0,0,1,0]);

console.log('Positive minus positive; Result Positive');
console.log(`Result: ${JSON.stringify(results_3)}`);

(JSON.stringify(results_3) === JSON.stringify({'Output':[0,0,0,0,0,0,1,0], 'Overflow':0})) ? console.log('Passed') : console.log('Failed');


//Positive Subtracted from Positive; Negative Result // 13 - 15 = -2
let test_4 = new Alu([0,0,0,0,1,1,0,1], [0,0,0,0,1,1,1,1]);
let results_4 = test_4.run([0,0,1,0]);

console.log('Positive minus positive; Result Negative');
console.log(`Result: ${JSON.stringify(results_4)}`);

(JSON.stringify(results_4) === JSON.stringify({'Output':[1,0,0,0,0,0,1,0], 'Overflow':0})) ? console.log('Passed') : console.log('Failed');


//Negative Subtracted from Negative; Positive Result // -13 - (-15) = 2
let test_5 = new Alu([1,0,0,0,1,1,0,1], [1,0,0,0,1,1,1,1]);
let results_5 = test_5.run([0,0,1,0]);

console.log('Negative minus negative; Result Positive');
console.log(`Result: ${JSON.stringify(results_5)}`);

(JSON.stringify(results_5) === JSON.stringify({'Output':[0,0,0,0,0,0,1,0], 'Overflow':0})) ? console.log('Passed') : console.log('Failed');


//Negative Subtracted from Negative; Negative Result // -15 - (-13) = -2
let test_6 = new Alu([1,0,0,0,1,1,1,1], [1,0,0,0,1,1,0,1]);
let results_6 = test_6.run([0,0,1,0]);

console.log('Negative minus negative; Result Negative');
console.log(`Result: ${JSON.stringify(results_6)}`);

(JSON.stringify(results_6) === JSON.stringify({'Output':[1,0,0,0,0,0,1,0], 'Overflow':0})) ? console.log('Passed') : console.log('Failed');


//Positive Subtracted from Negative // -13 - 15 = -28
let test_7 = new Alu([1,0,0,0,1,1,0,1], [0,0,0,0,1,1,1,1]);
let results_7 = test_7.run([0,0,1,0]);

console.log('Negative minus positive');
console.log(`Result: ${JSON.stringify(results_7)}`);

(JSON.stringify(results_7) === JSON.stringify({'Output':[1,0,0,1,1,1,0,0], 'Overflow':0})) ? console.log('Passed') : console.log('Failed');


//Negative Subtracted from Positive // 13 - (-15) = 28
let test_8 = new Alu([0,0,0,0,1,1,0,1], [1,0,0,0,1,1,1,1]);
let results_8 = test_8.run([0,0,1,0]);

console.log('Positive minus negative');
console.log(`Result: ${JSON.stringify(results_8)}`);

(JSON.stringify(results_8) === JSON.stringify({'Output':[0,0,0,1,1,1,0,0], 'Overflow':0})) ? console.log('Passed') : console.log('Failed');


