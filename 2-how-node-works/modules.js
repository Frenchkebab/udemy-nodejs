// console.log(arguments);
// console.log(require('module').wrapper); //* wrapper function

const C = require('./test-module-1'); //* for class we usually use uppercase names
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports
const { add, multiply, divide } = require('./test-module-2'); //* the export object from './test-module-2'
console.log(multiply(2, 5));

// caching
require('./test-module-3')(); //* we call the function rightway
require('./test-module-3')(); //* from the second time, it comes from cache
require('./test-module-3')();
