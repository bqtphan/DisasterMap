import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, TextField, Button } from '@material-ui/core';
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

class Map extends Component {
  state = {
    messages: [],
    message: "",
    location: ""
  }

  componentDidMount() { 
    if(!this.state.location) {
      //get geolocation
      this.setState({
        location: "-45, 95"
      })
    }
    this.loadMapMessages();
  }

  loadMapMessages = () => {
    API.getMapMessages()
      .then(res => this.setState({ messages: res.data, message: "" }))
      .catch(err => console.log(err));
  };

  deleteMapMessage = id => {
    API.deleteMapMessage(id)
      .then(res => this.loadMapMessages())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
        [name]: value
    });
    };


  handleMessageSubmit = () => { 
    if (this.state.message && this.state.location) {
      API.saveMapMessage({message: this.state.message, location: this.state.location})
      .then(res => this.loadMapMessages())
      .catch(err => console.log(err));
    }
  }

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
              {this.state.messages ? this.state.messages.map((x) => (
              <p>Message: {x.message} | Location: {x.location}</p>)
              ) : null}
              </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6">
              Message
              </Typography>
            <Typography variant="subtitle1">
              Allow permission to your location so you can put a message on your location!
              </Typography>

            <form className={classes.container} onSubmit={this.handleMessageSubmit}>
              <TextField
                id="message"
                label="Message"
                name="message"
                type="textarea"
                className={classes.textField}
                value={this.state.message}
                onChange={this.handleInputChange}
                margin="normal"
                required
              />

              <Button type="submit" variant="contained" color="primary" className={classes.button}>
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Map.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Map)