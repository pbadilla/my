import Layout from "@components/layout/Layout";

interface ErrorPageProps {
  message?: string;
}

const ErrorPage = ({ message }: ErrorPageProps) => {
  return (
    <Layout hasHeroSection={false} hasBackButton={true}>
      <div>
        <h3>{message}</h3>
      </div>
    </Layout>
  );
};
export default ErrorPage;
