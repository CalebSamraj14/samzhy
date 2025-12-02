import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema(
  {
    name: String,
    sets: Number,
    reps: String,
    rest: String,
    notes: String,
  },
  { _id: false }
);

const workoutDaySchema = new mongoose.Schema(
  {
    label: String,
    exercises: [exerciseSchema],
  },
  { _id: false }
);

const workoutPlanSchema = new mongoose.Schema(
  {
    dietPlanId: { type: mongoose.Schema.Types.ObjectId, ref: 'DietPlan', required: true },
    durationWeeks: { type: Number, default: 4 },
    splitType: String,
    goalDescription: String,
    days: [workoutDaySchema],
  },
  { timestamps: true }
);

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);

export default WorkoutPlan;


