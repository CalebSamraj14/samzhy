import express from 'express';
import { body, validationResult } from 'express-validator';
import DietPlan from '../models/DietPlan.js';

const router = express.Router();

const validators = [
  body('age').isInt({ min: 12, max: 80 }),
  body('gender').isIn(['male', 'female', 'other']),
  body('weight').isFloat({ min: 30, max: 250 }),
  body('height').isFloat({ min: 120, max: 230 }),
  body('goal').isIn([
    'weight_gain',
    'weight_loss',
    'fat_loss',
    'body_building',
    'mens_physique',
    'pure_bulking',
    'cutting',
  ]),
  body('activityLevel').isIn(['sedentary', 'light', 'moderate', 'active', 'athlete']),
  body('dietPreference').isIn(['veg', 'non_veg', 'eggetarian', 'mixed']),
];

router.post('/', validators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { goal, dietPreference, medicalFlags = {} } = req.body;

  const baseFilter = {
    goalType: goal,
    dietPreference,
  };

  const excludeSteroids =
    medicalFlags.diabetes || medicalFlags.hypertension || medicalFlags.heart || false;

  if (excludeSteroids) {
    baseFilter.withSteroids = false;
  }

  try {
    const [low, medium, high] = await Promise.all(
      ['low', 'medium', 'high'].map((tier) =>
        DietPlan.findOne({ ...baseFilter, budgetTier: tier }).sort({ level: 1, durationWeeks: 1 })
      )
    );

    return res.json({
      low,
      medium,
      high,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;


