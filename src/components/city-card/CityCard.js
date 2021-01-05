import React from "react";
import sun from "../../assets/icons/sun.svg";
import snow from "../../assets/icons/snow.svg";
import rain from "../../assets/icons/rain.svg";
import windy from "../../assets/icons/windy.svg";
import moscow from "../../assets/moscow.jpg";
import paris from "../../assets/paris.jpg";
import beijing from "../../assets/beijing.jpg";
import london from "../../assets/london.jpg";
import newyork from "../../assets/newyork.jpg";
import dftImg from "../../assets/default.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartActive } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeart } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import "./styles.scss";

function City(props) {
  const defCities = useSelector((state) => state.Cities.cities);

  const getImg = () => {
    let day = props.city.weather[0].main;
    switch (day) {
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Wind":
        return windy;
      case "Clouds":
        return windy;
      default:
        return sun;
    }
  };

  const getCityImg = () => {
    let city = props.city.name;
    switch (city) {
      case "Moscow":
        return moscow;
      case "Beijing":
        return beijing;
      case "New York":
        return newyork;
      case "Paris":
        return paris;
      case "London":
        return london;
      default:
        return dftImg;
    }
  };

  const isActive = (id) => {
    const city = defCities.find((v) => v.id === id);
    return city ? city.isActive : false;
  };

  return (
    <section className="card">
      <div onClick={() => props.customClickEvent(props.city)}>
        <div className="floater">
          <div className="iconTemp">
            <img src={getImg()} alt="Sun" id="weather-icon" />
            <p className="temp">{Math.ceil(props.city.main.temp)}&#176;</p>
          </div>
          <p>{props.city.weather[0].main}</p>
        </div>
        <img src={getCityImg()} alt="Moscow" id="cityImg" />
      </div>
      <div className="card__footer">
        {isActive(props.city.id) ? (
          <FontAwesomeIcon
            onClick={() => props.onRemoveFav(props.city)}
            className="footer__icon active"
            icon={faHeartActive}
          />
        ) : (
          <FontAwesomeIcon
            onClick={() => props.onAddToFav(props.city)}
            className="footer__icon"
            icon={faHeart}
          />
        )}
        <div className="footer__name">
          <p>{props.city.name}</p>
          <p>{props.city.sys.country}</p>
        </div>
      </div>
    </section>
  );
}

export default City;
