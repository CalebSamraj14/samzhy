import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

const PlansPage = () => {
  const [plans, setPlans] = useState([]);
  const [filters, setFilters] = useState({ goalType: '', budgetTier: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const params = {};
        if (filters.goalType) params.goalType = filters.goalType;
        if (filters.budgetTier) params.budgetTier = filters.budgetTier;
        const { data } = await api.get('/diets', { params });
        setPlans(data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [filters]);

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        All diet plans
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <TextField
          name="goalType"
          label="Goal"
          select
          size="small"
          value={filters.goalType}
          onChange={handleChange}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="weight_gain">Weight gain</MenuItem>
          <MenuItem value="weight_loss">Weight loss</MenuItem>
          <MenuItem value="fat_loss">Fat loss</MenuItem>
          <MenuItem value="body_building">Body building</MenuItem>
          <MenuItem value="mens_physique">Mens Physique</MenuItem>
          <MenuItem value="pure_bulking">Pure bulking</MenuItem>
          <MenuItem value="cutting">Cutting phase</MenuItem>
        </TextField>
        <TextField
          name="budgetTier"
          label="Budget"
          select
          size="small"
          value={filters.budgetTier}
          onChange={handleChange}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
      </Box>
      <Grid container spacing={2}>
        {plans.map((plan) => (
          <Grid key={plan._id} item xs={12} md={4}>
            <Card>
              <CardActionArea onClick={() => navigate(`/plans/${plan.slug}`)}>
                <CardContent>
                  <Typography variant="h6">{plan.title}</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                    <Chip label={plan.goalType} size="small" />
                    <Chip label={plan.budgetTier} size="small" />
                    {plan.withSupplements && <Chip label="Supplements" size="small" />}
                    {plan.withSteroids && (
                      <Chip label="Steroid advisory" size="small" color="error" />
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {plan.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PlansPage;

