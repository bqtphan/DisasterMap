import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, InputAdornment, TextField, Button, Tooltip, Dialog, DialogActions, DialogTitle, DialogContent, withMobileDialog } from '@material-ui/core';
import { Add, LocationOn } from '@material-ui/icons'
import API from '../utils/API';
import DisasterMap from '../components/DisasterMap';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  mapArea: {
    height: "100%"
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 8,
    left: theme.spacing.unit * 4,
    [theme.breakpoints.up('md')]: {
      left: theme.spacing.unit * 35
    },
  },
  margin: {
    margin: theme.spacing.unit,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  toolbar: theme.mixins.toolbar,
});

const alertsArr = ['rescue', 'medical', 'crime'];

function situationFun(alert) {
  switch (alert) {
    case "rescue":
      return ['trapped', 'other'];
    case "medical":
      return ['trouble breathing', 'bleeding', 'pain', 'other'];
    case "crime":
      return ['crime', 'suspicous behavior', 'other'];
    default:
      return console.log("Couldn't find alert");
  }
};

const options = () => ({
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
});

let inputLocation = null

const success = (pos) => {
  const crd = pos.coords;
  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  inputLocation = {lat: crd.latitude, lng: crd.longitude}
}

const error = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

class Map extends Component {
  state = {
    userAlerts: [],
    alert: "",
    situation: "",
    location: null,
    message: "",
    modal: false,
    activeStep: 0,
    markers: null
  }

  componentDidMount() {
    this.positionPromise()
    this.loadMapAlerts();
  }

  
  

  loadMapAlerts = () => {
    API.getMapMessages()
      .then(res => this.setState({
        userAlerts: res.data,
        alert: "",
        situation: "",
        message: "",
        modal: false,
        activeStep: 0
      }))
      .catch(err => console.log(err));
      this.setState ({
      })
  };


  deleteMapMessage = id => {
    API.deleteMapMessage(id)
      .then(res => this.loadMapAlerts())
      .catch(err => console.log(err));
  };

  handleFirstNext = (alert) => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
      alert: alert,
    }));
  };

  handleSecondNext = (situation) => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
      situation: situation,
    }));
  }

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };


  getPosition = () => {
    if (inputLocation) {
      this.setState({
        location: inputLocation
      })
    }
  }

  positionPromise = () => {
    navigator.geolocation.getCurrentPosition(success, error, options);
    setTimeout(() => {
      this.getPosition()
    }, 7500);
  }

  handleClickOpen = () => {
    this.setState({
      modal: true,
      alert: "",
      situation: "",
      message: "",
      activeStep: 0
    });
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
  };

  handleSendAlert = () => {
    const { alert, situation, location, message } = this.state
    console.log(this.state)
    console.log(alert, situation, location, message)
    if (alert && situation && location && message) {
      API.saveMapMessage({
        alert: this.state.alert, 
        situation:this.state.situation, 
        location:this.state.location, 
        message:this.state.message
       })
        .then(res => this.loadMapAlerts())
        .catch(err => console.log(err));
    }
  }

  getDialogContent = (step) => {
    switch (step) {
      case 0:
        return alertsArr.map((prop, index) => (
          <Grid item >
            <Button key={index} variant="contained" color="secondary" aria-label={prop} className={this.props.classes.button} onClick={() => this.handleFirstNext(prop)}>
              {prop}
            </Button>
          </Grid>))
      case 1:
        return situationFun(this.state.alert).map((prop, index) => (
          <Grid item >
            <Button key={index} variant="contained" color="secondary" aria-label={prop} className={this.props.classes.button} onClick={() => this.handleSecondNext(prop)}>
              {prop}
            </Button>
          </Grid>))
      case 2:
        return (<Grid item >
          <TextField
            fullWidth
            id="geolocationInput"
            name="location"
            label="TextField"
            val={this.handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOn />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id name="message"
            label="Note"
            placeholder="Add Note (Optional)"
            multiline
            rows="4"
            value={this.state.message}
            onChange={this.handleInputChange}
            className={this.props.classes.textField}
            margin="normal"
            variant="filled"
          />
        </Grid>)
      default:
        return 'Unknown Step'
    }
  }



  render() {
    const { classes, fullScreen } = this.props

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.mapArea}>

          <DisasterMap
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              loadingElement={<div style={{ height: `100%` }} />}
              currentLoc= {this.state.location}
              markers= {this.state.userAlerts}
          />

          <Tooltip title="Send Alert">
            <Button variant="fab" color="secondary" className={classes.absolute} onClick={this.handleClickOpen}>
              <Add />
            </Button>
          </Tooltip>

        </div>

        <Dialog
          fullScreen={fullScreen}
          open={this.state.modal}
          onClose={this.handleClose}
          aria-labelledby="alertModal"
        >
          <DialogTitle id="alertModal" align="center">
            {this.state.alert.toUpperCase() || "NEW ALERT"}
          </DialogTitle>
          <DialogContent>
            <Grid container direction="row" justify="center" alignItems="baseline">
              {
                this.getDialogContent(this.state.activeStep)
              }
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
          </Button>
            <Button
              disabled={this.state.activeStep === 0}
              onClick={this.handleBack}
              className={classes.button}
            >
              Back
          </Button>
            {
              this.state.activeStep === 2 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleSendAlert}
                  className={classes.button}
                >
                  Send
                      </Button>
              ) : null}
          </DialogActions>
        </Dialog>
      </main>
    );
  }
}

Map.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withMobileDialog()(withStyles(styles, { withTheme: true })(Map))