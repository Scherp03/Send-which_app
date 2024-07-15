import Slot from '../database/schemas/slot.js';

export const populateSlots = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  try {
    Slot.deleteMany({});
    // Define constants
    let openingTime = req.body.openingTime;
    let closingTime = req.body.closingTime;
    let slotDuration = req.body.slotDuration;
    let maxSandwiches = req.body.maxSandwiches;
    let totalTime = closingTime - openingTime;
    // create new slots
    if (totalTime % slotDuration !== 0) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid slot duration' });
    }
    let slotNumber = totalTime / slotDuration;
    for (let i = 0; i < slotNumber; i++) {
      let newSlot = new Slot({
        time: openingTime + i * slotDuration,
        maxSandwiches: maxSandwiches,
        duration: slotDuration,
      });
      await newSlot.save();
    }
    return res.status(201).json({ success: true, message: 'Slots added' });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getSlots = async (req, res, next) => {
  res.get('Access-Control-Allow-Origin', 'http://localhost:9000');
  try {
    const allSlots = await Slot.find({});
    if (allSlots.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No slots found' });
    }
    return res.status(200).json({ success: true, ingredients: allSlots });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
