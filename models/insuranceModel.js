// models/insuranceModel.js
import db from '../config/db.js';

const Insurance = {
    createInsurance: (insuranceData) => {
        const { provider_name, premium, terms } = insuranceData;
        return db.execute(
            'INSERT INTO Insurance (provider_name, premium, terms) VALUES ( ?, ?, ?)',
            [provider_name, premium, terms]
        );
    },
    getUserById: (userId) => {
        return db.execute('SELECT * FROM User WHERE user_id = ?', [userId]);
    },

  
    

};

export default Insurance;
