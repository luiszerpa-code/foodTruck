const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { HTTP_BAD_REQUEST } = require('../constants/http_status.js');
const { OrderStatus } = require('../constants/order_status.js');
const { OrderModel } = require('../models/ordermodel.js');
// const auth = require('../middlewares/authm');

const router = Router();
// router.use(auth);

router.post('/create',
asyncHandler(async (req, res) => {
    const requestOrder = req.body;

    if (requestOrder.items.length <= 0) {
        res.status(HTTP_BAD_REQUEST).send('Cart Is Empty!');
        return;
    }

    await OrderModel.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW
    });

    const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
})
);

module.exports = router;
