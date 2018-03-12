OVERVIEW
This project is designed to simulate an arithmetic logic unit, using boolean logic gates to perform rudimentary calculations and operations.

A NOTE ON TRANSPILATION
I have compiled the scripts using Babel in order to ensure full compatibility with Node. The uncompiled code is more readable and better illustrates my coding style.

ABSTRACTING CIRCUITRY
My intention with this project is to learn and practice techniques of binary arithmetic and boolean logic, not to render all the nuances of CPU circuitry. Therefore, the program will abstract certain features of a real ALU, whose complexity would distract from this goal and take away from the readability of the code. 

For example, each time a method such as .fullAdder() is called, it should be understood that in a real ALU, this would be a set of logic gates that would be physically rendered as many times as the number of bits the ALU was built to accommodate. 

Rather than writing out the same code seven times and designing the program as an interminable mess, I have simply represented the fullAdder as a method that is called seven times, making use of temporary variables as a substitute for the circuits that would, in real life, bring signals directly to the next logic gate in their path.  

THE ALU AS A JAVASCRIPT CLASS
I have chosen to represent the ALU as a class. This allows the same ALU "instance" to test the different operations on the same set of inputs. I recognize that this does not cohere with how an ALU is called within a CPU, but it is marginally easier to simply call .run(opcode) rather than run(a, b, opcode) when testing with the same variables. 

NEGATIVE NUMBERS
The ALU represents negatives using two's complement conversion. It cannot accomodate floating points.

OPERATIONS THAT HAVE BEEN CODED AND TESTED SUCCESSFULLY:
ADD, SUBTRACT, INCREMENT, DECREMENT, LOGICALLY NEGATE, OVERFLOW

OPERATIONS THAT ARE CODED BUT HAVE NOT PASSED TESTING:
ARITHMETICALLY NEGATE
