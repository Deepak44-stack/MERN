import express from "express";
import {
    createOrder,
    getOrders,
    getOrderById,
    getmyorders,
    payOrder,
    deliverOrder,
} 
from "../controller/ordercontroller.js";

import { checkAuth,checkAdmin } from "../middleware/auth.js";

const router = express.Router();


router.get("/myorders", checkAuth, getmyorders);


router.post("/", checkAuth,createOrder);

router.get("/", checkAuth, checkAdmin, getOrders);

router.get("/:id",checkAuth,  getOrderById);

router.put("/:id/pay", checkAuth, payOrder);

router.put("/:id/deliver", checkAuth, checkAdmin, deliverOrder);

export default router;  
