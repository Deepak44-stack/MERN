import Order from "../model/order.js";

const createOrder = async (req, res) => {

    const {
        orderItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        paymentMethod
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).send({ error: "No order items" });
    }

    const order = await Order.create({
        user: req.user._id,
        orderItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        paymentMethod
    });

    res.send({
        message: "Order created successfully",
        order
    });
};


const getOrders = async (req, res) => {

    const orders = await Order.find().populate(
        "user",
        "name email"
    );

    res.send(orders);
};


const getOrderById = async (req, res) => {

    const { id } = req.params;

    const order = await Order.findById(id).populate(
        "user",
        "name email"
    );

    if (order) {
        res.send(order);
    } else {
        res.status(404).send({
            error: "Order not found"
        });
    }
};
const getmyorders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  };

 const payOrder = async (req, res) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).send({
            error: "Order not found"
        });
    }

    order.isPaid = true;
    order.paidAt = Date.now();

    await order.save();

    res.send({
        message: "Order paid successfully",
        order
    });
};


const deliverOrder = async (req, res) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).send({
            error: "Order not found"
        });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    await order.save();

    res.send({
        message: "Order delivered successfully",
        order
    });
};


export {
    createOrder,
    getOrders,
    getOrderById,
    getmyorders,
    payOrder,
    deliverOrder,

};

