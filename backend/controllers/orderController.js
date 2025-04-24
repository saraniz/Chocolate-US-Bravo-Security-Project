import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

// @desc    Fetch all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
})

// @desc    Fetch single order
// @route   GET /api/orders/:id
// @access  Private/Admin
export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'id name');
    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
})

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
export const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        await order.remove()
        res.json({ message: 'Order removed' })
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})



