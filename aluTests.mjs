import Alu from './alu';

// ***********************
//	ALU TEST FILE
// ***********************

//Addition of Two Positives // 15 + 13 = 28
let test_1 = Alu.new([0,0,0,0,1,1,1,1], [0,0,0,0,1,1,0,1]);
let results_1 = test_1.run([0,0,0,1]);
console.log('Positive plus positive');
console.log(`Result: ${results_1}`); 
(results_1 === {'Output':[0,0,0,1,1,1,0,0], 'Overflow':0}) ? console.log('Passed') : console.log('Failed');

//Addition of Two Negatives // -15 + -13 = -28
let test_2 = Alu.new([1,0,0,0,1,1,1,1], [1,0,0,0,1,1,0,1]);
let results_2 = test_2.run([0,0,0,1]);
console.log('Negative plus negative');
console.log(`Result: ${results_2}`);
(results_2 === {'Output':[1,0,0,1,1,1,0,0], 'Overflow':0}) ? console.log('Passed') : console.log('Failed');

//Positive Subtracted from Positive; Positive Result // 15 - 13 = 2
let test_3 = Alu.new([0,0,0,0,1,1,1,1], [0,0,0,0,1,1,0,1]);
let results_3 = test_3.run([0,0,1,0]);
console.log('Positive minus positive; Result Positive');
console.log(`Result: ${results_3}`);
(results_3 === {'Output':[0,0,0,0,0,0,1,0], 'Overflow':0}) ? console.log('Passed') : console.log('Failed');

//Positive Subtracted from Positive; Negative Result // 13 - 15 = -2
let test_4 = Alu.new([0,0,0,0,1,1,0,1], [0,0,0,0,1,1,1,1]);
let results_4 = test_4.run([0,0,1,0]);
console.log('Positive minus positive; Result Negative');
console.log(`Result: ${results_4}`);
(results_4 === {'Output':[1,0,0,0,0,0,1,0], 'Overflow':0}) ? console.log('Passed') : console.log('Failed');

//Negative Subtracted from Negative; Positive Result // -13 - (-15) = 2
let test_5 = Alu.new([1,0,0,0,1,1,0,1], [1,0,0,0,1,1,1,1]);
let results_5 = test_5.run([0,0,1,0]);
console.log('Negative minus negative; Result Positive');
console.log(`Result: ${results_5}`);
(results_5 === {'Output':[0,0,0,0,0,0,1,0], 'Overflow':0}) ? console.log('Passed') : console.log('Failed');

//Negative Subtracted from Negative; Negative Result // -15 - (-13) = -2
let test_6 = Alu.new([1,0,0,0,1,1,1,1], [1,0,0,0,1,1,0,1]);
let results_6 = test_6.run([0,0,1,0]);
console.log('Negative minus negative; Result Negative');
console.log(`Result: ${results_6}`);
(results_6 === {'Output':[1,0,0,0,0,0,1,0], 'Overflow':0}) ? console.log('Passed') : console.log('Failed');

//Positive Subtracted from Negative // -13 - 15 = -28
let test_7 = Alu.new([1,0,0,0,1,1,0,1], [0,0,0,0,1,1,1,1]);
let results_7 = test_7.run([0,0,1,0]);
console.log('Negative minus positive');
console.log(`Result: ${results_7}`);
(results_7 === {'Output':[1,0,0,1,1,1,0,0], 'Overflow':0}) ? console.log('Passed') : console.log('Failed');

//Negative Subtracted from Positive // 13 - (-15) = 28
let test_8 = Alu.new([0,0,0,0,1,1,0,1], [1,0,0,0,1,1,1,1]);
let results_8 = test_8.run([0,0,1,0]);
console.log('Positive minus negative');
console.log(`Result: ${results_8}`);
(results_8 === {'Output':[0,0,0,1,1,1,0,0], 'Overflow':0}) ? console.log('Passed') : console.log('Failed');


