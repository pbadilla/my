import Header from '../../components/common/header';
import Footer from '../../components/common/footer';
import Carrousel from '../../components/carousel';

const Home = () => {
  return (
    <>
      <div className="layout">
        <Header />

        <div className="body">
          <div className="content">
            <Carrousel type='top_rated' />
            <Carrousel type='popular' />
            <Carrousel type='upcoming' />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
export default Home;
