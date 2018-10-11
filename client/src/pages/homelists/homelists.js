import React, { Component } from "react";
import API from "../../utils/API";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, TextField, Button, Checkbox, FormLabel, FormGroup, FormControlLabel, FormControl, InputAdornment, IconButton } from '@material-ui/core';
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
  {
    item: "Water (one gallon per person per day, for drinking and sanitation—up to a 7-day supply)",
    checked: false
  },
  {
    item: "Non-perishable food (up to a 7-day supply per person)",
    checked: false
  },
  {
    item: "Battery-powered radio (with extra batteries) or hand-crank radio",
    checked: false
  },
  {
    item: "Weather radio with tone alert and extra batteries",
    checked: false
  },
  {
    item: "Flashlight and extra batteries",
    checked: false
  },
  {
    item: "First-aid supplies",
    checked: false
  },
  {
    item: "Whistle to signal for help",
    checked: false
  },
  {
    item: "Filter mask or cotton t-shirt, to help filter the air",
    checked: false
  },
  {
    item: "Moist towelettes, garbage bags, soap, disinfectant, and plastic ties for personal sanitation",
    checked: false
  },
  {
    item: "Wrench or pliers to turn off utilities (water and electric)",
    checked: false
  },
  {
    item: "Manual can opener if your kit contains canned food",
    checked: false
  },
  {
    item: "Plastic sheeting and duct tape to shelter-in-place (see pages 26-27)",
    checked: false
  },
  {
    item: "Plastic tarps for emergency roof repair",
    checked: false
  },
  {
    item: "Items for unique family needs, such as daily prescription medications, infant formula, or diapers",
    checked: false
  },
  {
    item: "Mess kits, paper cups, plates, and plastic utensils",
    checked: false
  },
  {
    item: "Cash and change",
    checked: false
  },
  {
    item: "Paper towels",
    checked: false
  },
  {
    item: "Fire extinguisher",
    checked: false
  },
  {
    item: "Matches in a waterproof container",
    checked: false
  },
  {
    item: "Rain gear, sturdy shoes, long pants, and gloves",
    checked: false
  },
  {
    item: "Important family documents such as copies of insurance policies, identification, birth certificates, passports, and bank account records in a waterproof, portable container",
    checked: false
  },
  {
    item: "A stuffed animal or toy for your child and something to help occupy their time, like books or coloring books. If this includes a hand-held video game, make sure you have extra batteries",
    checked: false
  }
]

class Homelists extends Component {
  state = {
    items: [],
    item: ""
  };



  componentDidMount() {
    this.loadHomelists();
  }

  loadHomelists = () => {
    API.getAllHomelists()
      .then(res => this.setState({ items: res.data }))
      // : this.setState({ items: recommendedItems })
      .catch(err => console.log(err));
  };

  deleteHomelists = id => {
    API.deletHomelists(id)
      .then(res => this.getAllHomelists())
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
      API.savehomelists({item: this.state.item})
        .then(res => this.loadHomelists())
        .catch(err => console.log(err));
    }
  };

  handleCheckChange = (event, index) => {

    let item = { ...this.state.items[index] }
    item.checked = event.target.checked
    const items = [...this.state.items]
    items[index] = item;

    this.setState({
      items
    })
  }

  render() {
    const { classes } = this.props;
    const { items } = this.state

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
                  Home Kit
          </Typography>

                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">Stay-at-Home Kit
        Keep a Stay-at-Home Kit for when you need to shelter at home for an extended period.
Recommended items to consider including in your Stay-at-Home Kit:</FormLabel>
                  <FormGroup>
                    {
                      items.map((item, index) => (
                          <FormControlLabel
                            control={
                              <Checkbox key={index} checked={item.checked} onChange={(event) => this.handleCheckChange(event, index)} value={item.item} />
                            }
                            label={item.item}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="Delete"
                                  onClick={this.deleteHomelists}
                                >
                                  <Delete />
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        ))
                    }
                  </FormGroup>
                </FormControl>
                <form className={classes.container} onSubmit={this.handleFormSubmit}>
                  <TextField
                    id="item"
                    type="text"
                    name="item"
                    label="Item"
                    className={classes.textField}
                    margin="normal"
                    required
                    autoFocus
                    onChange={this.handleInputChange}

                  />
                  <Button type="submit" variant="contained" color="primary" className={classes.button} onClick={this.handleFormSubmit}>
                    SUBMIT
      </Button>
                </form>

                {/* {this.state.items.length ? (
                  <List>
                    {this.state.items.map(items => {
                      return (
                        <ListItem key={items._id}>
                          <Link to={`/homelists/${items._id}`} />
                          <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.deleteHomelists(items._id)}>
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

Homelists.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Homelists)
