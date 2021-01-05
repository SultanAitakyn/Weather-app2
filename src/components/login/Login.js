import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { makeStyles } from "@material-ui/core/styles";
import useForm from "../customHooks/useForm";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticationService } from "../../services/authService";
import Snackbar from '@material-ui/core/Snackbar';
import { addUserAC } from '../../redux/reducers/userReducer';

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    padding: 20,
    height: "60vh",
    width: 280,
    margin: "20px auto",
  },
  avatarStyle: { backgroundColor: "#33b679" },
  avatar__icon: { color: "#f6bf26" },
  btnstyle: { margin: "15px 0" },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [authError, setAuthError] = useState("");
  const [isSnackVisible, setIsSnackVisible] = useState(false);

  let history = useHistory();

  const validate = (values) => {
    let errors = {};

    if (!values.login.trim()) {
      errors.login = "Login required";
    }

    if (!values.password) {
      errors.password = "Password required";
    } else if (values.password.length < 8) {
      errors.password = "Password need to be at least 8 characters";
    }

    return errors;
  };

  const submitForm = () => {
    const response = authenticationService.login(values.login, values.password);
    if (response.isAuth) {
      dispatch(addUserAC(response.user));
      history.push("/main");
    } else {
      setAuthError(response.error);
      setIsSnackVisible(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackVisible(false);
  };

  const { handleChange, values, handleSubmit, errors } = useForm(
    validate,
    submitForm
  );

  return (
    <Grid>
      <Paper elevation={10} className={classes.paperStyle}>
        <Grid align="center">
          <Avatar className={classes.avatarStyle}>
            <WbSunnyIcon className={classes.avatar__icon} />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Login"
            placeholder="Enter login"
            fullWidth
            required
            error={errors.login && true}
            onChange={handleChange}
            value={values.login}
            helperText={errors.login}
            name="login"
            autoComplete="login"
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            error={errors.password && true}
            onChange={handleChange}
            value={values.password}
            helperText={errors.password}
            autoComplete="current-password"
            name="password"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.btnstyle}
            fullWidth
          >
            Sign in
          </Button>
          <Typography>
            {" "}
            Don't have an account? <Link to="/registration">Sign Up</Link>
          </Typography>
        </form>
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isSnackVisible}
        message={authError}
        onClose={handleClose}
        autoHideDuration={5000}
      />
    </Grid>
  );
};

export default Login;
