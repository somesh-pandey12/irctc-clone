const Train = require('../models/Train');

// @route POST /api/trains  (admin - add train, testing ke liye bhi useful)
exports.addTrain = async (req, res) => {
  try {
    const train = await Train.create(req.body);
    res.status(201).json(train);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route GET /api/trains  (sab trains list - testing ke liye)
exports.getAllTrains = async (req, res) => {
  try {
    const trains = await Train.find();
    res.status(200).json(trains);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route GET /api/trains/search?from=Delhi&to=Mumbai
exports.searchTrains = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({ message: 'From and To are required' });
    }

    // case-insensitive match, source/destination ya stations list me bhi check
    const trains = await Train.find({
      $and: [
        {
          $or: [
            { source: { $regex: new RegExp(`^${from}$`, 'i') } },
            { stations: { $regex: new RegExp(`^${from}$`, 'i') } },
          ],
        },
        {
          $or: [
            { destination: { $regex: new RegExp(`^${to}$`, 'i') } },
            { stations: { $regex: new RegExp(`^${to}$`, 'i') } },
          ],
        },
      ],
    });

    res.status(200).json(trains);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route GET /api/trains/:id
exports.getTrainById = async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    if (!train) return res.status(404).json({ message: 'Train not found' });
    res.status(200).json(train);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};