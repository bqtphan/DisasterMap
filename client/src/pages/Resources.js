import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';
import Footer from '../components/Footer';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    maxHeight: '100%',
    overflow: 'auto',
  },
  toolbar: theme.mixins.toolbar,
  mainContainer: {
    minHeight: 'calc(100% - 123px)'
},
});

class Resources extends Component {

  render() {
    const { classes } = this.props
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.mainContainer}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h6">
                Resources
              </Typography>
              <a href="http://google.org/crisismap/weather_and_events">Google Crisis Map</a>
              <p>"...help people find and use critical emergency information when they need it most. Using Google's technology, speed, and user-friendly design, Crisis Map was designed to make disaster information easy to find, use, and share."</p>
            </Paper>
          </Grid>
        </Grid>
        </div>
                <Footer/>
      </main>
    );
  }
}

Resources.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Resources)