import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (req, res) => {
  const user = req.user;
  const token = jwt.sign({ id: user.user_id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '10h' });
  
  res.json({ token });
};
