import "./App.css";
import Login from "./components/login/Login";
import Registration from "./components/registration/Registration";
import { Route, Redirect } from "react-router-dom";
import Main from "./components/main/Main";
import PrivateRoute from "./private-route/privateRoute";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUserAC } from "./redux/reducers/userReducer";
import { authenticationService } from "./services/authService";
import WeatherInfo from "./components/full-weather-info/WeatherInfo";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    authenticationService.currentUser.subscribe((user) => {
      dispatch(addUserAC(user));
    });
  }, []);

  return (
    <div className="App">
      <Route exact path="/registration" component={Registration} />
      <Route path="/login" component={Login} />
      <PrivateRoute exact path="/main" component={Main} />
      <PrivateRoute path='/main/:cityId' component={WeatherInfo}/>
      <Route render={() => <Redirect to={{ pathname: "/main" }} />} />
    </div>
  );
}

export default App;
