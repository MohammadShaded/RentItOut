import {
    addPayment,
    requestRefund
    
} from "../models/payment.js" ;

import db from "../config/db.js";
import axios from "axios";

// Create a new payment
export const createPaymentController = async (req, res) => {
    console.log("hi");
   try {
        const payment = req.body;

        console.log("controller");

        await addPayment(payment);
        res.status(201).json(payment);
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(400).json({ message: error.message });
    }
};
export const refundPaymentController = async (req, res) => {
    try {
    
        const paymentId = req.params.payment_id; 

        const result = await requestRefund(paymentId);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error requesting refund:', error);
        res.status(400).json({ message: error.message }); 
    }
};