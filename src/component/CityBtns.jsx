import React from "react";

const CityBtns = ({ countries, selectCity, setSelectCity }) => {
  return (
    <div className="btnBox">
      <button
        className={selectCity == "" ? "selected" : null}
        onClick={() => setSelectCity("")}
      >
        Current Location
      </button>
      {countries.map((item) => (
        <button
          className={selectCity == item ? "selected" : null}
          onClick={() => setSelectCity(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default CityBtns;
