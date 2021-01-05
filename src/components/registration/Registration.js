import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography
} from "@material-ui/core";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import useForm from "../customHooks/useForm";
import { Link } from 'react-router-dom';
import { registerUser } from '../../api/api';


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

const Registration = () => {
  const classes = useStyles();

  let history = useHistory();

  const validate = (values) => {
    let errors = {};

    const users = JSON.parse(localStorage.getItem("users"));

    if (!values.email.trim()) {
      errors.email = "Email required";
    } else if (
      users &&
      Object.values(users).find((v) => v.email === values.email)
    ) {
      errors.email = "User with such email already exist";
    }

    if (!values.login.trim()) {
      errors.login = "Login required";
    } else if (
      users &&
      Object.values(users).find((v) => v.login === values.login)
    ) {
      errors.login = "User with such login already exist";
    }

    if (!values.password) {
      errors.password = "Password required";
    } else if (values.password.length < 8) {
      errors.password = "Password need to be at least 8 characters";
    }

    return errors;
  };

  const submitForm = () => {
    registerUser(values);
    history.push("/login");
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
          <h2>Sign Up</h2>
        </Grid>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            error={errors.email && true}
            label="Email"
            placeholder="Enter email"
            fullWidth
            required
            onChange={handleChange}
            value={values.email}
            helperText={errors.email}
            autoComplete="email"
            name="email"
          />
          <TextField
            error={errors.login && true}
            label="Login"
            placeholder="Enter login"
            fullWidth
            required
            onChange={handleChange}
            value={values.login}
            helperText={errors.login}
            name="login"
            autoComplete="login"
          />
          <TextField
            error={errors.password && true}
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            onChange={handleChange}
            value={values.password}
            helperText={errors.password}
            type="password"
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
            Sign up
          </Button>
          <Typography>
            {" "}
            Already have an account? <Link to="/login">Sign in</Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
};

export default Registration;
