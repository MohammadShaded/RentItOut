import {
    requestRefund
    
} from "../models/payment.js" ;

import db from "../config/db.js";
import axios from "axios";

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