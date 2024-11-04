import pool from '../config/db.js';


const FlaggedContent = {
    getAllFlaggedContent: async () => {
        const query = `
            SELECT f.flag_id, f.content_type, f.content_id, f.reason, f.flagged_by, f.flag_date, f.status,
                   CASE 
                       WHEN f.content_type = 'item' THEN i.title
                       WHEN f.content_type = 'review' THEN r.comments
                   END AS content_detail
            FROM FlaggedContent f
            LEFT JOIN Item i ON f.content_type = 'item' AND f.content_id = i.item_id
            LEFT JOIN Review r ON f.content_type = 'review' AND f.content_id = r.review_id
            ORDER BY f.flag_date DESC
        `;
        const [rows] = await pool.query(query);
        return rows;
    },

    updateStatus: async (flag_id, status) => {
        const query = `UPDATE FlaggedContent SET status = ? WHERE flag_id = ?`;
        const [result] = await pool.query(query, [status, flag_id]);
        return result;
    },
};

export default FlaggedContent;