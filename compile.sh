#!/bin/bash

npx babel alu.js -o alu-compiled.js
npx babel aluTests.js -o aluTests-compiled.js
node aluTests-compiled.js
