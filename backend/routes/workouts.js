import express from 'express';
import { body, validationResult } from 'express-validator';
import WorkoutPlan from '../models/WorkoutPlan.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

const workoutValidators = [
  body('dietPlanId').isString().isLength({ min: 10 }),
  body('durationWeeks').optional().isNumeric(),
];

router.get('/:dietPlanId', async (req, res) => {
  try {
    const workout = await WorkoutPlan.findOne({ dietPlanId: req.params.dietPlanId });
    if (!workout) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }
    return res.json(workout);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', requireAdmin, workoutValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { dietPlanId } = req.body;
  try {
    const existing = await WorkoutPlan.findOne({ dietPlanId });
    if (existing) {
      existing.set(req.body);
      await existing.save();
      return res.json(existing);
    }
    const workout = await WorkoutPlan.create(req.body);
    return res.status(201).json(workout);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;


