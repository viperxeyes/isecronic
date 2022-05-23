import React, { useState } from "react";

import {
  WiDaySunny,
  WiMoonWaxingCrescent4,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloudy,
  WiCloud,
  WiDayShowers,
  WiNightAltShowers,
  WiDayRain,
  WiNightAltRain,
  WiDayLightning,
  WiNightAltLightning,
  WiDaySnow,
  WiNightAltSnow,
  WiDayFog,
  WiNightFog,
} from "react-icons/wi";
const WeatherContent = () => {
  //openWatherMap API function
  //   const getWeather = async () => {
  //     navigator.geolocation.getCurrentPosition(async (position) => {
  //       const lat = position.coords.latitude;
  //       const long = position.coords.longitude;
  //       const api_call = await fetch(
  //         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=134fa6c56b2b59752a740898e4522412`
  //       );
  //       const data = await api_call.json();
  //       console.log(data);
  //       setOutdoorWeather(data);
  //     });
  //   };

  const weather = {
    coord: {
      lon: 31.1825,
      lat: 30.0577,
    },
    weather: [
      {
        id: 801,
        main: "Clouds",
        description: "few clouds",
        icon: "02n",
      },
    ],
    base: "stations",
    main: {
      temp: 20.59,
      feels_like: 19.88,
      temp_min: 20.24,
      temp_max: 20.59,
      pressure: 1014,
      humidity: 45,
      sea_level: 1014,
      grnd_level: 1011,
    },
    visibility: 10000,
    wind: {
      speed: 2.83,
      deg: 304,
      gust: 3.98,
    },
    clouds: {
      all: 12,
    },
    dt: 1653177204,
    sys: {
      type: 2,
      id: 2046660,
      country: "EG",
      sunrise: 1653188296,
      sunset: 1653237952,
    },
    timezone: 7200,
    id: 360995,
    name: "Giza",
    cod: 200,
  };

  const getWeatherIcon = (icon, size) => {
    if (icon === "01d") {
      return <WiDaySunny className={`text-yellow-200 ${size}`} />;
    }
    if (icon === "01n") {
      return <WiMoonWaxingCrescent4 className={`text-slate-300 ${size}`} />;
    }
    if (icon === "02d") {
      return <WiDayCloudy className="text-yellow-200 w-10 h-10 " />;
    }
    if (icon === "02n") {
      return <WiNightAltCloudy className={`text-slate-300 ${size}`} />;
    }
    if (icon === "03d") {
      return <WiCloud className={`text-yellow-200 ${size}`} />;
    }
    if (icon === "03n") {
      return <WiCloud className={`text-slate-300 ${size}`} />;
    }
    if (icon === "04d") {
      return <WiCloudy className={`text-yellow-200 ${size}`} />;
    }
    if (icon === "04n") {
      return <WiCloudy className={`text-slate-300 ${size}`} />;
    }
    if (icon === "09d") {
      return <WiDayShowers className={`text-yellow-200 ${size}`} />;
    }
    if (icon === "09n") {
      return <WiNightAltShowers className={`text-slate-300 ${size}`} />;
    }
    if (icon === "10d") {
      return <WiDayRain className={`text-yellow-200 ${size}`} />;
    }
    if (icon === "10n") {
      return <WiNightAltRain className={`text-slate-300 ${size}`} />;
    }
    if (icon === "11d") {
      return <WiDayLightning className={`text-yellow-200 ${size}`} />;
    }
    if (icon === "11n") {
      return <WiNightAltLightning className={`text-slate-300 ${size}`} />;
    }
    if (icon === "13d") {
      return <WiDaySnow className={`text-yellow-200 ${size}`} />;
    }
    if (icon === "13n") {
      return <WiNightAltSnow className={`text-slate-300 ${size}`} />;
    }
    if (icon === "50d") {
      return <WiDayFog className={`text-yellow-200 ${size}`} />;
    }
    if (icon === "50n") {
      return <WiNightFog className={`text-slate-300 ${size}`} />;
    }
  };

  const [outdoorWeather] = useState(weather);
  return (
    <div className="bg-slate-800/40 px-3 py-1 rounded-xl grid grid-cols-1 lg:grid-cols-2 grid-rows-1 gap-x-1 md:gap-y-2">
      <div className="space-y-3">
        <h1 className="text-3xl "> Hi ,Dia !</h1>
        <p className="text-sm text-blue-300/70">
          Welcome home! The weather outside is{" "}
          <span className="text-slate-300 font-bold">
            {outdoorWeather.weather[0].description}
          </span>
          &nbsp;, please let me know if you want to change anything.
        </p>
        {console.log("weather")}
        <div className="flex flex-col">
          <div className="flex space-x-2 items-center">
            <span>{Math.floor(outdoorWeather.main.temp)} &deg; C</span>
            {getWeatherIcon(outdoorWeather.weather[0].icon, "w-10 h-10")}
          </div>
          <span className="text-sm">Outdoor temperature</span>
          <span className="text-sm text-slate-400">
            {outdoorWeather.weather[0].description}
          </span>
        </div>
      </div>

      <div className="w-full flex    px-5 border-t lg:border-l lg:border-t-0 border-slate-400/20 ">
        <div className="flex justify-between w-full ">
          <div className="flex flex-col justify-evenly ">
            <span className=" text-3xl font-bold ">
              {outdoorWeather.weather[0].main}
            </span>
            <div className="flex items-center">
              <span className="text-5xl font-bold">
                {Math.floor(outdoorWeather.main.temp)}
                <span className="font-normal">&deg;C</span>
              </span>
            </div>
            <span className=" text-xl ">
              {new Intl.DisplayNames(["en"], { type: "region" }).of(
                outdoorWeather.sys.country
              )}
              ,&nbsp;{outdoorWeather.name}
            </span>
          </div>

          <div className="flex flex-col  items-center justify-center">
            <div>Wind Speed:{outdoorWeather.wind.speed}</div>
            {getWeatherIcon(outdoorWeather.weather[0].icon, "w-24 h-24")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherContent;
