const ADD_CITIES = "ADD_CITIES";
const GET_ALL_WEATHER = "GET_ALL_WEATHER";
const REMOVE_FAVOURITE = "REMOVE_FAVOURITE";
const ADD_FAVOURITE = "ADD_FAVOURITE";
const ADD_CITY = "ADD_CITY";

let initialState = {
  cities: [],
  weathers: [],
};

export const citiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CITIES:
      return { ...state, cities: action.cities };
    case GET_ALL_WEATHER:
      return { ...state, weathers: action.cities };
    case REMOVE_FAVOURITE:
      return {
        ...state,
        cities: state.cities.map((v) =>
          v.id === action.cityId ? { ...v, isActive: false } : v
        ),
      };
    case ADD_FAVOURITE:
      return {
        ...state,
        cities: state.cities.map((v) =>
          v.id === action.cityId ? { ...v, isActive: true } : v
        ),
      };
    case ADD_CITY:
      return { ...state, cities: [...state.cities, {id: action.cityId, isActive: true}] };
    default:
      return state;
  }
};

export const addCitiesAC = (cities) => {
  return {
    type: ADD_CITIES,
    cities,
  };
};

export const removeFromFavAC = (cityId) => {
  return {
    type: REMOVE_FAVOURITE,
    cityId,
  };
};

export const addToFavAC = (cityId) => {
  return {
    type: ADD_FAVOURITE,
    cityId,
  };
};

export const addCityAC = (cityId) => {
  return {
    type: ADD_CITY,
    cityId,
  };
};

export default citiesReducer;
