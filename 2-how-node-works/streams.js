const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  //* Solution 1)
  // fs.readFile('test-file.txt', (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  //* Solution 2) Streams
  //* -> we do not need the 'data' variable
  // const readable = fs.createReadStream('test-file.txt');
  // //* remember that the respose is a writable stream
  // //* we are streaming the content from the file right to the client
  // readable.on('data', (chunk) => {
  //   //* we read once piece of the file, and as soon as it's available,
  //   //* we send it right to the client using the write method (repeat this until all the file is read)
  //   res.write(chunk);
  // });

  // readable.on('end', () => {
  //   //* end method signals that no more data will be written to this writable stream
  //   //* in this case, we already sent all the data chunk by chunk
  //   //* we dont put anything in end() method
  //   res.end();
  // });

  // readable.on('error', (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end('File not found!');
  // });

  //* Solution 3) Using pipe operator, we solve the backpressure problem
  /*
   * it allows us to pipe the output of a readable stream
   * right into the input of a writable stream.
   * (This will then fix the problem of backpressure
   * because it will automatically handle the speed of the data comming in,
   * and the speed of the data going out
   */
  const readable = fs.createReadStream('test-file.txt');
  //* readableSource.pipe(writableDestination)
  readable.pipe(res);
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening...');
});
