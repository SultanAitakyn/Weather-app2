import axios from "axios";

const instance = axios.create({
  baseURL: "http://api.openweathermap.org/data/2.5/",
});

const API_KEY = "babd7aa8b35062ecf7e2f862603c8123";

export const weatherAPI = {
  async getCityWeather(city) {
    return instance
      .get(`weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then((response) => {
        return response.data;
      });
  },

  async getAllDefaultCities(cities) {
    return instance
      .get(`group?id=${cities.toString()}&appid=${API_KEY}&units=metric`)
      .then((res) => {
        return res.data;
      });
  },
};

export const registerUser = (values) => {
  let a = [];
  a = JSON.parse(localStorage.getItem("users")) || [];
  a.push({ ...values, citiesId: [524894, 2968815, 2643743, 5128638, 1816670] });
  localStorage.setItem(`users`, JSON.stringify(a));
};

export const getUserDefCities = (login) => {
  let users = JSON.parse(localStorage.getItem(`users`));
  let user = users.find((v) => v.login === login);
  if (user) {
    return user.citiesId;
  }
};

export const addCityToFav = (cityId) => {
  let currentUser = JSON.parse(localStorage.getItem("currentSession"));
  let users = JSON.parse(localStorage.getItem("users"));
  let index = users.findIndex((v) => v.login === currentUser.login);
  users[index].citiesId.push(cityId);
  localStorage.setItem("users", JSON.stringify(users));
};

export const removeCityFromFav = (cityId) => {
  let currentUser = JSON.parse(localStorage.getItem("currentSession"));
  let users = JSON.parse(localStorage.getItem("users"));
  let index = users.findIndex((v) => v.login === currentUser.login);
  users[index].citiesId = users[index].citiesId.filter(v => v !== cityId);
  localStorage.setItem("users", JSON.stringify(users));
};