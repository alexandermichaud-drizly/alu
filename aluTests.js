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


//
// Arithmetic Tests
//


//Addition of Two Positives // 15 + 13 = 28
let test_1 = new ALU([0,0,0,0,1,1,1,1], [0,0,0,0,1,1,0,1]);
let results_1 = test_1.run([0,0,0,1]);
test('Positive plus Positive', results_1, [0,0,0,1,1,1,0,0]);


//Addition of Two Negatives // -15 + -13 = -28
let test_2 = new ALU([1,1,1,1,0,0,0,1], [1,1,1,1,0,0,1,1]);
let results_2 = test_2.run([0,0,0,1]);
test('Negative plus Negative', results_2, [1,1,1,0,0,1,0,0]);

//Positive Subtracted from Positive; Positive Result // 15 - 13 = 2
let test_3 = new ALU([0,0,0,0,1,1,1,1], [0,0,0,0,1,1,0,1]);
let results_3 = test_3.run([0,0,1,0]);
test('Positive minus Positive; Result Positive', results_3, [0,0,0,0,0,0,1,0]);

//Positive Subtracted from Positive; Negative Result // 13 - 15 = -2
let test_4 = new ALU([0,0,0,0,1,1,0,1], [0,0,0,0,1,1,1,1]);
let results_4 = test_4.run([0,0,1,0]);
test('Positive minus Positive; Result Negative', results_4, [1,1,1,1,1,1,1,0]);

//Negative Subtracted from Negative; Positive Result // -13 - (-15) = 2
let test_5 = new ALU([1,1,1,1,0,0,1,1], [1,1,1,1,0,0,0,1]);
let results_5 = test_5.run([0,0,1,0]);
test('Negative minus Negative; Result Positive', results_5, [0,0,0,0,0,0,1,0]);

//Negative Subtracted from Negative; Negative Result // -15 - (-13) = -2
let test_6 = new ALU([1,1,1,1,0,0,0,1], [1,1,1,1,0,0,1,1]);
let results_6 = test_6.run([0,0,1,0]);
test('Negative minus Negative; Result Negative', results_6, [1,1,1,1,1,1,1,0]);

//Positive Subtracted from Negative // -13 - 15 = -28
let test_7 = new ALU([1,1,1,1,0,0,1,1], [0,0,0,0,1,1,1,1]);
let results_7 = test_7.run([0,0,1,0]);
test('Negative minus Positive', results_7, [1,1,1,0,0,1,0,0]);

//Negative Subtracted from Positive // 13 - (-15) = 28
let test_8 = new ALU([0,0,0,0,1,1,0,1], [1,1,1,1,0,0,0,1]);
let results_8 = test_8.run([0,0,1,0]);
test('Positive minus Negative', results_8, [0,0,0,1,1,1,0,0]);


//
//Non-Arithmetic Tests
//


let posTests = new ALU([0,0,0,0,1,1,1,1], [0,0,0,0,1,1,0,1]);
let negTests = new ALU([1,1,1,1,0,0,0,1], [1,1,1,1,0,0,1,1]);


//Increment
//Positive Alpha // ++15
let results_9 = posTests.run([0,0,1,1]);
test('Increment positive alpha', results_9, [0,0,0,1,0,0,0,0]);

//Positive Beta // ++13
let results_10 = posTests.run([0,1,0,0]);
test('Increment positive beta', results_10, [0,0,0,0,1,1,1,0]);

//Negative Alpha // ++(-15)
let results_11 = negTests.run([0,0,1,1]); 
test('Increment negative alpha', results_11, [1,1,1,1,0,0,1,0]);

//Negative Beta // ++(-13)
let results_12 = negTests.run([0,1,0,0]);
test('Increment negative beta', results_12, [1,1,1,1,0,1,0,0]);


//Decrement
//Positive Alpha // --15
let results_13 = posTests.run([0,1,0,1]);
test('Decrement positive alpha', results_13, [0,0,0,0,1,1,1,0]);

//Positive Beta // --13
let results_14 = posTests.run([0,1,1,0]);
test('Decrement positive beta', results_14, [0,0,0,0,1,1,0,0]);

//Negative Alpha // --(-15)
let results_15 = negTests.run([0,1,0,1]); 
test('Decrement negative alpha', results_15, [1,1,1,1,0,0,0,0]);

//Negative Beta // --(-13)
let results_16 = negTests.run([0,1,1,0]);
test('Decrement negative beta', results_16, [1,1,1,1,0,0,1,0]);


debugger;

//Logically Negate
//Positive Alpha // 00001111 => 11110000
let results_17 = posTests.run([0,1,1,1]);
test('L Negate positive alpha', results_17, [1,1,1,1,0,0,0,0]);

//Positive Beta // 00001101 => 11110010
let results_18 = posTests.run([1,0,0,0]);
test('L Negate positive beta', results_18, [1,1,1,1,0,0,1,0]);

//Negative Alpha // 11110001 => 00001110
let results_19 = negTests.run([0,1,1,1]); 
test('L Negate negative alpha', results_19, [0,0,0,0,1,1,1,0]);

//Negative Beta // 11110011 => 00001100
let results_20 = negTests.run([1,0,0,0]);
test('L Negate negative beta', results_20, [0,0,0,0,1,1,0,0]);


//Arithmetically Negate
//Positive Alpha // 00001111 => 11110001
let results_21 = posTests.run([1,0,0,1]);
test('A Negate positive alpha', results_21, [1,1,1,1,0,0,0,1]);

//Positive Beta // 00001101 => 11110011
let results_22 = posTests.run([1,0,1,0]);
test('A Negate positive beta', results_22, [1,1,1,1,0,0,1,1]);

//Negative Alpha // 11110001 => 00001111
let results_23 = negTests.run([1,0,0,1]); 
test('A Negate negative alpha', results_23, [0,0,0,0,1,1,1,1]);

//Negative Beta // 11110011 => 00001101
let results_24 = negTests.run([1,0,1,0]);
test('A Negate negative beta', results_24, [0,0,0,0,1,1,0,1]);


//
//Overflow Tests
//


function testOverflow(description, test, opcode) {
	console.log(`\n${description}:`);
	console.log(JSON.stringify(test.run(opcode)));
}

let largePositives = new ALU([0,1,1,1,1,1,1,1], [0,1,1,1,1,1,1,1]);
let largeNegatives = new ALU([1,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,1]);
let largerNegatives = new ALU([1,0,0,0,0,0,0,0], [1,0,0,0,0,0,0,0]);
let edge = new ALU([1,1,1,1,1,1,1,1], [0,0,0,0,0,0,0,0]);

//Should Overflow:
testOverflow('Adding large positives', largePositives, [0,0,0,1]);
testOverflow('Adding large negatives', largerNegatives, [0,0,0,1]);
testOverflow('Increment overflow alpha', largePositives, [0,0,1,1]);
testOverflow('Increment overflow beta', largePositives, [0,1,0,0]);
testOverflow('Decrement overflow alpha', largerNegatives, [0,1,0,1]);
testOverflow('Decrement overflow beta', largerNegatives, [0,1,1,0]);

//Should not overflow:
testOverflow('Decrement no overflow alpha', largeNegatives, [0,1,0,1]);
testOverflow('Decrement no overflow beta', largeNegatives, [0,1,1,0]);
testOverflow('Increment -1 no overflow', edge, [0,0,1,1]);
testOverflow('Decrement 0 no overflow', edge, [0,1,1,0]);
