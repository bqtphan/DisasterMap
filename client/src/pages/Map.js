import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, InputAdornment, TextField, Button, Tooltip, GridList, GridListTile, GridListTileBar, ListSubheader, Dialog, DialogActions, DialogContentText, DialogTitle, DialogContent, withMobileDialog, AppBar, Toolbar, IconButton } from '@material-ui/core';
import { Add, Close, LocationOn } from '@material-ui/icons'
import API from '../utils/API';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: "100%"
  },
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
    right: theme.spacing.unit * 4,
  },
  margin: {
    margin: theme.spacing.unit,
  },
});


const alertsArr = ['rescue', 'medical', 'crime']

// const rescue = ['trapped', 'other']
// const medical = ['trouble breathing', 'bleeding', 'pain', 'other']
// const crime = ['crime', 'suspicous behavior', 'other']

const situationArr = {
  rescue: ['trapped', 'other'],
  medical: ['trouble breathing', 'bleeding', 'pain', 'other'],
  crime: ['crime', 'suspicous behavior', 'other']
}

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
}

class Map extends Component {
  state = {
    userAlerts: [],
    alerts: alertsArr,
    alert: "",
    situations: [],
    situation: "",
    address: "",
    geolocation: {},
    note: "",
    modal: false,
    activeStep: 0
  }

  componentDidMount() {
    if (!this.state.geolocation.length) {
      //get geolocation
      this.setState({
        location: "-45, 95"
      })
    }
    // this.loadMapAlerts();
  }

  // situationArr[= (al]rt) => {
  //   switch (alert) {
  //     case "rescue":
  //       return ['trapped', 'other'];
  //     case "medical":
  //       return ['trouble breathing', 'bleeding', 'pain', 'other'];
  //     case "crime":
  //       return ['crime', 'suspicous behavior', 'other'];
  //     default:
  //       return console.log("Couldn't find alert");
  //   }
  // }

  loadMapAlerts = () => {
    API.getMapMessages()
      .then(res => this.setState({
        alerts: res.data,
        modal: false,
        alert: "",
        situation: "",
        address: "",
        note: "",
        activeStep: 0
      }))
      .catch(err => console.log(err));
  };

  deleteMapMessage = id => {
    API.deleteMapMessage(id)
      .then(res => this.loadMapAlerts())
      .catch(err => console.log(err));
  };

  // handleNext = () => {
  //   this.setState(prevState => ({
  //     activeStep: prevState.activeStep + 1,
  //   }));
  // };


  handleFirstNext = (alert) => {
    const situations = situationArr[alert];
    console.log(situations)
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
      alert: alert,
      situations: situations
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
  if (navigator.geolocation.getCurrentPosition) {
    this.setState({ lat: 0, lng: 0 })
  }
  // in form, if no geolocation, will set to address, if no address, set to null
}

  // handleMessageSubmit = () => {
  //   if (this.state.note && this.state.location) {
  //     API.saveMapMessage({ note: this.state.note, location: this.state.location })
  //       .then(res => this.loadMapAlerts())
  //       .catch(err => console.log(err));
  //   }
  // }

  handleClickOpen = () => {
    this.setState({ 
      modal: true,
      alert: "",
      situations: [],
        situation: "",
        address: "",
        note: "",
        activeStep: 0 
    });
  };

  handleClose = () => {
    this.setState({
      modal: false,
    });
  };

  handleSend = () => console.log(this.state)
  

  getDialogContent = (step) => {
    switch (step) {
      case 0:
      return  this.state.alerts.map((prop, index) => (
          <Grid item >
            <Button key={index} variant="contained" color="secondary" aria-label={prop} className={this.props.classes.button} onClick={() => this.handleFirstNext(prop)}>
              {prop}
            </Button>
          </Grid>))
      case 1:
      return this.state.situations.map((prop, index) => (
          <Grid item >
            <Button key={index} variant="contained" color="secondary" aria-label={prop} className={this.props.classes.button} onClick={() => this.handleSecondNext(prop)}>
              {prop}
            </Button>
          </Grid>))
      case 2:
        return (<Grid item >
          <TextField
            className={this.props.classes.margin}
            fullWidth
            id="geolocationInput"
            name="geolocation"
            label="TextField"
            value={this.state.geolocation}
            onChange={this.handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOn />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="noteInput"
            fullWidth
            name="note"
            label="Note"
            placeholder="Add Note (Optional)"
            multiline
            rows="4"
            // defaultValue="Default Value"
            value={this.state.note}
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

    return (<Fragment>
      <div className={classes.mapArea}>
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

{this.state.activeStep === 2 ? (
  <Button
            variant="contained"
            color="primary"
            onClick={this.handleSend}
            className={classes.button}
          >
             Send
          </Button>
) : null }

          {/* <Button
            variant="contained"
            color="primary"
            onClick={this.state.activeStep === 2 ? this.handleSend : this.handleNext}
            className={classes.button}
          >
            {this.state.activeStep === 2 ? 'Send' : 'Next'}
          </Button> */}
        </DialogActions>
      </Dialog>
    </Fragment>
    );
  }
}

Map.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withMobileDialog()(withStyles(styles, { withTheme: true })(Map))