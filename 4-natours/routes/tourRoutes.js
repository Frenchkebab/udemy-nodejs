const express = require('express');
const tourController = require('./../controllers/tourController');
// const { getAllTours, ... } = require('./../controllers/tourController');

const router = express.Router(); //* actually a middleware

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getAllTours)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
