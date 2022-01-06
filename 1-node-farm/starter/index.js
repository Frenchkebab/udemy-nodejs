const fs = require('fs');
const http = require('http');
const url = require('url');
/////////////////////////////////
// ! FILES

////Blocking, synchronouse way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

//// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('ERROR!');
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//       console.log(data3);

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//         console.log('Your file has been written 😁');
//       });
//     });
//   });
// });
console.log('Will read file!');

/////////////////////////////
// ! SERVER

// * code out here is only executed 'once' when we run the program

// stored this to variable 'data' so you don't have to read it each time you redirect '/api'
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// * code below gets executed each time when there is new request
const server = http.createServer((req, res) => {
  // console.log(req.url);
  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the OVERVIEW');
  } else if (pathName === '/product') {
    res.end('This is the PRODUCT!');
  } else if (pathName === '/api') {
    // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
    // const productData = JSON.parse(data);
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
    // });
  } else {
    // ! status code must be sent before content
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world' // you can check this in 'Response Headers'
    });
    res.end('<h1>Page not found!</h1>');
  }
});

// 8000: port number, 127.0.0.1 : local host address
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
