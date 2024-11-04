import User from '../models/User.js';
import {getTotalRevenue} from '../models/payment.js';
import Rental from "../models/rentalModel.js";

export const getUsersByRole = async (req, res)=>{
    const role = req.params.role;
    if(req.user.role != 'Admin') return res.status(403).json({ message: 'Access denied. Admins only.' });

    try {
        if(!['Admin','Renter','Owner'].includes(role)) return res.status(400).json({ message: 'Invalid query parameters' });

        const users = await User.getUsersByRole( role );
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getAdminReports = async (req, res) => {
    if(req.user.role != 'Admin') return res.status(403).json({ message: 'Access denied. Admins only.' });
    try {
        // 1 Rental statuses  
        const totalRentals = await Rental.getTotalRentals();
        const activeRentals = await Rental.getActiveRentals();
        const completedRentals = await Rental.getCompletedRentals();

        // 2. Revenue 
        const totalRevenue = await getTotalRevenue();

        // 3. User summary
        const totalUsers = await User.getTotalUsers();

        // generate report 
        const report = {
            rentals: {
                total: totalRentals,
                active: activeRentals,
                completed: completedRentals,
            },
            revenue: {
                totalRevenue,
            },
            userActivity: {
                totalUsers,
            },
        };

        res.json(report);
    } catch (error) {
        console.error('Error generating admin report:', error);
        res.status(500).json({ message: 'Error generating report' });
    } 


};