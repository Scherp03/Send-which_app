import Slot from '../database/schemas/slot.js';
import dotenv from 'dotenv';
dotenv.config();

export const populateSlots = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', `${process.env.CLIENT_BASE_URL}`);
  try {
    await Slot.deleteMany({});

    // Define constants
    const openingTimeDate = new Date(req.body.openingTime);
    const closingTimeDate = new Date(req.body.closingTime);
    const slotDurationDate = new Date(req.body.slotDuration);

    const openingTimeMinutes =
      openingTimeDate.getHours() * 60 + openingTimeDate.getMinutes();
    const closingTimeMinutes =
      closingTimeDate.getHours() * 60 + closingTimeDate.getMinutes();
    const slotDurationMinutes = slotDurationDate.getMinutes(); // Insert any time, only minutes are counted
    const maxSandwiches = req.body.maxSandwiches;
    const totalTime = closingTimeMinutes - openingTimeMinutes;

    // create new slots
    if (totalTime % slotDurationMinutes !== 0) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid slot duration' });
    }
    let slotNumber = totalTime / slotDurationMinutes;
    for (let i = 0; i < slotNumber; i++) {
      let slotTime = new Date(openingTimeDate);
      slotTime.setMinutes((openingTimeMinutes + i * slotDurationMinutes) % 60);
      slotTime.setSeconds(0);
      slotTime.setHours((openingTimeMinutes + i * slotDurationMinutes) / 60);
      let newSlot = new Slot({
        time: slotTime,
        maxSandwiches: maxSandwiches,
        duration: slotDurationMinutes,
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
  res.get('Access-Control-Allow-Origin', `${process.env.CLIENT_BASE_URL}`);
  try {
    const slots = await Slot.find();
    if (slots.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No slots found' });
    }
    return res.status(200).json({
      success: true,
      slots: slots.map((slot) => ({
        _id: slot._id,
        hours: slot.time.getHours(),
        minutes:
          (slot.time.getMinutes() < 10 ? '0' : '') + slot.time.getMinutes(),
        maxSandwiches: slot.maxSandwiches,
        duration: slot.duration,
      })),
    });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getSlot = async (req, res, next) => {
  res.get('Access-Control-Allow-Origin', `${process.env.CLIENT_BASE_URL}`);
  try {
    const { id } = req.params;
    const slot = await Slot.findById(id);
    if (!slot) {
      return res
        .status(404)
        .json({ success: false, message: 'Slot not found' });
    }
    return res.status(200).json({
      success: true,
      time:
        slot.time.getHours() +
        ':' +
        (slot.time.getMinutes() < 10 ? '0' : '') +
        slot.time.getMinutes(),
    });
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
