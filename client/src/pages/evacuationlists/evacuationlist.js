import React, { Component } from "react";
import API from "../../utils/API";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, TextField, Button, List, ListItem, ListItemText, Checkbox, FormLabel, FormGroup, FormControlLabel, FormControl } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { Delete } from '@material-ui/icons';

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
    width: '80%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
});

let recommendedItems = [
  "Copies of your important papers in a waterproof bag",
  "Extra set of car and house keys", "Extra mobile phone charger",
  "Bottled water and snacks such as energy or granola bars",
  "First-aid supplies, flashlight, and whistle",
  "Battery-powered or hand-crank radio (with extra batteries, if needed)",
  "A list of the medications each member of your family needs and at least a 14-day supply of each medication",
  "Toothpaste, toothbrushes, wet cleansing wipes, and so on",
  "Contact and meeting place information for your family and a map of your local area",
  "A stuffed animal or toy for your child and something to help occupy their time, like books or coloring books. If this includes a hand-held video game, make sure you have extra batteries",
  "Rain ponchos",
  "External mobile phone battery pack or solar charger. Some hand-crank flashlights will also include a phone charger",
  "Escape Tool for your car"
]

class Evacuationlists extends Component {
  state = {
    items: [],
    item: ""
  };

  componentDidMount() {
    this.loadEvacuationlists();
  }

  loadEvacuationlists = () => {
    API.getAllEvacuationLists()
      .then(res => this.setState({ items: res.data }))
      .catch(err => console.log(err));
  };

  deleteEvacuationlists = id => {
    API.deleteEvacuatlists(id)
      .then(res => this.loadEvacuationlists())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.item) {
      API.saveEvacuationlists({
        item: this.state.items,
      })
        .then(res => this.loadEvacuationlists())
        .catch(err => console.log(err));
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={8}>
        <Grid item xs={12} md={12}>
          <Grid
            container
            spacing={0}
            justify="center"
          >
            <Grid item xs={12} md={10}>
              <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                  Evacuation Kit
          </Typography>

          <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">An evacuation kit is one that you would take with you in case of an evacuation. Evacuation kit should
be easily portable like a backpack or suitcase on wheels. Store it somewhere you can easily
get to it.
Recommended items to consider including in your Evacuation kit:</FormLabel>
          <FormGroup>
          {this.state.items.map((item, index) => (
            <FormControlLabel
            control={
              <Checkbox key={index} checked={false} onChange={(event) => this.handleCheckChange(event, index)} value={item} />
            }
            label={item.item}
          />
          ))
          }
          </FormGroup>
          </FormControl>
          
                <form className={classes.container}>
                  <TextField
                    id="item"
                    type="text"
                    name="item"
                    label="Item"
                    className={classes.textField}
                    margin="normal"
                    required
                    autoFocus
                  />
                  <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    SUBMIT
      </Button>
                </form>
                {/* {this.state.items.length ? (
                  <List>
                    {this.state.items.map(item => {
                      return (
                        <ListItem key={item._id}>
                          <Typography>
                            {item.item}
                          </Typography>
                          <Link to={`/evacuationlists/${item._id}`} />
                          <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.deleteEvacuationlists(item._id)}>
                            Delete
                        <Delete className={classes.rightIcon} />
                          </Button>
                        </ListItem>
                      );
                    })}
                  </List>
                ) : (
                    <Typography variant="subtitle1">
                      No Results to Display
            </Typography>
                  )} */}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Evacuationlists.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Evacuationlists)