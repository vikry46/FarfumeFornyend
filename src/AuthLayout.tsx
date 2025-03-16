import PageTitle from './components/PageTitle';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PageTitle title="Authentication" />
      {children}
    </>
  );
};

export default AuthLayout;
