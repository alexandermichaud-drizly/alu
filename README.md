OVERVIEW
This project is designed to simulate an arithmetic logic unit, using boolean logic gates to perform rudimentary calculations and operations.

A NOTE ON TRANSPILATION
I have compiled the scripts using Babel in order to ensure full compatibility with Node. The uncompiled code is more readable and better illustrates my coding style.

ABSTRACTING CIRCUITRY
My intention with this project is to learn and practice techniques of binary arithmetic and boolean logic, not to render all the nuances of CPU circuitry. Therefore, the program will abstract certain features of a real ALU, whose complexity would distract from this goal and take away from the readability of the code. 

For example, each time a method such as .fullAdder() is called, it should be understood that in a real ALU, this would be a set of logic gates that would be physically rendered as many times as the number of bits the ALU was built to accommodate. 

Rather than writing out the same code seven times and designing the program as an interminable mess, I have simply represented the fullAdder as a method that is called seven times, making use of temporary variables as a substitute for the circuits that would, in real life, bring signals directly to the next logic gate in their path.  

THE ALU AS A JAVASCRIPT CLASS
In representing the ALU as a class, my original intention was that the ALU instances would be initialized with one set of inputs saved as object properties (this._inputA), in order to quickly test different operations on the same set of inputs. I realized, however, that the nature of JS objects dictates that operations performed with these inputs as arguments would change the values of the properties themselves, which would affect other operations. I rewrote the ALU and the tests such that the inputs are passed as arguments when the method .run is called. 

NUMERIC REPRESENTATION
The ALU represents negatives using two's complement conversion. The leftmost bit is effectively a signed bit, so the ALU can hand inputs from -128 to 127.
It cannot accomodate floating points.

OPERATIONS THAT HAVE BEEN CODED AND TESTED SUCCESSFULLY:
ADD, SUBTRACT, INCREMENT, DECREMENT, LOGICALLY NEGATE, OVERFLOW

OPERATIONS THAT ARE CODED BUT HAVE NOT PASSED TESTING:
ARITHMETICALLY NEGATE
