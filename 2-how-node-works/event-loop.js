const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();

fs.readFile('test-file.txt', () => {
  console.log('I/O finished');
  console.log('-------------------------');

  setTimeout(() => console.log('Timer 2 finished'), 0);
  setImmediate(() => console.log('Immediate 2 finished'));
  // setTimeout(() => console.log('Timer 3 finished'), 3000);

  process.nextTick(() => console.log('Process.nextTick'));
  process.nextTick(() => console.log('Process.nextTick2'));

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {});
  console.log(Date.now() - start, 'Password encrypted');

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password encrypted');
  });
});

setImmediate(() => console.log('Immediate 1 finished'));
setTimeout(() => console.log('Timer 1 finished'), 0);

console.log('Hello from teh top-level code');
