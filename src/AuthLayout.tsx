import PageTitle from './components/PageTitle';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <PageTitle title="Authentication" />
      <Outlet />
    </>
  );
};

export default AuthLayout;
