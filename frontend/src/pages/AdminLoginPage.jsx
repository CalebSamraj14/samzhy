import { useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@samzyh.local');
  const [password, setPassword] = useState('samzyh123');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('samzyh_admin_token', data.token);
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError('Login failed. Check email/password.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Admin login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained">
            Log in
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminLoginPage;

