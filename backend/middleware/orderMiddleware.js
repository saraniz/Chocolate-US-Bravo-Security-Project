import Order from "../models/Order.js";

const orderMiddleware = {
    getOrderById: async (req, res, next) => {
        const orderId = req.params.id;
        try {
            const order = await Order.findById(orderId);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            req.order = order;
            next();
        } catch (error) {
            console.error("Error fetching order:", error);
            return res.status(500).json({ message: "Server error while fetching order" });
        }
    },

    checkOrderOwnership: (req, res, next) => {
        if (!req.user || !req.order) {
            return res.status(400).json({ message: "Missing user or order information" });
        }

        if (req.order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You do not have permission to access this order" });
        }

        next();
    }
};

export default orderMiddleware;
