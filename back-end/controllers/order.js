import Order from '../database/schemas/order.js';

// calculateOrderPrice
// Calculate the price of an order given its _id
// Parameters required: _id

export const calculateOrderPrice = async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
  try {
    let foundOrder = await Order.findById(req.body._id);
    if (foundOrder) {
      let price = await foundOrder.calculatePrice();
      return res.status(200).json({ success: true, price: price });
    } else {
      return res
        .status(404)
        .json({ success: false, message: 'Order not found' });
    }
  } catch (err) {
    console.log(err.message);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
