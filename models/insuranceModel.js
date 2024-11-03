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
    getInsuranceById: (insurance_id) => {
        return db.execute('SELECT * FROM Insurance WHERE insurance_id = ?', [insurance_id]);
    },
    getInsuranceByName: (provider_name) => {
        return db.execute('SELECT * FROM Insurance WHERE LOWER(provider_name) = LOWER(?)', [provider_name]);
    },
    

    getAllInsurance: () => {
        return db.execute('SELECT * FROM Insurance');
    },
    getAllProviders: () => {
        return db.execute('SELECT DISTINCT provider_name FROM Insurance');
    },

  
    

};

export default Insurance;
