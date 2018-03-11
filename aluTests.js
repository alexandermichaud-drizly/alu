import Alu from './alu-compiled';

// ***********************
//	ALU TEST FILE
// ***********************

function test(testDescription, result, correctResult) {
	console.log(`Testing for ${testDescription}`);

	result = JSON.stringify(result); 
	correctResult = JSON.stringify(correctResult);

	result === correctResult ? console.log(`Test passed. \n Output: ${result}.\n`) : console.log(`Test failed. \n Correct Result: ${correctResult}. \n Actual  Result: ${result}.\n`);
}

//Addition of Two Positives // 15 + 13 = 28
let test_1 = new Alu([0,0,0,0,1,1,1,1], [0,0,0,0,1,1,0,1]);
let results_1 = test_1.run([0,0,0,1]);
test('Positive plus Positive', results_1, {'Output':[0,0,0,1,1,1,0,0], 'Overflow':0});


//Addition of Two Negatives // -15 + -13 = -28
let test_2 = new Alu([1,1,1,1,0,0,0,1], [1,1,1,1,0,0,1,1]);
let results_2 = test_2.run([0,0,0,1]);
test('Negative plus Negative', results_2, {'Output':[1,1,1,0,0,1,0,0], 'Overflow':0});

//Positive Subtracted from Positive; Positive Result // 15 - 13 = 2
let test_3 = new Alu([0,0,0,0,1,1,1,1], [0,0,0,0,1,1,0,1]);
let results_3 = test_3.run([0,0,1,0]);
test('Positive minus Positive; Result Positive', results_3, {'Output':[0,0,0,0,0,0,1,0], 'Overflow':0});

//Positive Subtracted from Positive; Negative Result // 13 - 15 = -2
let test_4 = new Alu([0,0,0,0,1,1,0,1], [0,0,0,0,1,1,1,1]);
let results_4 = test_4.run([0,0,1,0]);
test('Positive minus Positive; Result Negative', results_4, {'Output':[1,1,1,1,1,1,1,0], 'Overflow':0});

//Negative Subtracted from Negative; Positive Result // -13 - (-15) = 2
let test_5 = new Alu([1,1,1,1,0,0,1,1], [1,1,1,1,0,0,0,1]);
let results_5 = test_5.run([0,0,1,0]);
test('Negative minus Negative; Result Positive', results_5, {'Output':[0,0,0,0,0,0,1,0], 'Overflow':0});

//Negative Subtracted from Negative; Negative Result // -15 - (-13) = -2
let test_6 = new Alu([1,1,1,1,0,0,0,1], [1,1,1,1,0,0,1,1]);
let results_6 = test_6.run([0,0,1,0]);
test('Negative minus Negative; Result Negative', results_6, {'Output':[1,1,1,1,1,1,1,0], 'Overflow':0});


//Positive Subtracted from Negative // -13 - 15 = -28
let test_7 = new Alu([1,1,1,1,0,0,1,1], [0,0,0,0,1,1,1,1]);
let results_7 = test_7.run([0,0,1,0]);
test('Negative minus Positive', results_7, {'Output':[1,1,1,0,0,1,0,0], 'Overflow':0});

//Negative Subtracted from Positive // 13 - (-15) = 28
let test_8 = new Alu([0,0,0,0,1,1,0,1], [1,1,1,1,0,0,0,1]);
let results_8 = test_8.run([0,0,1,0]);
test('Positive minus Negative', results_8, {'Output':[0,0,0,1,1,1,0,0], 'Overflow':0});
