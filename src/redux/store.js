import {createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import {combineReducers} from "redux";
import userReducer from "./reducers/userReducer";
import citiesReducer from "./reducers/citiesReducer";

const middleware = applyMiddleware(thunk);

const reducers = combineReducers({
    User: userReducer,
    Cities: citiesReducer
});

const store = createStore(reducers, composeWithDevTools(middleware));
export default store;


