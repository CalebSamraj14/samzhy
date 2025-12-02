import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/client';

const AdminWorkoutFormPage = () => {
  const { dietId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    dietPlanId: dietId,
    durationWeeks: 4,
    splitType: '',
    goalDescription: '',
    days: [],
  });

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/workouts/${dietId}`);
        setForm(data);
      } catch {
        // ok if not existing yet
      }
    };
    load();
  }, [dietId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/workouts', form);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      // eslint-disable-next-line no-alert
      alert('Failed to save workout');
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Workout plan for diet
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Duration (weeks)"
          name="durationWeeks"
          type="number"
          value={form.durationWeeks}
          onChange={handleChange}
        />
        <TextField
          label="Split type"
          name="splitType"
          value={form.splitType}
          onChange={handleChange}
        />
        <TextField
          label="Goal description"
          name="goalDescription"
          multiline
          minRows={3}
          value={form.goalDescription}
          onChange={handleChange}
        />
        <Typography variant="body2" color="text.secondary">
          For now, you can describe the per-day exercises in text inside goal description. You can
          extend this form later to fully edit days/exercises.
        </Typography>
        <Button type="submit" variant="contained">
          Save workout
        </Button>
      </Box>
    </Paper>
  );
};

export default AdminWorkoutFormPage;

