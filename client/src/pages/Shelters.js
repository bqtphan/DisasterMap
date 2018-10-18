import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, List, ListItem, ListItemSecondaryAction, ListItemText, Checkbox, IconButton } from '@material-ui/core';
import { Comment } from '@material-ui/icons'
import API from '../utils/API';
import ShelterMap from '../components/ShelterMap';


const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    maxHeight: '100%'
},
toolbar: theme.mixins.toolbar,
mapArea: {
  height: '100%',
  paddingTop: '56px',
  [theme.breakpoints.up('xs')]: {
    paddingTop: '48px',
  },
  [theme.breakpoints.up('sm')]: {
    paddingTop: '64px',
  },
},
});

let curLat = 0;
let curLng = 0;

class Shelters extends Component {
  state = {
    results: {},
    checked: [0],
    curLat: -33.8670522,
    curLng: 151.1957362,
    filter: ''
  }

  getShelters = (lat, lng, filter) => {
    API.getShelters(lat, lng, filter)
      .then(res => this.setState({ results: res.data }))
      .catch(err => console.log(err));
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    if (this.state.checked.indexOf(value) == true) {
      this.setState({
        filter: this.state.checked.indexOf(value).key
      }, function () {
        console.log(this.state.filter);
    });
    }

    this.setState({
      checked: newChecked,
    });

    this.getShelters(this.state.curLat, this.state.curLng, this.state.filter);
  };

  componentDidMount() { 
    this.getShelters(this.state.curLat, this.state.curLng, this.state.filter);
  }

  loadShelters = () => {
    
  };


  render() {
    const { classes } = this.props

    return (
      <main className={classes.content}>
      {/* <div className={classes.mapArea}> */}
      <Grid container spacing={23.5}>
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper}>


              <ShelterMap
              shelters={this.state.results}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              loadingElement={<div style={{ height: `100%` }} />}
              />
              
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
          {["Hospitals" , "Church", "Schools"].map(value => (
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
              <ListItemText primary={`${value}`} />
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
      {/* </div> */}
      </main>
    );
  }
}

Shelters.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Shelters)