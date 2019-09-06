const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).render('base', {
    tour: 'The Forrest Hiker',
    user: 'Graeme',
  });
});

router.get('/', viewsController.getAllTours);
router.get('/tour', viewsController.getTour);

module.exports = router;
