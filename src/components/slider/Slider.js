import { Container, Typography, Grid } from "@material-ui/core";
import City from "../city-card/CityCard";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import { addCityToFav, removeCityFromFav } from '../../api/api';
import { removeFromFavAC, addToFavAC } from "../../redux/reducers/citiesReducer";
import { useDispatch } from "react-redux";

function Slider(props) {
  const [currentCity, setCurrentCity] = useState(props.currentCity);
  const [offset, setOffset] = useState(3);
  let history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    handlePageResize();
    window.addEventListener("resize", handlePageResize);
    return (_) => {
      window.removeEventListener("resize", handlePageResize);
    };
  }, []);

  const handlePageResize = () => {
    let sliderWidth = getSliderWidth();
    setOffset(calcOffset(sliderWidth));
  };

  const calcOffset = (sliderWidth) => {
    if (sliderWidth >= 750) {
      return 3;
    } else if (sliderWidth >= 510) {
      return 2;
    } else {
      return 1;
    }
  };

  const getCurrentCityIndex = (city) => {
    return props.cities.findIndex((v) => v.id === city.id);
  };

  const getSliderWidth = () => {
    return document.getElementById("slider__wrapper").offsetWidth;
  };

  const nextProperty = () => {
    let sliderWidth = getSliderWidth();
    setOffset(calcOffset(sliderWidth));
    let newIndex = getCurrentCityIndex(currentCity) + offset;
    setCurrentCity(
      props.cities[
        newIndex < props.cities.length - 1 ? newIndex : props.cities.length - 1
      ]
    );
  };

  const prevProperty = () => {
    let sliderWidth = getSliderWidth();
    setOffset(calcOffset(sliderWidth));
    let newIndex = getCurrentCityIndex(currentCity) - offset;
    setCurrentCity(props.cities[newIndex < 0 ? 0 : newIndex]);
  };

  const onAddToFavourites = (data) => {
    addCityToFav(data.id);
    dispatch(addToFavAC(data.id));
  };

  const onRemoveFromFavourites = (data) => {
    removeCityFromFav(data.id);
    dispatch(removeFromFavAC(data.id));
  };

  const onCitySelect = (data) => {
    history.push({
      pathname: `/main/${data.id}`,
      state: { weather: data },
    });
  };

  let CityItems = props.cities.map((b) => (
    <City
      onAddToFav={onAddToFavourites}
      onRemoveFav={onRemoveFromFavourites}
      customClickEvent={onCitySelect}
      key={b.id}
      city={b}
    />
  ));

  return (
    <Container className="main__container" maxWidth="md">
      <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
        Favourite cities
      </Typography>
      <Grid container spacing={3} wrap="nowrap">
        <Grid item xs className="arrow__wrapper">
          <div
            style={{
              display: `${
                getCurrentCityIndex(currentCity) === 0 ? "none" : "block"
              }`,
            }}
            onClick={() => prevProperty()}
            className="arrows prev"
          ></div>
        </Grid>
        <Grid item className="slider__wrapper" id="slider__wrapper">
          <div className="slider">
            <div className="slider__cards">
              <div
                className="cards__wrapper"
                style={{
                  transform: `translateX(-${
                    getCurrentCityIndex(currentCity) *
                    (100 / props.cities.length)
                  }%)`,
                }}
              >
                {CityItems}
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs className="arrow__wrapper">
          <div
            style={{
              display: `${
                props.cities.length - getCurrentCityIndex(currentCity) <= offset
                  ? "none"
                  : "block"
              }`,
            }}
            onClick={() => nextProperty()}
            className="arrows next"
          ></div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Slider;
