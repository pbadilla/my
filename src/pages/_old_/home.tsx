import Carrousel from "@components/carousel";
import Footer from "@components/common/footer";
import Header from "@components/common/header";

const home = () => {
  return (
    <>
      <div className="layout" data-testid="home">
        <Header />

        <div className="body" data-testid="home-body">
          <div className="content">
            <Carrousel type="top_rated" />
            <Carrousel type="popular" />
            <Carrousel type="upcoming" />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
export default home;
