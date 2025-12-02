import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MONGO_URI } from './config.js';
import DietPlan from './models/DietPlan.js';
import WorkoutPlan from './models/WorkoutPlan.js';

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
          time: '10:00 am',
          name: 'Mid-morning',
          items: ['Sprouted moong salad', 'buttermilk'],
        },
        {
          time: '1:00 pm',
          name: 'Lunch',
          items: ['1.5 cups rice', 'sambar', 'curd', 'mixed veg sabzi'],
        },
        {
          time: '5:30 pm',
          name: 'Evening snack',
          items: ['Roasted chana', 'black tea without sugar'],
        },
        {
          time: '8:00 pm',
          name: 'Dinner',
          items: ['2 chapati', 'chana masala', 'salad'],
        },
      ],
    },
  ],
  medium: [
    {
      label: 'Day 1',
      meals: [
        {
          time: '7:00 am',
          name: 'Breakfast',
          items: ['2 oats idlis', 'sambar', '1 boiled egg'],
        },
        {
          time: '10:30 am',
          name: 'Snack',
          items: ['Handful almonds & walnuts', 'green tea'],
        },
        {
          time: '1:30 pm',
          name: 'Lunch',
          items: ['2 phulkas', 'rajma curry', 'salad', 'curd'],
        },
        {
          time: '5:00 pm',
          name: 'Pre-workout',
          items: ['Banana', 'black coffee'],
        },
        {
          time: '8:00 pm',
          name: 'Post-workout / Dinner',
          items: ['Whey shake with water', '1 cup upma with veggies'],
        },
      ],
    },
  ],
  high: [
    {
      label: 'Day 1',
      meals: [
        {
          time: '6:30 am',
          name: 'Breakfast',
          items: ['Paneer bhurji', '2 multigrain rotis', 'orange juice (no sugar)'],
        },
        {
          time: '10:00 am',
          name: 'Snack',
          items: ['Greek yogurt', 'berries', 'mixed nuts'],
        },
        {
          time: '1:30 pm',
          name: 'Lunch',
          items: ['Brown rice', 'grilled chicken tikka', 'dal tadka', 'salad'],
        },
        {
          time: '5:00 pm',
          name: 'Pre-workout',
          items: ['Banana', 'whey shake', 'black coffee'],
        },
        {
          time: '9:00 pm',
          name: 'Dinner',
          items: ['Fish curry', '2 jowar rotis', 'stir-fried vegetables'],
        },
      ],
    },
  ],
};

const samplePlans = [
  // Weight loss – low / medium / high
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
    imageUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200',
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
    imageUrl:
      'https://images.pexels.com/photos/4109996/pexels-photo-4109996.jpeg?auto=compress&cs=tinysrgb&w=1200',
    dailyMeals: baseMeals.medium,
  },
  {
    title: 'Weight loss – high budget (lean meats & premium foods)',
    slug: 'weight-loss-high-budget-premium',
    goalType: 'weight_loss',
    withSupplements: true,
    withSteroids: false,
    durationWeeks: 12,
    budgetTier: 'high',
    description:
      'Structured fat-loss diet using high-quality protein sources, Greek yogurt, nuts, and premium ingredients.',
    dietPreference: 'mixed',
    level: 'intermediate',
    imageUrl:
      'https://images.pexels.com/photos/1438679/pexels-photo-1438679.jpeg?auto=compress&cs=tinysrgb&w=1200',
    dailyMeals: baseMeals.high,
  },
  // Weight gain – low / medium / high
  {
    title: 'Weight gain – low budget (Indian home foods)',
    slug: 'weight-gain-low-budget-indian-home',
    goalType: 'weight_gain',
    withSupplements: false,
    withSteroids: false,
    durationWeeks: 8,
    budgetTier: 'low',
    description: 'Calorie-surplus diet using rice, dal, potatoes, groundnut chutney, and homemade snacks.',
    dietPreference: 'mixed',
    level: 'beginner',
    imageUrl:
      'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1200',
    dailyMeals: baseMeals.low,
  },
  {
    title: 'Weight gain – medium budget (eggs, paneer, whey)',
    slug: 'weight-gain-medium-budget-eggs-paneer-whey',
    goalType: 'weight_gain',
    withSupplements: true,
    withSteroids: false,
    durationWeeks: 10,
    budgetTier: 'medium',
    description:
      'Surplus calories with eggs, paneer, ghee, and whey protein to support lean weight gain for skinny individuals.',
    dietPreference: 'eggetarian',
    level: 'intermediate',
    imageUrl:
      'https://images.pexels.com/photos/3731474/pexels-photo-3731474.jpeg?auto=compress&cs=tinysrgb&w=1200',
    dailyMeals: baseMeals.medium,
  },
  {
    title: 'Weight gain – high budget (non-veg muscle gain)',
    slug: 'weight-gain-high-budget-non-veg',
    goalType: 'weight_gain',
    withSupplements: true,
    withSteroids: false,
    durationWeeks: 12,
    budgetTier: 'high',
    description:
      'Muscle-focused gain diet with 5–6 meals including chicken, fish, paneer, whey protein, and nuts.',
    dietPreference: 'non_veg',
    level: 'intermediate',
    imageUrl:
      'https://images.pexels.com/photos/718742/pexels-photo-718742.jpeg?auto=compress&cs=tinysrgb&w=1200',
    dailyMeals: baseMeals.high,
  },
  // Pure bulking
  {
    title: 'Pure bulking – low budget (high carb desi bulk)',
    slug: 'pure-bulking-low-budget-desi',
    goalType: 'pure_bulking',
    withSupplements: false,
    withSteroids: false,
    durationWeeks: 12,
    budgetTier: 'low',
    description: 'High-carb Indian bulk using rice, roti, potatoes, and lentils with good protein.',
    dietPreference: 'mixed',
    level: 'beginner',
    imageUrl:
      'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=1200',
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
    imageUrl:
      'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=1200',
    dailyMeals: baseMeals.high,
  },
  // Cutting / fat loss / bodybuilding / mens physique
  {
    title: 'Cutting phase – low budget (home-style fat loss)',
    slug: 'cutting-low-budget-home-style',
    goalType: 'cutting',
    withSupplements: false,
    withSteroids: false,
    durationWeeks: 8,
    budgetTier: 'low',
    description: 'Home-style low budget cutting diet with dal, roti, sabzi, and portion control.',
    dietPreference: 'veg',
    level: 'beginner',
    imageUrl:
      'https://images.pexels.com/photos/1438535/pexels-photo-1438535.jpeg?auto=compress&cs=tinysrgb&w=1200',
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
    imageUrl:
      'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1200',
    dailyMeals: baseMeals.medium,
  },
  {
    title: 'Mens Physique – high budget stage prep (PED advisory)',
    slug: 'mens-physique-high-budget-stage-prep',
    goalType: 'mens_physique',
    withSupplements: true,
    withSteroids: true,
    durationWeeks: 16,
    budgetTier: 'high',
    description:
      'Competition-focused plan with high protein, strict carb cycling and heavy reliance on supplements.',
    notes:
      'Performance-enhancing drugs carry serious risks. This plan is purely educational. Always consult a sports doctor before any PED consideration.',
    dietPreference: 'non_veg',
    level: 'advanced',
    imageUrl:
      'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1200',
    dailyMeals: baseMeals.high,
  },
];

