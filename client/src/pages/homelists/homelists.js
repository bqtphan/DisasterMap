import React, { Component } from "react";
import API from "../../utils/API";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, TextField, Button, Checkbox, List, ListItemText , ListItemSecondaryAction, ListItem, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import SimpleModal from '../../components/SimpleModal';

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
  slashedText: {
    textDecoration: "line-through"
  }
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
    item: "",
    editItem: "",
    editItemId: "",
    modal: false,
  };



  componentDidMount() {
    this.loadHomelists();
  }

  loadHomelists = () => {
    API.getAllHomelists()
    .then(res => this.setState({ items: res.data, item: "" }))
      .catch(err => console.log(err));
  };

  deleteHomelists = id => {
    API.deletehomelists(id)
      .then(res => this.loadHomelists())
      .catch(err => console.log(err));
  };

  updateItem = () => {
    if (this.state.editItem) {
      API.updatehomelists(this.state.editItemId, { item: this.state.editItem })
        .then(res => this.loadEvacuationlists())
        .catch(err => console.log(err));
    }
  }

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

  handleCheckChange = (event, id) => {
    let item = this.state.items.filter(x => x._id === id)
    item[0].checked = event.target.checked
    API.updatehomelists(id, item[0])
      .then(res => this.loadHomelists())
      .catch(err => console.log(err));
  }

  handleOpenModal = (id) => {
    let editItem = this.state.items.filter(x => x._id === id)[0].item
    this.setState({ modal: true, editItem, editItemId: id });
  };

  handleCloseModal = () => {
    this.setState({ modal: false, editItem: "", editItemId: "" });
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
                  Home Kit
          </Typography>
          <Typography variant="body1">
          Keep a Stay-at-Home Kit for when you need to shelter at home for an extended period.
          </Typography>
                
<List>
                  {
                    this.state.items.length ? 
                    this.state.items.map((item, index) => (
                      <ListItem
                        key={index}
                        dense
                        className={classes.listItem}
                      >
                        <Checkbox
                          checked={item.checked}
                          tabIndex={-1}
                          disableRipple
                          onChange={(event) => this.handleCheckChange(event, item._id)}
                        />
                        <ListItemText primary={item.item} className={item.checked && classes.slashedText}/>
                        {
                          !item.checked ? (<ListItemSecondaryAction >
                          <IconButton aria-label="Edit" >
                            <Edit onClick={() => this.handleOpenModal(item._id)} />
                          </IconButton>
                          <IconButton aria-label="Delete" >
                            <Delete onClick={() => this.deleteHomelists(item._id)} />
                          </IconButton>
                        </ListItemSecondaryAction>) 
                        : null
                        }
                        
                      </ListItem>

                    )) : <Typography variant="h6" align="center">
                    You don't have an home kit yet! Start creating one! 
            </Typography>
                  }
                </List>
                <form>
                  <TextField
                    id="item"
                    type="text"
                    name="item"
                    label="Item"
                    className={classes.textField}
                    margin="normal"
                    required
                    autoFocus
                    value={this.state.item}
                    onChange={this.handleInputChange}
                    helperText="List any other additional items that your family might need"
                  />
                  <Button size="medium" type="submit" variant="contained" color="primary" className={classes.button} onClick={this.handleFormSubmit}>
                    SUBMIT
                  </Button>
                </form>
                {
                  this.state.modal ? (
                  <SimpleModal
                    ariaLabel="Edit"
                    ariaDescription="Edit current item"
                    open={this.state.modal}
                    onClose={this.handleCloseModal}
                  >
                    <Typography variant="h6">
                      Edit
                    </Typography>
                    <form className={classes.container}>
                      <TextField
                        id="editItem"
                        label="Item"
                        name="editItem"
                        type="text"
                        className={classes.textField}
                        value={this.state.editItem}
                        onChange={this.handleInputChange}
                        margin="normal"
                      />
                      <Button type="submit" variant="contained" color="primary" className={classes.button} onClick={this.updateItem}>
                        Save
                      </Button>
                    </form>
                  </SimpleModal>) : null
                }
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
