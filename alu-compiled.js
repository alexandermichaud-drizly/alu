"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ALU = function () {

	//Each "instance" of the class must be initialized with inputs at hand. 
	//Program assumes that inputs are eight item arrays of 1's and 0's, e.g. [0, 1, 1, 0, 0, 1, 1, 1].
	//Two's complement dictates that the leftmost bit will be a signed bit, and so the ALU can handle numbers from to -127 to 127.
	function ALU(inputA, inputB) {
		_classCallCheck(this, ALU);

		this._alpha = inputA;
		this._beta = inputB;
		this._output = Array(8);
		this._overflowFlag = 0;
	}

	//Once created, the same inputs can then be used to generate different results depending on the opcode passed.
	//Program assumes that inputs are four digit, pseudo-binary numbers, e.g [0, 1, 1, 1].


	_createClass(ALU, [{
		key: "run",
		value: function run(opcode) {
			//0001 --> ADD
			if (!opcode[0] && !opcode[1] && !opcode[2] && opcode[3]) {
				return this.eightBitAddition(this._alpha, this._beta);
			}

			//0010 --> SUBTRACT
			else if (!opcode[0] && !opcode[1] && opcode[2] && !opcode[3]) {
					return this.eightBitSubtraction(this._alpha, this._beta);
				}

				//0011 --> INCREMENT ALPHA
				else if (!opcode[0] && !opcode[1] && opcode[2] && opcode[3]) {
						return this.increment(this._alpha);
					}

					//0100 --> INCREMENT BETA
					else if (!opcode[0] && opcode[1] && !opcode[2] && !opcode[3]) {
							return this.increment(this._beta);
						}

						//0101 --> DECREMENT ALPHA
						else if (!opcode[0] && opcode[1] && !opcode[2] && opcode[3]) {
								return this.decrement(this._alpha);
							}

							//0110 --> DECREMENT BETA
							else if (!opcode[0] && opcode[1] && opcode[2] && !opcode[3]) {
									return this.decrement(this._beta);
								}

								//0111 --> LOGICALLY NEGATE ALPHA
								else if (!opcode[0] && opcode[1] && opcode[2] && opcode[3]) {
										return this.lNegate(this._alpha);
									}

									//1000 --> LOGICALLY NEGATE BETA
									else if (opcode[0] && !opcode[1] && !opcode[2] && !opcode[3]) {
											return this.lNegate(this._beta);
										}

										//1001 --> ARITHMETICALLY NEGATE ALPHA
										else if (opcode[0] && !opcode[1] && !opcode[2] && opcode[3]) {
												return this.aNegate(this._alpha);
											}

											//1010 --> ARTIHMETICALLY NEGATE BETA
											else if (opcode[0] && !opcode[1] && opcode[2] && !opcode[3]) {
													return this.aNegate(this._beta);
												}
		}

		//Logical Negation, i.e. flipping all bits

	}, {
		key: "lNegate",
		value: function lNegate(n) {

			//Abstraction of a NOT gate for all bits
			for (var i = 0; i < 8; i++) {
				n[i] ? this._output[i] = 0 : this._output[i] = 1;
			}

			return this._output;
		}

		//Arithmetic Negation, i.e. two's complement of the input

	}, {
		key: "aNegate",
		value: function aNegate(n) {
			var m = this.lNegate(n);
			return this.increment(m);
		}
	}, {
		key: "increment",
		value: function increment(n) {
			return this.eightBitAddition(n, [0, 0, 0, 0, 0, 0, 0, 1]);
		}
	}, {
		key: "decrement",
		value: function decrement(n) {
			return this.eightBitAddition(n, [1, 1, 1, 1, 1, 1, 1, 1]);
		}
	}, {
		key: "eightBitAddition",
		value: function eightBitAddition(a, b) {

			//Two's complement accounts for negatives, which by extension accounts for subtraction. 

			//First the program must note the signs of the inputs, which will throw an overflow flag if there is carry into the sign bit.
			var overflowSignal = void 0;
			if (a[0] && b[0]) {
				overflowSignal = 0;
			} else if (!a[0] && !b[0]) {
				overflowSignal = 1;
			} else {
				overflowSignal = null;
			};

			//Because there is no carryover bit in the first operation, only half adder is required.
			var temp = this.halfAdder(a[7], b[7]);
			this._output[7] = temp[0];

			//This is an abstraction of passing each of the remaining seven bits into full adders, while using the carry bits of previous sum in the operation for the following two bits.
			for (var i = 6; i > -1; i--) {
				temp = this.fullAdder(a[i], b[i], temp[1]);
				this._output[i] = temp[0];
			}

			//Checks for overflow
			this._output[0] === overflowSignal ? this._overflowFlag = 1 : this._overflowFlag = 0;

			//Returns output
			return this._output;
		}
	}, {
		key: "halfAdder",
		value: function halfAdder(a, b) {
			var sum = void 0;
			var carry = void 0;

			//An XOR and an AND together represent binary addition. 
			if ((a || b) && !(a && b)) {
				sum = 1;
				carry = 0;
			} else if (a && b) {
				sum = 0;
				carry = 1;
			} else {
				sum = 0;
				carry = 0;
			}
			return [sum, carry];
		}

		//Function passes default value of zero for carry bit for when this is the first operation performed.

	}, {
		key: "fullAdder",
		value: function fullAdder(a, b) {
			var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

			//First, we calculate the sum of the inputs.
			var partialSum = this.halfAdder(a, b);

			//Then we account for an carryovers from adding lower digits.
			var carry = void 0;
			var fullSum = this.halfAdder(partialSum[0], c);
			partialSum[1] || fullSum[1] ? carry = 1 : carry = 0;
			return [fullSum[0], carry];
		}
	}, {
		key: "eightBitSubtraction",
		value: function eightBitSubtraction(a, b) {
			//Subtraction can be accomplished by arithmetically negating the subtrahend.
			var subtrahend = this.aNegate(b);
			return this.eightBitAddition(a, subtrahend);
		}
	}]);

	return ALU;
}();

exports.default = ALU;
