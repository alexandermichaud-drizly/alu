class Alu {

	//Each "instance" of the an object must be initialized with inputs at hand. 
	//Program assumes that inputs are eight item arrays of 1's and 0's, e.g. [0, 1, 1, 0, 0, 1, 1, 1].
	constructor(inputA, inputB) {
		this._alpha = inputA;
		this._beta = inputB;
	}
	
	//Once created, the same inputs can then be used to generate different results depending on the opcode passed.
	//Program assumes that inputs are four digit, pseudo-binary numbers, e.g [0, 1, 1, 1].
	run(opcode) {
		//0001 --> ADD
		//if (!opcode0] && !opcode[1] && !opcode[2] && opcode[3]) {
		return this.eightBitAdder(this._alpha, this._beta);
		//}
	}


	eightBitAdder(a, b) {
		let output = Array(8);
			
		//Because there is no carryover bit in the first operation, only half adder is required.
		let temp = this.halfAdder(a[7],b[7]);
		output[7] = temp[0];
		
		//This is an abstraction of passing each of the remaining seven bits into full adders, while using the carry bits of previous sum in the operation for the following two bits.
		for (let i = 6; i > -1; i--) {
			temp = this.fullAdder(a[i], b[i], temp[1]);
			output[i] = temp[0];
		}
		return output;
	}
	

	halfAdder(a,b) {
		let sum;
		let carry;
		
		//An XOR and an AND together represent binary addition. 
		if ((a || b) && !(a && b)) {
			sum = 1;
			carry = 0;
		}
		else if (a && b) {
			sum = 0;
			carry = 1;
		}
		else { 
			sum = 0;
			carry = 0;
		}
		return [sum, carry];
	}

	//Function passes default value of zero for carry bit for when this is the first operation performed.
	fullAdder(a, b, c = 0) {
		//First, we calculate the sum of the inputs.
		let partialSum = this.halfAdder(a,b);

		//Then we account for an carryovers from adding lower digits.
		let carry;
		let fullSum = this.halfAdder(partialSum[0], c);
		(partialSum[1] || fullSum[1]) ? carry = 1 : carry = 0;
		return [fullSum[0], carry];
	}
}

let test = new Alu([0, 1, 1, 0, 0, 1, 1, 1], [0, 0, 1, 0, 1, 0, 1, 1]);
console.log(test.run([0, 0, 0, 1]));
