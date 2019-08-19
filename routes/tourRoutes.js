const express = require('express');
const tourController = require('./../controllers/tourController');
const authenticationController = require('../controllers/authenticationController');

const router = express.Router();

router
  .route('/top-5-budget')
  .get(tourController.topToursBudget, tourController.getAllTours);

router
  .route('/tour-stats')
  .get(tourController.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authenticationController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
