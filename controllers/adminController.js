import User from '../models/User.js';

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