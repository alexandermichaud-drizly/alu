'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Alu = function () {

	//Each "instance" of the an object must be initialized with inputs at hand. 
	//Program assumes that inputs are eight item arrays of 1's and 0's, e.g. [0, 1, 1, 0, 0, 1, 1, 1].
	//The left-most bit is a signed bit, i.e 0 --> non-negative.
	function Alu(inputA, inputB) {
		_classCallCheck(this, Alu);

		this._alpha = inputA;
		this._beta = inputB;
		this._outputVal = Array(8);
		this._outputObj = {
			'Output': [0, 0, 0, 0, 0, 0, 0, 0],
			'Overflow': 0
		};
	}

	//Once created, the same inputs can then be used to generate different results depending on the opcode passed.
	//Program assumes that inputs are four digit, pseudo-binary numbers, e.g [0, 1, 1, 1].


	_createClass(Alu, [{
		key: 'run',
		value: function run(opcode) {
			//0001 --> ADD
			if (!opcode[0] && !opcode[1] && !opcode[2] && opcode[3]) {
				return this.eightBitAddition(this._alpha, this._beta);
			}

			//0010 --> SUBTRACT
			else if (!opcode[0] && !opcode[1] && opcode[2] && !opcode[3]) {
					return this.eightBitSubtraction(this._alpha, this._beta);
				}
		}
	}, {
		key: 'twosComplement',
		value: function twosComplement(n) {
			for (var i = 7; i > -1; i--) {
				if (n[i] === 1) {
					for (var j = i - 1; j > 0; j--) {
						n[j] === 1 ? n[j] = 0 : n[j] = 1;
					}
					break;
				}
			}
			return n;
		}
	}, {
		key: 'eightBitAddition',
		value: function eightBitAddition(a, b) {

			//Two's complement accounts for negatives, which by extension accounts for subtraction. 

			//First the program must note the signs of the inputs, which will throw an overflow flag if there is carry into the sign bit.
			var overflowSignal = void 0;
			if (a[0] === 1 && b[0] === 1) {
				overflowSignal = 0;
			} else if (a[0] === 0 && b[0] === 0) {
				overflowSignal = 1;
			} else {
				overflowSignal = null;
			};

			if (a[0] === 1) {
				a = this.twosComplement(a);
			};
			if (b[0] === 1) {
				b = this.twosComplement(b);
			};

			//Because there is no carryover bit in the first operation, only half adder is required.
			var temp = this.halfAdder(a[7], b[7]);
			this._outputVal[7] = temp[0];

			//This is an abstraction of passing each of the remaining seven bits into full adders, while using the carry bits of previous sum in the operation for the following two bits.
			for (var i = 6; i > -1; i--) {
				temp = this.fullAdder(a[i], b[i], temp[1]);
				this._outputVal[i] = temp[0];
			}

			//Conversion from two's complement

			this._outputObj['Output'] = this._outputVal;

			//Checks for overflow
			this._outputVal[0] === overflowSignal ? this._outputObj['Overflow'] = 1 : this._outputObj['Overflow'] = 0;

			//Returns object
			return this._outputObj;
		}
	}, {
		key: 'halfAdder',
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
		key: 'fullAdder',
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
		key: 'eightBitSubtraction',
		value: function eightBitSubtraction(a, b) {
			//Subtraction can be accomplished by converting the subtrahend to a negative number and adding the values using two's complement.
			b[0] = 1;
			return this.eightBitAddition(a, b);
		}
	}]);

	return Alu;
}();

exports.default = Alu;
