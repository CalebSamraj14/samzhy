import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MONGO_URI } from './config.js';
import DietPlan from './models/DietPlan.js';

dotenv.config();

const baseMeals = {
  low: [
    {
      label: 'Day 1',
      meals: [
        {
          time: '7:00 am',
          name: 'Breakfast',
          items: ['2 phulkas', '1 cup dal', '1 banana'],
        },
        {
          time: '1:00 pm',
          name: 'Lunch',
          items: ['1.5 cups rice', 'sambar', 'curd', 'mixed veg sabzi'],
        },
        {
          time: '8:00 pm',
          name: 'Dinner',
          items: ['2 chapati', 'chana masala', 'salad'],
        },
      ],
    },
  ],
};

const samplePlans = [
  {
    title: 'Weight loss – low budget (Indian veg, no supplements)',
    slug: 'weight-loss-low-budget-veg-no-supplements',
    goalType: 'weight_loss',
    withSupplements: false,
    withSteroids: false,
    durationWeeks: 8,
    budgetTier: 'low',
    description: 'Simple calorie-deficit vegetarian diet using common Indian foods on a tight budget.',
    notes:
      'Focus on portion control and daily walking. Avoid fried snacks and sugary drinks. Consult a doctor if you have medical issues.',
    dietPreference: 'veg',
    level: 'beginner',
    dailyMeals: baseMeals.low,
  },
  {
    title: 'Weight loss – medium budget (Indian mixed, basic whey)',
    slug: 'weight-loss-medium-budget-mixed-whey',
    goalType: 'weight_loss',
    withSupplements: true,
    withSteroids: false,
    durationWeeks: 8,
    budgetTier: 'medium',
    description:
      'Higher protein Indian mixed diet with basic whey protein to support fat loss and muscle retention.',
    dietPreference: 'mixed',
    level: 'intermediate',
    dailyMeals: baseMeals.low,
  },
  {
    title: 'Weight gain – low budget (Indian home foods)',
    slug: 'weight-gain-low-budget-indian-home',
    goalType: 'weight_gain',
    withSupplements: false,
    withSteroids: false,
    durationWeeks: 8,
    budgetTier: 'low',
    description: 'Calorie-surplus diet using rice, dal, potatoes, and homemade snacks.',
    dietPreference: 'mixed',
    level: 'beginner',
    dailyMeals: baseMeals.low,
  },
  {
    title: 'Pure bulking – high budget (non-veg + whey, creatine)',
    slug: 'pure-bulking-high-budget-nonveg-whey-creatine',
    goalType: 'pure_bulking',
    withSupplements: true,
    withSteroids: false,
    durationWeeks: 12,
    budgetTier: 'high',
    description:
      'High-protein Indian non-veg bulk with chicken, eggs, paneer, whey protein, and creatine.',
    dietPreference: 'non_veg',
    level: 'intermediate',
    dailyMeals: baseMeals.low,
  },
  {
    title: 'Bodybuilding cutting – medium budget with steroid advisory',
    slug: 'bodybuilding-cutting-medium-budget-steroid-advisory',
    goalType: 'cutting',
    withSupplements: true,
    withSteroids: true,
    durationWeeks: 12,
    budgetTier: 'medium',
    description:
      'Bodybuilding-style cutting diet with whey, fish oil, and optional steroid cycles (NOT recommended).',
    notes:
      'Steroid use has serious health risks and legal implications. This plan is informational only. Always consult a qualified doctor before any PED use.',
    dietPreference: 'mixed',
    level: 'advanced',
    dailyMeals: baseMeals.low,
  },
];

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await DietPlan.deleteMany({});
    await DietPlan.insertMany(samplePlans);
    console.log('Seeded diet plans:', samplePlans.length);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();

