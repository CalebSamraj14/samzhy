import express from 'express';
import { body, validationResult } from 'express-validator';
import DietPlan from '../models/DietPlan.js';
import WorkoutPlan from '../models/WorkoutPlan.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

const dietValidators = [
  body('title').isString().isLength({ min: 3 }),
  body('slug').isString().isLength({ min: 3 }),
  body('goalType').isIn([
    'weight_gain',
    'weight_loss',
    'fat_loss',
    'body_building',
    'mens_physique',
    'pure_bulking',
    'cutting',
  ]),
  body('budgetTier').isIn(['low', 'medium', 'high']),
];

router.get('/', async (req, res) => {
  const {
    goalType,
    withSupplements,
    withSteroids,
    durationWeeks,
    level,
    budgetTier,
    dietPreference,
  } = req.query;

  const filter = {};
  if (goalType) filter.goalType = goalType;
  if (withSupplements !== undefined) filter.withSupplements = withSupplements === 'true';
  if (withSteroids !== undefined) filter.withSteroids = withSteroids === 'true';
  if (durationWeeks) filter.durationWeeks = Number(durationWeeks);
  if (level) filter.level = level;
  if (budgetTier) filter.budgetTier = budgetTier;
  if (dietPreference) filter.dietPreference = dietPreference;

  try {
    const diets = await DietPlan.find(filter).sort({ createdAt: -1 });
    return res.json(diets);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:slugOrId', async (req, res) => {
  const { slugOrId } = req.params;
  try {
    const query = slugOrId.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: slugOrId }
      : { slug: slugOrId };

    const diet = await DietPlan.findOne(query);
    if (!diet) {
      return res.status(404).json({ message: 'Diet plan not found' });
    }

    const workout = await WorkoutPlan.findOne({ dietPlanId: diet._id });
    return res.json({ diet, workout });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', requireAdmin, dietValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const diet = await DietPlan.create(req.body);
    return res.status(201).json(diet);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Slug must be unique' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', requireAdmin, dietValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const diet = await DietPlan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!diet) {
      return res.status(404).json({ message: 'Diet plan not found' });
    }
    return res.json(diet);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const diet = await DietPlan.findByIdAndDelete(req.params.id);
    if (!diet) {
      return res.status(404).json({ message: 'Diet plan not found' });
    }
    await WorkoutPlan.deleteMany({ dietPlanId: diet._id });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;


