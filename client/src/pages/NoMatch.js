import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';

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
  },
  toolbar: theme.mixins.toolbar,
});

function NoMatch(props) {
  const { classes } = props;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
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
    </main>
  );
}

NoMatch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoMatch);