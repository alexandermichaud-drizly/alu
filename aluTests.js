import ALU from './alu-compiled';

// ***********************
//	ALU TEST FILE
// ***********************

function test(testDescription, result, correctResult) {
	console.log(`Testing for ${testDescription}`);

	result = JSON.stringify(result);
	correctResult = JSON.stringify(correctResult);

	result === correctResult ? console.log(`Test passed. \n Output: ${result}\n`) : console.log(`Test failed. \n Correct Result: ${correctResult} \n Actual  Result: ${result}\n`);
}


let test_alu = new ALU();

//
// Arithmetic Tests
//


//Addition of Two Positives // 15 + 13 = 28
let results_1 = test_alu.run([0,0,0,0,1,1,1,1], [0,0,0,0,1,1,0,1], [0,0,0,1]);
test('Positive plus Positive', results_1, [0,0,0,1,1,1,0,0]);


//Addition of Two Negatives // -15 + -13 = -28
let results_2 = test_alu.run([1,1,1,1,0,0,0,1], [1,1,1,1,0,0,1,1], [0,0,0,1]);
test('Negative plus Negative', results_2, [1,1,1,0,0,1,0,0]);

//Positive Subtracted from Positive; Positive Result // 15 - 13 = 2
let results_3 = test_alu.run([0,0,0,0,1,1,1,1], [0,0,0,0,1,1,0,1], [0,0,1,0]);
test('Positive minus Positive; Result Positive', results_3, [0,0,0,0,0,0,1,0]);

//Positive Subtracted from Positive; Negative Result // 13 - 15 = -2
let results_4 = test_alu.run([0,0,0,0,1,1,0,1], [0,0,0,0,1,1,1,1], [0,0,1,0]);
test('Positive minus Positive; Result Negative', results_4, [1,1,1,1,1,1,1,0]);

//Negative Subtracted from Negative; Positive Result // -13 - (-15) = 2
let results_5 = test_alu.run([1,1,1,1,0,0,1,1], [1,1,1,1,0,0,0,1], [0,0,1,0]);
test('Negative minus Negative; Result Positive', results_5, [0,0,0,0,0,0,1,0]);

//Negative Subtracted from Negative; Negative Result // -15 - (-13) = -2
let results_6 = test_alu.run([1,1,1,1,0,0,0,1], [1,1,1,1,0,0,1,1], [0,0,1,0]);
test('Negative minus Negative; Result Negative', results_6, [1,1,1,1,1,1,1,0]);

//Positive Subtracted from Negative // -13 - 15 = -28
let results_7 = test_alu.run([1,1,1,1,0,0,1,1], [0,0,0,0,1,1,1,1], [0,0,1,0]);
test('Negative minus Positive', results_7, [1,1,1,0,0,1,0,0]);

//Negative Subtracted from Positive // 13 - (-15) = 28
let results_8 = test_alu.run([0,0,0,0,1,1,0,1], [1,1,1,1,0,0,0,1], [0,0,1,0]);
test('Positive minus Negative', results_8, [0,0,0,1,1,1,0,0]);


//
//Non-Arithmetic Tests
//


const posAlpha = [0,0,0,0,1,1,1,1];
const posBeta =  [0,0,0,0,1,1,0,1];
const negAlpha = [1,1,1,1,0,0,0,1];
const negBeta = [1,1,1,1,0,0,1,1];


//Increment
//Positive Alpha // ++15
let results_9 = test_alu.run(posAlpha, posBeta, [0,0,1,1]);
test('Increment positive alpha', results_9, [0,0,0,1,0,0,0,0]);

//Positive Beta // ++13
let results_10 = test_alu.run(posAlpha, posBeta, [0,1,0,0]);
test('Increment positive beta', results_10, [0,0,0,0,1,1,1,0]);

//Negative Alpha // ++(-15)
let results_11 = test_alu.run(negAlpha, negBeta, [0,0,1,1]); 
test('Increment negative alpha', results_11, [1,1,1,1,0,0,1,0]);

//Negative Beta // ++(-13)
let results_12 = test_alu.run(negAlpha, negBeta, [0,1,0,0]);
test('Increment negative beta', results_12, [1,1,1,1,0,1,0,0]);


//Decrement
//Positive Alpha // --15
let results_13 = test_alu.run(posAlpha, posBeta, [0,1,0,1]);
test('Decrement positive alpha', results_13, [0,0,0,0,1,1,1,0]);

//Positive Beta // --13
let results_14 = test_alu.run(posAlpha, posBeta, [0,1,1,0]);
test('Decrement positive beta', results_14, [0,0,0,0,1,1,0,0]);

//Negative Alpha // --(-15)
let results_15 = test_alu.run(negAlpha, negBeta, [0,1,0,1]); 
test('Decrement negative alpha', results_15, [1,1,1,1,0,0,0,0]);

//Negative Beta // --(-13)
let results_16 = test_alu.run(negAlpha, negBeta, [0,1,1,0]);
test('Decrement negative beta', results_16, [1,1,1,1,0,0,1,0]);


//Logically Negate
//Positive Alpha // 00001111 => 11110000
let results_17 = test_alu.run(posAlpha, posBeta, [0,1,1,1]);
test('L Negate positive alpha', results_17, [1,1,1,1,0,0,0,0]);

//Positive Beta // 00001101 => 11110010
let results_18 = test_alu.run(posAlpha, posBeta, [1,0,0,0]);
test('L Negate positive beta', results_18, [1,1,1,1,0,0,1,0]);

//Negative Alpha // 11110001 => 00001110
let results_19 = test_alu.run(negAlpha, negBeta, [0,1,1,1]); 
test('L Negate negative alpha', results_19, [0,0,0,0,1,1,1,0]);

//Negative Beta // 11110011 => 00001100
let results_20 = test_alu.run(negAlpha, negBeta, [1,0,0,0]);
test('L Negate negative beta', results_20, [0,0,0,0,1,1,0,0]);


//Arithmetically Negate
//Positive Alpha // 00001111 => 11110001
let results_21 = test_alu.run(posAlpha, posBeta, [1,0,0,1]);
test('A Negate positive alpha', results_21, [1,1,1,1,0,0,0,1]);

//Positive Beta // 00001101 => 11110011
let results_22 = test_alu.run(posAlpha, posBeta, [1,0,1,0]);
test('A Negate positive beta', results_22, [1,1,1,1,0,0,1,1]);

//Negative Alpha // 11110001 => 00001111
let results_23 = test_alu.run(negAlpha, negBeta, [1,0,0,1]); 
test('A Negate negative alpha', results_23, [0,0,0,0,1,1,1,1]);

//Negative Beta // 11110011 => 00001101
let results_24 = test_alu.run(negAlpha, negBeta, [1,0,1,0]);
test('A Negate negative beta', results_24, [0,0,0,0,1,1,0,1]);


//
//Overflow Tests
//


function testOverflow(description, testNum, opcode) {
	console.log(`\n${description}:`);
	console.log(JSON.stringify(test_alu.run(testNum, testNum, opcode)));
}

const oneTwentySeven = [0,1,1,1,1,1,1,1];
const minusOneTwentySeven = [1,0,0,0,0,0,0,1];
const minusOneTwentyEight = [1,0,0,0,0,0,0,0];
const minusOne = [1,1,1,1,1,1,1,1]
const zero = [0,0,0,0,0,0,0,0];

//Should Overflow:
testOverflow('Adding large positives', oneTwentySeven, [0,0,0,1]);
testOverflow('Adding large negatives', minusOneTwentyEight, [0,0,0,1]);
testOverflow('Increment overflow alpha', oneTwentySeven, [0,0,1,1]);
testOverflow('Increment overflow beta', oneTwentySeven, [0,1,0,0]);
testOverflow('Decrement overflow alpha', minusOneTwentyEight, [0,1,0,1]);
testOverflow('Decrement overflow beta', minusOneTwentyEight, [0,1,1,0]);

//Should not overflow:
testOverflow('Decrement no overflow alpha', minusOneTwentySeven, [0,1,0,1]);
testOverflow('Decrement no overflow beta', minusOneTwentySeven, [0,1,1,0]);
testOverflow('Increment -1 no overflow', minusOne, [0,0,1,1]);
testOverflow('Decrement 0 no overflow', zero, [0,1,1,0]);
