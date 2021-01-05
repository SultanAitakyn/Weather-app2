import Description from "../app-description/Description";
import Header from "../header/Header";
import Slider from "../slider/Slider";
import { authenticationService } from "../../services/authService";
import { useHistory } from "react-router-dom";
import { addCitiesAC } from "../../redux/reducers/citiesReducer";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import {
  fetchWeather,
  getDefaultCitiesWeather,
} from "../../redux/actions/fetchWeather";
import { getUserDefCities } from "../../api/api";
import "./styles.scss";
import Search from "../search/Search";
import Snackbar from "@material-ui/core/Snackbar";
import { Typography } from "@material-ui/core";

function Main() {
  const [city, setCity] = useState("");
  let history = useHistory();
  const weathers = useSelector((state) => state.Cities.weathers);
  const user = useSelector((state) => state.User.currentUser);
  const [searchError, setSearchError] = useState("");
  const [isSnackVisible, setIsSnackVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let defCities = getUserDefCities(user.login);
    dispatch(getDefaultCitiesWeather(defCities));
    dispatch(addCitiesAC(defCities.map((v) => ({ id: v, isActive: true }))));
  }, []);

  const logout = () => {
    authenticationService.logout();
    history.replace("/login");
  };

  const getCityWeather = (e) => {
    e.preventDefault();
    if (city === "") {
      console.log("empty city");
    } else {
      dispatch(fetchWeather(city)).then((res) => {
        if (res.cod === 200) {
          history.push({
            pathname: `/main/${res.id}`,
            state: { weather: res },
          });
        } else {
          setSearchError(res.message);
          setIsSnackVisible(true);
        }
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackVisible(false);
  };

  return (
    <main>
      <Header logout={logout} />
      <Description />
      <Search getCityWeather={getCityWeather} setCity={setCity} />
      {weathers.length ? (
        <Slider cities={weathers} currentCity={weathers[0]} />
      ) : (
        <Typography
          variant="h5"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          No favourite cities
        </Typography>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isSnackVisible}
        message={searchError}
        onClose={handleClose}
        autoHideDuration={5000}
      />
    </main>
  );
}

export default Main;
