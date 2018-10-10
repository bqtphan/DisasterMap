import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, List, ListItem, ListItemSecondaryAction, ListItemText, Checkbox, IconButton } from '@material-ui/core';
import { Comment } from '@material-ui/icons'
import API from '../utils/API';


const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Shelters extends Component {
  state = {
    shelters: [],
    checked: [0],
  }


  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  componentDidMount() { 
    // this.loadShelters();
  }

  loadShelters = () => {
    
  };


  render() {
    const { classes } = this.props

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper}>

          
            <Typography variant="h6">
              Map
              </Typography>

            Still under construction! Please be patient with us!
              
              </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6">
              Shelters
              </Typography>
            <Typography variant="subtitle1">
              Here are some shelters by your current location!
              </Typography>

            <List>
          {[0, 1, 2, 3].map(value => (
            <ListItem
              key={value}
              role={undefined}
              dense
              button
              onClick={this.handleToggle(value)}
              className={classes.listItem}
            >
              <Checkbox
                checked={this.state.checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={`Line item ${value + 1}`} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <Comment />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
          
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Shelters.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Shelters)