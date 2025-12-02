import { useEffect, useState } from 'react';
import { Box, Chip, Divider, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import api from '../api/client';

const PlanDetailPage = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/diets/${slug}`);
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [slug]);

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  const { diet, workout } = data;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {diet.title}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        <Chip label={diet.goalType} />
        <Chip label={diet.budgetTier} />
        <Chip label={diet.level} />
        {diet.withSupplements && <Chip label="With supplements" />}
        {!diet.withSupplements && <Chip label="No supplements" />}
        {diet.withSteroids && <Chip label="Steroid advisory" color="error" />}
      </Box>
      {diet.imageUrl && (
        <Box sx={{ mb: 2 }}>
          <img
            src={diet.imageUrl}
            alt={diet.title}
            style={{ maxWidth: '100%', borderRadius: 8 }}
          />
        </Box>
      )}
      <Typography variant="body1" paragraph>
        {diet.description}
      </Typography>
      {diet.notes && (
        <Typography variant="body2" color="text.secondary" paragraph>
          {diet.notes}
        </Typography>
      )}
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" gutterBottom>
        Daily diet (sample week)
      </Typography>
      {diet.dailyMeals?.map((day) => (
        <Box key={day.label} sx={{ mb: 2 }}>
          <Typography variant="subtitle1">{day.label}</Typography>
          {day.meals?.map((meal) => (
            <Box key={meal.name} sx={{ ml: 2, mt: 0.5 }}>
              <Typography variant="body2">
                <strong>{meal.time}</strong> – {meal.name}: {meal.items?.join(', ')}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" gutterBottom>
        Workout plan
      </Typography>
      {workout ? (
        <>
          <Typography variant="body2" color="text.secondary" paragraph>
            {workout.goalDescription}
          </Typography>
          {workout.days?.map((day) => (
            <Box key={day.label} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">{day.label}</Typography>
              {day.exercises?.map((ex) => (
                <Box key={ex.name} sx={{ ml: 2 }}>
                  <Typography variant="body2">
                    {ex.name} – {ex.sets} sets x {ex.reps} reps (rest {ex.rest})
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </>
      ) : (
        <Typography variant="body2">Workout plan coming soon.</Typography>
      )}
    </Box>
  );
};

export default PlanDetailPage;

