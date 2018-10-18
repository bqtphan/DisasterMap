import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import Footer from '../components/Footer';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxHeight: '100%',
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  mainContainer: {
    minHeight: 'calc(100% - 123px)'
},
});

function NoMatch(props) {
  const { classes } = props;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <div className={classes.mainContainer}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h1>404 Page Not Found</h1>
            <h1>
              <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
            </span>
            </h1>
          </Paper>
        </Grid>
      </Grid>
      </div>
                <Footer/>
    </main>
  );
}

NoMatch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoMatch);