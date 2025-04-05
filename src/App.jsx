import { useEffect, useState } from "react";
import "./App.css";
import CityBtns from "./component/CityBtns";
import { ClipLoader } from "react-spinners";

function App() {
  const [data, setData] = useState();
  const countries = ["Paris", "New York", "Seoul", "Japan"];
  const [selectCity, setSelectCity] = useState("");
  const [loading, setLoading] = useState(false);

  async function getWeatherDataLocation(lat, lon) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e7056fa76f6a6b7d8be7d23179c66858`;
    setLoading(true);
    const response = await fetch(url);
    let data = await response.json();

    console.log("response : ", response);
    console.log("response.json() : ", data);

    if (data) {
      setData(data);
      setLoading(false);
    }
  }

  const getCurrentLocation = () => {
    console.log("getCurrentLocation 함수 시작");
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("position : ", position);

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        console.log("lat : ", lat);
        console.log("lon : ", lon);

        if (lat && lon) {
          getWeatherDataLocation(lat, lon);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  };

  useEffect(() => {
    console.log("use Effect 실행");
    if (selectCity == "") {
      getCurrentLocation();
    } else {
      getWeatherDataCity();
    }
  }, [selectCity]);

  async function getWeatherDataCity() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectCity}&appid=e7056fa76f6a6b7d8be7d23179c66858&units=metric`;
    setLoading(true);
    const response = await fetch(url);
    let data = await response.json();

    console.log("response : ", response);
    console.log("response.json() : ", data);

    if (data) {
      setData(data);
      setLoading(false);
    }
  }

  return (
    <>
      <div className="wholeContainer">
        <div className="innerBox">
          {/* 날씨 박스 */}
          <div className="weatherBox">
            <ClipLoader
              color="#02c39a"
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            {!loading && (
              <>
                <div>{data?.name}</div>
                <div>
                  {(((data?.main.temp - 32) * 5) / 9).toFixed(1)} &#8451; /{" "}
                  {data?.main.temp}&#8457;
                </div>
                <div>{data?.weather[0].main}</div>
              </>
            )}
          </div>

          {/* 버튼 박스 */}
          <CityBtns
            countries={countries}
            selectCity={selectCity}
            setSelectCity={setSelectCity}
          />
        </div>
      </div>
    </>
  );
}

export default App;
