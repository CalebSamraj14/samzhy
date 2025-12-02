import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const PlanCard = ({ label, tier, plan }) => {
  const navigate = useNavigate();

  if (!plan) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6">{label}</Typography>
          <Typography variant="body2" color="text.secondary">
            No matching plan found yet. Please check back later.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/plans/${plan.slug}`)}>
        <CardContent>
          <Typography variant="h6">{label}</Typography>
          <Chip label={tier} size="small" sx={{ mb: 1 }} />
          <Typography variant="subtitle1">{plan.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {plan.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const RecommendationsPage = () => {
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return (
      <Box>
        <Typography variant="h6">No recommendations yet</Typography>
        <Typography variant="body2">Go to the home page and fill the form first.</Typography>
      </Box>
    );
  }

  const { plans } = data;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Your recommended plans
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <PlanCard label="Low budget" tier="low" plan={plans.low} />
        </Grid>
        <Grid item xs={12} md={4}>
          <PlanCard label="Medium budget" tier="medium" plan={plans.medium} />
        </Grid>
        <Grid item xs={12} md={4}>
          <PlanCard label="High budget" tier="high" plan={plans.high} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecommendationsPage;

