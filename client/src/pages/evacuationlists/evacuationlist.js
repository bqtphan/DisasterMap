import React, { Component } from "react";
import API from "../../utils/API";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, TextField, Button, List, ListItem, ListItemText, Checkbox, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import SimpleModal from '../../components/SimpleModal';
// import { connect } from 'react-redux';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '100vh'
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
  },
  containerScroll: {
    overflow: 'auto',
    maxHeight: '100vh'
  }
});

let recommendedItems = [
  {item:"Copies of your important papers in a waterproof bag",checked: false},
  {item:"Extra set of car and house keys", checked: false}, 
  {item:"Extra mobile phone charger", checked: false},
  {item:"Bottled water and snacks such as energy or granola bars",checked: false},
  {item:"First-aid supplies, flashlight, and whistle",checked: false},
  {item:"Battery-powered or hand-crank radio (with extra batteries, if needed)",checked: false},
  {item:"A list of the medications each member of your family needs and at least a 14-day supply of each medication",checked: false},
  {item:"Toothpaste, toothbrushes, wet cleansing wipes, and so on",checked: false},
  {item:"Contact and meeting place information for your family and a map of your local area",checked: false},
  {item:"A stuffed animal or toy for your child and something to help occupy their time, like books or coloring books. If this includes a hand-held video game, make sure you have extra batteries",checked: false},
  {item:"Rain ponchos",checked: false},
  {item:"External mobile phone battery pack or solar charger. Some hand-crank flashlights will also include a phone charger",checked: false},
  {item:"Escape Tool for your car", checked: false}
]

class Evacuationlists extends Component {
  state = {
    items: [],
    item: "",
    editItem: "",
    editItemId: "",
    modal: false,
    kit: false
  };

  componentDidMount() {
    this.loadEvacuationlists();
  }

  loadEvacuationlists = () => {
    API.getAllEvacuationLists()
      .then(res => this.setState({ items: res.data, item: ""}))
      .catch(err => console.log(err));
  };

  deleteEvacuationlists = id => {
    API.deletelists(id)
      .then(res => this.loadEvacuationlists())
      .catch(err => console.log(err));
  };

  updateItem = () => {
    if (this.state.editItem) {
      API.updateevacuationlists(this.state.editItemId, { item: this.state.editItem })
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
      API.saveevacuationlists({ item: this.state.item })
        .then(res => this.loadEvacuationlists())
        .catch(err => console.log(err));
    }
  };

  handleCheckChange = (event, id) => {
    let item = this.state.items.filter(x => x._id === id)
    item[0].checked = event.target.checked
    API.updateevacuationlists(id, item[0])
      .then(res => this.loadEvacuationlists())
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
      <Grid container spacing={0} className={classes.scroll}>
        <Grid item xs={12} md={12}>
          <Grid
            container
            spacing={0}
            justify="center"
            
          >
            <Grid item xs={12} md={10}>
              <Paper className={classes.paper}>
                <Typography variant="h6" align="center" color="textPrimary">
                  Evacuation Kit
          </Typography>
                <Typography variant="body1">
                  An evacuation kit is one that you would take with you in case of an evacuation. Evacuation kit should
        be easily portable like a backpack or suitcase on wheels. Store it somewhere you can easily
        get to it.
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
                          <IconButton aria-label="Edit"title="Edit" >
                            <Edit onClick={() => this.handleOpenModal(item._id)} />
                          </IconButton>
                          <IconButton aria-label="Delete" title="Delete" >
                            <Delete onClick={() => this.deleteEvacuationlists(item._id)} />
                          </IconButton>
                        </ListItemSecondaryAction>) 
                        : null
                        }
                        
                      </ListItem>

                    )) : <Typography variant="h6" align="center">
                    You don't have an evacuation kit yet! Start creating one! 
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

Evacuationlists.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    
  }
} 
const mapDispatchToProps = (dispatch) => {
  return {

  }
} 

// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Evacuationlists))
export default withStyles(styles, { withTheme: true })(Evacuationlists)