import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/client';

const emptyDay = (label) => ({ label, meals: [] });

const AdminDietFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    goalType: 'weight_loss',
    withSupplements: false,
    withSteroids: false,
    durationWeeks: 4,
    budgetTier: 'low',
    description: '',
    notes: '',
    dietPreference: 'mixed',
    level: 'beginner',
    imageUrl: '',
    dailyMeals: [emptyDay('Day 1'), emptyDay('Day 2'), emptyDay('Day 3')],
  });

  useEffect(() => {
    const load = async () => {
      if (!isEdit) return;
      try {
        const { data } = await api.get(`/diets/${id}`);
        setForm(data.diet);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/diets/${id}`, form);
      } else {
        await api.post('/diets', form);
      }
      navigate('/admin');
    } catch (err) {
      console.error(err);
      // eslint-disable-next-line no-alert
      alert('Failed to save diet');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const { data } = await api.post('/uploads/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm((prev) => ({ ...prev, imageUrl: data.url }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {isEdit ? 'Edit diet plan' : 'New diet plan'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Slug"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              select
              label="Goal"
              name="goalType"
              value={form.goalType}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            >
              <MenuItem value="weight_gain">Weight gain</MenuItem>
              <MenuItem value="weight_loss">Weight loss</MenuItem>
              <MenuItem value="fat_loss">Fat loss</MenuItem>
              <MenuItem value="body_building">Body building</MenuItem>
              <MenuItem value="mens_physique">Mens Physique</MenuItem>
              <MenuItem value="pure_bulking">Pure bulking</MenuItem>
              <MenuItem value="cutting">Cutting phase</MenuItem>
            </TextField>
            <TextField
              select
              label="Budget tier"
              name="budgetTier"
              value={form.budgetTier}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </TextField>
            <TextField
              select
              label="Diet preference"
              name="dietPreference"
              value={form.dietPreference}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            >
              <MenuItem value="veg">Vegetarian</MenuItem>
              <MenuItem value="eggetarian">Eggetarian</MenuItem>
              <MenuItem value="non_veg">Non-veg</MenuItem>
              <MenuItem value="mixed">Mixed</MenuItem>
            </TextField>
            <TextField
              label="Duration (weeks)"
              name="durationWeeks"
              type="number"
              value={form.durationWeeks}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              select
              label="Level"
              name="level"
              value={form.level}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            >
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="advanced">Advanced</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={3}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Notes / disclaimers"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={3}
              sx={{ mb: 2 }}
            />
            <Button variant="outlined" component="label" sx={{ mb: 1 }}>
              Upload image
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </Button>
            {form.imageUrl && (
              <Box sx={{ mt: 1 }}>
                <img
                  src={form.imageUrl}
                  alt="Preview"
                  style={{ maxWidth: '100%', borderRadius: 8 }}
                />
              </Box>
            )}
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AdminDietFormPage;

