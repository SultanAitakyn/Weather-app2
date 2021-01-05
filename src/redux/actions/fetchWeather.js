import { weatherAPI } from "../../api/api";

const GET_ALL_WEATHER = "GET_ALL_WEATHER";

const getAllCitiesAC = (cities) => {
  return {
    type: GET_ALL_WEATHER,
    cities,
  };
};

export const fetchWeather = (city) => async (dispatch) => {
  try {
    const response = await weatherAPI.getCityWeather(city);
    return response;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export function getDefaultCitiesWeather(cities) {
  return function (dispatch) {
    weatherAPI
      .getAllDefaultCities(cities)
      .then((data) => {
        dispatch(getAllCitiesAC(data.list));
        return data.list;
      })
      .catch((err) => console.log(err));
  };
}
