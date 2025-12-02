import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import AdminUser from '../models/AdminUser.js';
import { JWT_SECRET } from '../config.js';

const router = express.Router();

router.post(
  '/login',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const admin = await AdminUser.findOne({ email });
      if (!admin) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const valid = await bcrypt.compare(password, admin.passwordHash);
      if (!valid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: admin._id.toString(), email: admin.email, role: admin.role },
        JWT_SECRET,
        { expiresIn: '8h' }
      );

      return res.json({ token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;


