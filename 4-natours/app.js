const fs = require('fs');
const express = require('express');
const res = require('express/lib/response');

const app = express();

/* app.get('/', (req, res) => {
  // res.status(200).send('Hello from the server side!');

  //* this response is only sent when a GET method (above) is sent to our server on this URL
  //* does not work if requested with POST method
  //* Both http method + URL should be matched
  res
    .status(200)
    .json({ message: 'Hello from the server side!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint...');
}); */

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//* route handler
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours, // tours: tours
    },
  });
});
/*
 * In case you want to do some changes to your API,
 * you just can do it simply on v2
 *  without breaking everyone who is still using V1
 */

const port = 3000;
app.listen(port, () => {
  //* A callback function that will be called as soon as the server starts listening
  console.log(`App running on portr ${port}...`);
});
