import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

const AdminDashboardPage = () => {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const { data } = await api.get('/diets');
      setPlans(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm('Delete this diet plan?')) return;
    try {
      await api.delete(`/diets/${id}`);
      load();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Admin dashboard</Typography>
        <Button variant="contained" onClick={() => navigate('/admin/diets/new')}>
          New diet plan
        </Button>
      </Box>
      <Paper>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Goal</TableCell>
              <TableCell>Budget</TableCell>
              <TableCell>Supplements</TableCell>
              <TableCell>Steroids</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan._id}>
                <TableCell>{plan.title}</TableCell>
                <TableCell>{plan.goalType}</TableCell>
                <TableCell>{plan.budgetTier}</TableCell>
                <TableCell>{plan.withSupplements ? 'Yes' : 'No'}</TableCell>
                <TableCell>{plan.withSteroids ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => navigate(`/admin/diets/${plan._id}/edit`)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(plan._id)}>
                    <Delete />
                  </IconButton>
                  <Button
                    size="small"
                    onClick={() => navigate(`/admin/workouts/${plan._id}/edit`)}
                  >
                    Workout
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default AdminDashboardPage;

