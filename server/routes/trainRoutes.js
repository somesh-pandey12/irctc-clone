const express = require('express');
const router = express.Router();
const {
  addTrain,
  getAllTrains,
  searchTrains,
  getTrainById,
} = require('../controllers/trainController');

router.post('/', addTrain);
router.get('/', getAllTrains);
router.get('/search', searchTrains);
router.get('/:id', getTrainById);

module.exports = router;