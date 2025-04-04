import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState();

  async function getWeatherDataLocation(lat, lon) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e7056fa76f6a6b7d8be7d23179c66858`;
    const response = await fetch(url);
    let data = await response.json();

    console.log("response : ", response);
    console.log("response.json() : ", data);

    if (data) {
      setData(data);
    }
  }

  const getCurrentLocation = () => {
    console.log("getCurrentLocation 함수 시작");
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
    getCurrentLocation();
  }, []);

  useEffect(() => {
    console.log("data : ", data);
  }, [data]);

  return (
    <>
      <div className="wholeContainer">
        <div className="innerBox">
          {/* 날씨 박스 */}
          <div className="weatherBox">
            <div>{data.name}</div>
            <div>
              {(((data.main.temp - 32) * 5) / 9).toFixed(1)} &#8451; /{" "}
              {data.main.temp}&#8457;
            </div>
            <div>{data.weather[0].main}</div>
          </div>

          {/* 버튼 박스 */}
          <div className="btnBox">afdasd</div>
        </div>
      </div>
    </>
  );
}

export default App;
