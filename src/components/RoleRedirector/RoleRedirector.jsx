import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

function RoleRedirector({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    switch (user.user_info?.role) {
      case 'master-admin':
        navigate(ROUTES.masterAdminDashboard);
        break;
      case 'owner':
        navigate(ROUTES.adminDashboard);
        break;
      case 'worker':
        navigate(ROUTES.workerDashboard);
        break;
      default:
        navigate(ROUTES.home);
    }
  }, [user, navigate]);

  return null;
}

export default RoleRedirector;
