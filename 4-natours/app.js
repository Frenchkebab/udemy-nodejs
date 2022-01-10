const express = require('express');

const app = express();

app.get('/', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  //* A callback function that will be called as soon as the server starts listening
  console.log(`App running on portr ${port}...`);
});
