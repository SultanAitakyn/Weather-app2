import { AppBar, Container, Toolbar, Typography, Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header__icon: {
    marginRight: theme.spacing(1),
    color: "#f6bf26",
  },
  title: {
    flexGrow: 1,
  },
  [theme.breakpoints.down("xs")]: {
    title: {
      display: "none",
    },
    signOutBtn: {
      marginLeft: 'auto'
    }
  },
}));

function Header(props) {
  const classes = useStyles();

  const onLogout = () => {
    props.logout();
  }

  return (
    <AppBar position="relative">
      <Container maxWidth="md">
        <Toolbar>
          <WbSunnyIcon
            edge="start"
            fontSize="large"
            className={classes.header__icon}
          />
          <Typography variant="h6" className={classes.title}>
            Your weather app
          </Typography>
          <Button
            className={classes.signOutBtn}
            color="secondary"
            variant="contained"
            onClick={() => onLogout() }
          >
            {" "}
            Sign out{" "}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
