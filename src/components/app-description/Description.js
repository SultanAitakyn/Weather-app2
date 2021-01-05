import { Container, Typography, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import weatherImg from "../../assets/bg/weather.jpg";

const useStyles = makeStyles((theme) => ({
  description: {
    backgroundImage: `url(${weatherImg})`,
    position: "relative",
    color: theme.palette.common.white,
    marginBottom: theme.spacing(2),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  descriptionContent: {
    position: "relative",
    padding: theme.spacing(6),
    marginTop: theme.spacing(8),
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  [theme.breakpoints.down("xs")]: {
    description: {
      display: "none",
    },
  },
}));

function Description() {
  const classes = useStyles();

  return (
    <Paper className={classes.description}>
      <Container maxWidth="md">
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={10}>
            <div className={classes.descriptionContent}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                Your ideal helper
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Knowing the weather is something that we all pretty much need to
                know. Stay up to date and prepared no matter the weather with
                our accurate forecasts.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

export default Description;
