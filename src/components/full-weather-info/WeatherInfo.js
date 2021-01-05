import React from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartActive } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeart } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import {
  removeFromFavAC,
  addCityAC,
  addToFavAC,
} from "../../redux/reducers/citiesReducer";
import { addCityToFav, removeCityFromFav } from "../../api/api";
import { useDispatch } from "react-redux";

function WeatherInfo(props) {
  const defCities = useSelector((state) => state.Cities.cities);
  const weather = props.location.state.weather;
  const dispatch = useDispatch();

  const isActive = (id) => {
    const city = defCities.find((v) => v.id === id);
    return city ? city.isActive : false;
  };

  const onAddToFavourites = (data) => {
    addCityToFav(data.id);
    if (!defCities.find((v) => v.id === data.id)) {
      dispatch(addCityAC(data.id));
    } else {
      dispatch(addToFavAC(data.id));
    }
  };

  const onRemoveFromFavourites = (data) => {
    removeCityFromFav(data.id);
    dispatch(removeFromFavAC(data.id));
  };

  return (
    <div className="Weather">
      <div className="cityTitle">
        <h2 className="city__name">{weather.name}</h2>
        <div className="title__icon">
          {isActive(weather.id) ? (
            <FontAwesomeIcon
              onClick={() => onRemoveFromFavourites(weather)}
              className="footer__icon active"
              icon={faHeartActive}
            />
          ) : (
            <FontAwesomeIcon
              onClick={() => onAddToFavourites(weather)}
              className="footer__icon"
              icon={faHeart}
            />
          )}
        </div>
      </div>
      <div className="weatherCard">
        <section className="sky">
          <div className="cloud1"></div>
          <div className="cloud2"></div>
          <div className="cloud3"></div>
          <div className="sun"></div>
        </section>
        <section className="content">
          <h1 className="content__temp">
            {Math.ceil(weather.main.temp)}&#176;
          </h1>
          <h3 className="content__min">{weather.weather[0].main}</h3>
          <div className="details">
            <div>
              <p className="value">{Math.ceil(weather.main.temp_min)}&#176;</p>
              <p className="label">Minimum</p>
            </div>
            <div>
              <p className="value">{Math.ceil(weather.main.temp_max)}&#176;</p>
              <p className="label">Maximum</p>
            </div>
            <div>
              <p className="value">{Math.ceil(weather.wind.speed)}m/s</p>
              <p className="label">Wind</p>
            </div>
            <div>
              <p className="value">{Math.ceil(weather.main.humidity)}%</p>
              <p className="label">Humidity</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default WeatherInfo;
