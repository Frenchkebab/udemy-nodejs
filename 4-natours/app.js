const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//! 1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json()); //* Middleware

/*
 * This Middleware here are applied to each and every single request!
 * Because we did not sepecified a certain route
 */
app.use((req, res, next) => {
  //* express knows that we are defining a Middleware here
  console.log('Hello from the middleware !!');
  //! if you do not call the 'next' function
  //! then the req/res cycle will be stuck here
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//! 2) ROUTE HANDLERS

//! 3) ROUTES
app.use('/api/v1/tours', tourRouter); //* mounting a new router on a route
app.use('/api/v1/users', userRouter);

//! 4) START THE SERVER
const port = 3000;
app.listen(port, () => {
  //* A callback function that will be called as soon as the server starts listening
  console.log(`App running on portr ${port}...`);
});
