import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('coordinatorAuth') === 'true';
    if (!isAuthenticated) {
      navigate('/response-coordination');
    }
  }, [navigate]);

  return <>{children}</>;
}