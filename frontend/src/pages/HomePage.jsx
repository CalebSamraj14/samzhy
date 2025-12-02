import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

const defaultValues = {
  age: '',
  gender: 'male',
  weight: '',
  height: '',
  goal: 'weight_loss',
  activityLevel: 'moderate',
  dietPreference: 'mixed',
  medicalFlags: {
    diabetes: false,
    hypertension: false,
    heart: false,
  },
};

const HomePage = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, setValue } = useForm({ defaultValues });

  const onSubmit = async (values) => {
    try {
      const { data } = await api.post('/recommendations', values);
      navigate('/recommendations', { state: { input: values, plans: data } });
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert('Could not get recommendations. Please try again.');
      console.error(err);
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Typography variant="h3" gutterBottom>
          samzyh diets
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Indian-focused diet and workout plans for your goals.
        </Typography>
        <Typography variant="body1" paragraph>
          Answer a few questions and we&apos;ll suggest three diet plans tailored to your goal:
          low budget, medium budget, and high budget.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Get your plan
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <TextField {...field} type="number" label="Age" required fullWidth />
              )}
            />
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Gender" select fullWidth>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="weight"
              control={control}
              render={({ field }) => (
                <TextField {...field} type="number" label="Weight (kg)" required fullWidth />
              )}
            />
            <Controller
              name="height"
              control={control}
              render={({ field }) => (
                <TextField {...field} type="number" label="Height (cm)" required fullWidth />
              )}
            />
            <Controller
              name="goal"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Goal" select fullWidth>
                  <MenuItem value="weight_gain">Weight gain</MenuItem>
                  <MenuItem value="weight_loss">Weight loss</MenuItem>
                  <MenuItem value="fat_loss">Fat loss</MenuItem>
                  <MenuItem value="body_building">Body building</MenuItem>
                  <MenuItem value="mens_physique">Mens Physique</MenuItem>
                  <MenuItem value="pure_bulking">Pure bulking</MenuItem>
                  <MenuItem value="cutting">Cutting phase</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="activityLevel"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Activity level" select fullWidth>
                  <MenuItem value="sedentary">Sedentary</MenuItem>
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="moderate">Moderate</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="athlete">Athlete</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="dietPreference"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Diet preference" select fullWidth>
                  <MenuItem value="veg">Vegetarian</MenuItem>
                  <MenuItem value="eggetarian">Eggetarian</MenuItem>
                  <MenuItem value="non_veg">Non-veg</MenuItem>
                  <MenuItem value="mixed">Mixed</MenuItem>
                </TextField>
              )}
            />
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Medical conditions (if any)
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {[
                ['diabetes', 'Diabetes'],
                ['hypertension', 'High BP'],
                ['heart', 'Heart issues'],
              ].map(([key, label]) => (
                <Button
                  key={key}
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    setValue(`medicalFlags.${key}`, (prev) => !prev, {
                      shouldDirty: true,
                    })
                  }
                >
                  {label}
                </Button>
              ))}
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Get recommendations
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default HomePage;

