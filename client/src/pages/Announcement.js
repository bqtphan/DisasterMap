import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';

const styles = theme => ({
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }
  });

class Announcement extends Component {
    
    render() {
        const { classes } = this.props
    return (
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
            <Typography variant="h6">
                Announcement
              </Typography>
              Still under construction! Please be patient with us!
              </Paper>
          </Grid>
        </Grid>
      );
    }
}

Announcement.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles, { withTheme: true })(Announcement)