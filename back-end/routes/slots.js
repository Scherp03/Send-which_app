
import {Slot} from '../database/schemas/slot.js'
import mongoose from 'mongoose';
import {OrdersId} from '../database/schemas/order.js'





app.get('/available-time', async (req, res) => {
    try {
      const availableTimeSlots = ['9:00 AM', '9:15 AM', '9:30', '9:45 AM', '10:00 AM','10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM','11:15 AM', '11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM', '13:00 PM','13:15 PM', '13:30 PM', '13:45 PM', '14:00 PM','14:15 PM', '14:30 PM', '14:45 PM', '15:00 PM', '15:15 PM', '15:30 PM', '15:45 PM', '16:00 PM' ];
      
      // Fetch booked time slots from the database
      const bookedTimeSlots = await Slot.find({ date: req.query.date });
      
      // Remove booked time slots from available ones
      const filteredTimeSlots = availableTimeSlots.filter(slot =>  !bookedTimeSlots.includes(slot));
  
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
      const isSlotAvailable = await Slot.findOne({ OrdersId, date, time });
  
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