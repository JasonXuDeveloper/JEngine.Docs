import { Navigate } from 'react-router';

export default function RedirectRoot() {
  return <Navigate to="/en" replace />;
}
