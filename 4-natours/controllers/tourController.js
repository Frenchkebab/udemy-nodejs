const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`) //* only read at the beginning of the server
  /*
   * but each time we save the JSON file, it will also reload the server
   */
);

//* Controllers bellow do not have to check id validity.

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  if (req.params.id * 1 > tours.length) {
    // if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedat: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params); //* variables defined in URL

  const id = req.params.id * 1; //* automatically converted into a number
  const tour = tours.find((el) => el.id === req.params);

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
};

exports.createTour = (req, res) => {
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
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  //* 204 means 'no content'
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
