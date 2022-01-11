const fs = require('fs');
const express = require('express');
const res = require('express/lib/response');

const app = express();

/*
 * Middleware is a function that can modify the incomming request data.
 * It is called 'Middle'ware because it stands between req and res
 * It's a step that the request goes through while it's being processed.
 * And as the req goes through, the data from the body is added to the req object using middleware.
 */
app.use(express.json()); //* Middleware
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
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`) //* only read at the beginning of the server
  /*
   * but each time we save the JSON file, it will also reload the server
   */
);

/*
 * In case you want to do some changes to your API,
 * you just can do it simply on v2
 *  without breaking everyone who is still using V1
 */
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

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params); //* variables defined in URL

  const id = req.params.id * 1; //* automatically converted into a number
  const tour = tours.find((el) => el.id === req.params);

  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: {
    //   tours, // tours: tours
    // },
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body); //* body will be available because we use Middleware

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  /*
   * writeFile vs writeFileSync
   * => we are inside of a callback function that is gonna run in the event loop
   * so we can never ever block the event loop. So we should use async
   */
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      //* 201: created
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    // if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    // if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  //* 204 means 'no content'
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const port = 3000;
app.listen(port, () => {
  //* A callback function that will be called as soon as the server starts listening
  console.log(`App running on portr ${port}...`);
});
