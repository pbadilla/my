import { Link, useRouteError } from "react-router-dom";
import img from "@images/error404.jpg";
import Layout from "@components/layout/Layout";

interface RouteError {
  status?: number;
  message?: string;
}

const NotFound = () => {
  const error = useRouteError() as RouteError;

  return (
    <Layout hasHeroSection={false} hasBackButton={true}>
      <div>
        <div>
          <img src={img} alt="not found" />
          <h3>Ohh! page not found</h3>
          <p>we can't seem to find the page you are looking for</p>
          <Link to="/dashboard">back home</Link>
        </div>
      </div>
    </Layout>
  );
};
export default NotFound;
