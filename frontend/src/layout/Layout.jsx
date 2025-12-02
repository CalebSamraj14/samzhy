import { AppBar, Box, Container, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
          >
            samzyh diets
          </Typography>
          <Button color="inherit" onClick={() => navigate('/plans')}>
            Plans
          </Button>
          <Button color="inherit" onClick={() => navigate('/admin/login')}>
            Admin
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ flex: 1, py: 4 }}>{children}</Container>
      <Box component="footer" sx={{ py: 2, textAlign: 'center', bgcolor: '#f5f5f5' }}>
        <Typography variant="body2" color="text.secondary">
          For educational purposes only. Always consult a doctor or qualified nutritionist,
          especially before using supplements or steroids.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;


