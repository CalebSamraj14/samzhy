import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage';
import PlansPage from './pages/PlansPage';
import PlanDetailPage from './pages/PlanDetailPage';
import RecommendationsPage from './pages/RecommendationsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminDietFormPage from './pages/AdminDietFormPage';
import AdminWorkoutFormPage from './pages/AdminWorkoutFormPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2e7d32',
    },
    secondary: {
      main: '#ff9800',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/plans/:slug" element={<PlanDetailPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/diets/new" element={<AdminDietFormPage />} />
          <Route path="/admin/diets/:id/edit" element={<AdminDietFormPage />} />
          <Route path="/admin/workouts/:dietId/edit" element={<AdminWorkoutFormPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
