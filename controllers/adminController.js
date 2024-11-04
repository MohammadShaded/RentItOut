import User from '../models/User.js';
import {getTotalRevenue,getRevenuePerMonth} from '../models/payment.js';
import Rental from "../models/rentalModel.js";
import FlaggedContent from '../models/FlaggedContent.js';
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

export const getFlaggedContent = async (req, res) => {
    if(req.user.role != 'Admin') return res.status(403).json({ message: 'Access denied. Admins only.' });
    try {
        const flaggedContent = await FlaggedContent.getAllFlaggedContent();
        res.json(flaggedContent);
    } catch (error) {
        console.error('Error retrieving flagged content:', error);
        res.status(500).json({ message: 'Error retrieving flagged content' });
    }
};

export const updateFlaggedContentStatus = async (req, res) => {
    if(req.user.role != 'Admin') return res.status(403).json({ message: 'Access denied. Admins only.' });

    const { flag_id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'reviewed', 'resolved'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Valid statuses are pending, reviewed, resolved.' });
    }

    try {
        const result = await FlaggedContent.updateStatus(flag_id, status);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Flagged content not found' });
        }
        res.json({ message: `Flagged content status updated to ${status}` });
    } catch (error) {
        console.error('Error updating flagged content status:', error);
        res.status(500).json({ message: 'Error updating flagged content status' });
    }
};

export const getAnalytics = async (req, res) => {
    try {
        if(req.user.role != 'Admin') return res.status(403).json({ message: 'Access denied. Admins only.' });
        const rentalsPerMonth = await Rental.getRentalsPerMonth();
        const revenuePerMonth = await getRevenuePerMonth();

        res.json({
            rentalsPerMonth,
            revenuePerMonth,
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({ message: 'Failed to fetch analytics data' });
    }
};