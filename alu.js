const alu = {

	//Each "instance" of the an object must be initialized with inputs at hand. 
	//Program assumes that inputs are eight-digit, pseudo-binary numbers, e.g. 10011011.
	constructor(inputA, inputB) {
		const alpha = inputA.toString.split();
		const beta = inputB.toString.split();
	}
	
	//Once created, the same inputs can then be used to generate different results depending on the opcode passed.
	run(opcode) {}

}
