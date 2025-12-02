import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { MONGO_URI } from './config.js';
import AdminUser from './models/AdminUser.js';

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    const email = process.env.ADMIN_EMAIL || 'admin@samzyh.local';
    const password = process.env.ADMIN_PASSWORD || 'samzyh123';

    const existing = await AdminUser.findOne({ email });
    if (existing) {
      console.log('Admin already exists:', email);
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await AdminUser.create({ email, passwordHash });
    console.log('Admin created:', email, 'with password', password);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();

