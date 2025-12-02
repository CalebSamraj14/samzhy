# TODO: Complete Diet Planner Project with Supplement Separation

## Steps to Complete

1. **Update baseMeals in seedDiets.js**
   - Add supplements arrays to meals in medium and high tiers (e.g., whey, creatine, gainers, BCAA).
   - Ensure low tier has empty supplements arrays.

2. **Modify existing samplePlans**
   - Verify and update supplements in meals based on `withSupplements` boolean.
   - Ensure plans with `withSupplements: false` have no supplements in meals.
   - Enhance plans with `withSupplements: true` to include varied supplements.

3. **Add new sample plans for better separation**
   - Add 2-3 new plans specifically highlighting supplement-heavy diets (e.g., advanced bulking with multiple supplements).

4. **Run the seed script**
   - Execute `node backend/seedDiets.js` to populate the database with updated data.

5. **Check and update frontend components**
   - Review `PlansPage.jsx` and `PlanDetailPage.jsx` to ensure supplements are displayed correctly.
   - Update UI if needed to highlight supplement vs. non-supplement diets.

6. **Test the application**
   - Start backend and frontend servers.
   - Verify supplements appear in the UI for relevant plans.
   - Test filtering or displaying plans based on supplements.

## Progress Tracking
- [ ] Step 1: Update baseMeals
- [ ] Step 2: Modify samplePlans
- [ ] Step 3: Add new sample plans
- [ ] Step 4: Run seed script
- [ ] Step 5: Update frontend if needed
- [ ] Step 6: Test application
