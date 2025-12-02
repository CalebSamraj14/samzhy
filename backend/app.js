import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { MONGO_URI, PORT } from './config.js';

import authRoutes from './routes/auth.js';
import dietRoutes from './routes/diets.js';
import workoutRoutes from './routes/workouts.js';
import uploadRoutes from './routes/uploads.js';
import recommendationRoutes from './routes/recommendations.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/diets', dietRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/recommendations', recommendationRoutes);

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'samzyh diets API' });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });

export default app;

