import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema(
  {
    time: String,
    name: String,
    items: [String],
    supplements: [String],
    steroidNotes: String,
  },
  { _id: false }
);

const daySchema = new mongoose.Schema(
  {
    label: String,
    meals: [mealSchema],
  },
  { _id: false }
);

const dietPlanSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    goalType: {
      type: String,
      enum: [
        'weight_gain',
        'weight_loss',
        'fat_loss',
        'body_building',
        'mens_physique',
        'pure_bulking',
        'cutting',
      ],
      required: true,
    },
    withSupplements: { type: Boolean, default: false },
    withSteroids: { type: Boolean, default: false },
    durationWeeks: { type: Number, default: 4 },
    budgetTier: { type: String, enum: ['low', 'medium', 'high'], required: true },
    description: String,
    notes: String,
    indianFoodFocus: { type: Boolean, default: true },
    dietPreference: {
      type: String,
      enum: ['veg', 'non_veg', 'eggetarian', 'mixed'],
      default: 'mixed',
    },
    dailyMeals: [daySchema],
    imageUrl: String,
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  },
  { timestamps: true }
);

const DietPlan = mongoose.model('DietPlan', dietPlanSchema);

export default DietPlan;