const createWorkoutForDiet = (diet) => {
  const commonDays = [
    {
      label: 'Day 1 – Push',
      exercises: [
        { name: 'Barbell bench press', sets: 4, reps: '6–8', rest: '90 sec' },
        { name: 'Incline dumbbell press', sets: 3, reps: '8–10', rest: '75 sec' },
        { name: 'Overhead press', sets: 3, reps: '8–10', rest: '75 sec' },
        { name: 'Cable fly', sets: 3, reps: '12–15', rest: '60 sec' },
        { name: 'Triceps pushdown', sets: 3, reps: '10–12', rest: '60 sec' },
      ],
    },
    {
      label: 'Day 2 – Pull',
      exercises: [
        { name: 'Deadlift', sets: 3, reps: '5', rest: '120 sec' },
        { name: 'Lat pulldown', sets: 3, reps: '8–10', rest: '75 sec' },
        { name: 'Seated cable row', sets: 3, reps: '8–10', rest: '75 sec' },
        { name: 'Face pull', sets: 3, reps: '12–15', rest: '60 sec' },
        { name: 'Biceps curl', sets: 3, reps: '10–12', rest: '60 sec' },
      ],
    },
    {
      label: 'Day 3 – Legs',
      exercises: [
        { name: 'Back squat', sets: 4, reps: '6–8', rest: '90 sec' },
        { name: 'Leg press', sets: 3, reps: '10–12', rest: '75 sec' },
        { name: 'Romanian deadlift', sets: 3, reps: '8–10', rest: '75 sec' },
        { name: 'Leg curl', sets: 3, reps: '12–15', rest: '60 sec' },
        { name: 'Standing calf raise', sets: 3, reps: '15', rest: '45 sec' },
      ],
    },
  ];

  let goalDescription = '';
  switch (diet.goalType) {
    case 'weight_loss':
    case 'fat_loss':
    case 'cutting':
      goalDescription =
        '4–5 days/week strength training with 2–3 moderate cardio sessions (walking, cycling). Focus on progressive overload while staying in a calorie deficit.';
      break;
    case 'weight_gain':
    case 'pure_bulking':
      goalDescription =
        '4–6 days/week strength training with focus on heavy compound lifts and minimal steady-state cardio. Aim for progressive overload every week.';
      break;
    case 'body_building':
    case 'mens_physique':
      goalDescription =
        'High-volume bodybuilding split with emphasis on muscle groups, posing practice, and periodized phases (volume, intensification, peaking).';
      break;
    default:
      goalDescription = 'Balanced strength training program 3–5 days/week.';
  }

  return {
    dietPlanId: diet._id,
    durationWeeks: diet.durationWeeks,
    splitType: 'Push / Pull / Legs',
    goalDescription,
    days: commonDays,
  };
};

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await DietPlan.deleteMany({});
    await WorkoutPlan.deleteMany({});

    const createdDiets = await DietPlan.insertMany(samplePlans);
    const workouts = createdDiets.map((diet) => createWorkoutForDiet(diet));
    await WorkoutPlan.insertMany(workouts);

    console.log('Seeded diet plans:', createdDiets.length);
    console.log('Seeded workout plans:', workouts.length);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();

