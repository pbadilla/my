import { Link, useRouteError } from 'react-router-dom';
import img from '@images/error404.jpg';

interface RouteError {
  status?: number;
  message?: string;
}


const Error = () => {
  const error = useRouteError() as RouteError;

  console.error(error);

  if (error?.status === 404) {
    return (
      <div>
        <img src={img} alt='not found' />
        <h3>Ohh! page not found</h3>
        <p>we can't seem to find the page you are looking for</p>
        <Link to='/dashboard'>back home</Link>
      </div>
    );
  }
  return (
      <div>
        <h3>something went wrong</h3>
      </div>
  );
};
export default Error;
