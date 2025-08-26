import "@styles/noPage.scss";

import noFavouritesImg from "@images/noFavourites.png";


const NoPage = () => {
  return (
    <div className="no-page" data-testid="no-page">
      <div className="no-page-content">
        <h1 className="no-page-title">Ops!!!</h1>
        <img
          src={noFavouritesImg}
          alt="No Favourites added"
          className="no-page-image"
        />
        <p className="no-page-text">
          Looks like this scene got lost in the cutting room floor 🎥
        </p>
      </div>
    </div>
  );
};

export default NoPage;
