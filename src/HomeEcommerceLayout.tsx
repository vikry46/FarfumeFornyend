import PageTitle from './components/PageTitle';

const HomeEcommerceLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <>
        <PageTitle title="Home Ecomerse" />
        {children}
      </>
    );
  };
  
  export default HomeEcommerceLayout;
  