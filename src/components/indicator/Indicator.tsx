import React from "react";
import "@styles/Indicator.scss";

interface Movie {
  id: number;
  original_title: string;
}

interface IndicatorProps {
  activeIndex: number;
  content: Movie[];
  clickFunction: (index: number) => void;
}

const Indicator: React.FC<IndicatorProps> = ({ activeIndex, content, clickFunction }) => {
  return (
    <ul className="indicators">
      {content.map((movie, index) => (
        <li key={movie.id}>
          <a
            className={index === activeIndex ? "indicator indicator--active" : "indicator"}
            title={movie.original_title}
            onClick={() => clickFunction(index)} // Pass the index to the click function
          />
        </li>
      ))}
    </ul>
  );
};

export default Indicator;
