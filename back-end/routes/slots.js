
import {Slot} from '../database/schemas/slot.js'
import mongoose from 'mongoose';


app.get('/available-time', async (req, res) => {
    try {
      const availableTimeSlots = ['9:00 AM', '9:15 AM', '9:30', '9:45 AM', '10:00 AM','10:15 AM', '10:30', '10:45 AM', '11:00 AM','11:15 AM', '11:30', '11:45 AM', '12:00 AM', '12:15 AM', '12:30', '12:45 AM', '13:00 AM','13:15 AM', '13:30', '13:45 AM', '14:00 AM','14:15 AM', '14:30', '14:45 AM', '15:00 AM', '15:15 AM', '15:30', '15:45 AM', '16:00 AM' ];
      
      // Fetch booked time slots from the database
      const bookedTimeSlots = await Slot.find({ date: req.query.date });
      
      // Remove booked time slots from available ones
      const filteredTimeSlots = availableTimeSlots.filter(slot => !bookedTimeSlots.includes(slot));
  
      res.json({ availableTimeSlots: filteredTimeSlots });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/book-appointment', async (req, res) => {
    try {
      const { OrdersId, date, time } = req.body;
      
      // Check if the selected time slot is available
      const isSlotAvailable = await Slot.findOne({ date, time });
  
      if (isSlotAvailable) {
        res.status(400).json({ error: 'Selected time slot is not available' });
      }
       else {
        // Book the appointment
        const newAppointment = new Appointment({ OrdersId, date, time });
        await newAppointment.save();
        res.json({ message: 'Appointment booked successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });