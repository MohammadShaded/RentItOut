// controllers/insuranceController.js
import Insurance from '../models/insuranceModel.js';


const insuranceController = {
createInsurance : async (req, res) => {
    const userId = req.user.user_id; 
    try {
        const [userRows] = await Insurance.getUserById(userId);
        if (userRows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        if(userRows[0].role=='Admin'){
        const [result] = await Insurance.createInsurance(req.body);
        res.status(201).json({message: 'Insurance created successfully' });}
        else{
            res.status(401).json({ role:userRows[0].role,message: 'You do not have permission to add this insurence' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},
getInsuranceById : async (req, res) => {
    const userId = req.user.user_id;  
    try {
        const [userRows] = await Insurance.getUserById(userId);
        if (userRows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const [rows] = await Insurance.getInsuranceById(req.params.insurance_id);
        if (rows.length === 0) return res.status(404).json({ message: 'Insurance not found' });
        res.json({insurance:rows[0]});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},

getInsuranceByName : async (req, res) => {
    const userId = req.user.user_id; 
    try {
        const [userRows] = await Insurance.getUserById(userId);
        if (userRows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const [rows] = await Insurance.getInsuranceByName(req.params.provider_name);
        if (rows.length === 0) return res.status(404).json({ Insurance_Name:req.params.provider_name,message: 'Insurance not found' });
        res.json({insurance:rows[0]});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},


getAllInsurance : async (req, res) => {
    const userId = req.user.user_id; 
    try {
        const [userRows] = await Insurance.getUserById(userId);
        if (userRows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const [rows] = await Insurance.getAllInsurance();
        res.json({insurance:rows});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},
getAllProviders : async (req, res) => {
    const userId = req.user.user_id; 
    try {
        const [userRows] = await Insurance.getUserById(userId);
        if (userRows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const [rows] = await Insurance.getAllProviders(); 
        res.json({ providers: rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},


}
export default insuranceController;