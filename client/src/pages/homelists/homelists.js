import React, { Component } from "react";
// import Jumbotron from "../../components/Jumbotron";
// import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
// import { Col, Container } from "../../components/Grid";
// import { List, ListItem } from "../../components/List";
// import { Input,  FormBtn } from "../../components/Form";
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
  "Water (one gallon per person per day, for drinking and sanitation—up to a 7-day supply)",
  "Non-perishable food (up to a 7-day supply per person)",
  "Battery-powered radio (with extra batteries) or hand-crank radio",
  "Weather radio with tone alert and extra batteries",
  "Flashlight and extra batteries",
  "First-aid supplies",
  "Whistle to signal for help",
  "Filter mask or cotton t-shirt, to help filter the air",
  "Moist towelettes, garbage bags, soap, disinfectant, and plastic ties for personal sanitation",
  "Wrench or pliers to turn off utilities (water and electric)",
  "Manual can opener if your kit contains canned food",
  "Plastic sheeting and duct tape to shelter-in-place (see pages 26-27)",
  "Plastic tarps for emergency roof repair",
  "Items for unique family needs, such as daily prescription medications, infant formula, or diapers",
  "Mess kits, paper cups, plates, and plastic utensils",
  "Cash and change",
  "Paper towels",
  "Fire extinguisher",
  "Matches in a waterproof container",
  "Rain gear, sturdy shoes, long pants, and gloves",
  "Important family documents such as copies of insurance policies, identification, birth certificates, passports, and bank account records in a waterproof, portable container",
  "A stuffed animal or toy for your child and something to help occupy their time, like books or coloring books. If this includes a hand-held video game, make sure you have extra batteries"
    ]

class Homelists extends Component {
  state = {
    homelists: [],
    items: recommendedItems,
    item: ""
  };

  

  componentDidMount() {
    
    // this.loadHomelists();
  }

  loadDefault = () => {
    
    let defaultItems = [...this.state.items].map((x) => {return {item: x, checked: false}})
    console.log(defaultItems)
    this.setState({ items: defaultItems, item: "" })
  }

  loadHomelists = () => {
    console.log("Hello")
    API.getAllHomelists()
      .then(res => {
        
          this.setState({ homelists: res.data, items: res.data, item: "" })
        
      }
      )
      .catch(err => console.log(err));
  };

  deleteHomelists = id => {
    API.deleteHomelists(id)
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
      API.saveHomelists({
        items: this.state.item,

      })
        .then(res => this.loadHomelists())
        .catch(err => console.log(err));
    }
  };

  handleCheckChange = (event, index) => {
    
    let item = {...this.state.items[index]}
    item.checked = event.target.checked
    const items = [...this.state.items]
    items[index] = item;

    this.setState({
      items
    })
  }

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
                <Typography variant="title" align="center">
                  Home Kit
          </Typography>
               
          <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Recommended items for your home kit if you need to shelter at home for an extended period.</FormLabel>
          <FormGroup>
          {/* {this.loadDefault} */}
          {this.state.items.map((item, index) => (
            <FormControlLabel
            control={
              <Checkbox key={index} checked={item.checked} onChange={(event) => this.handleCheckChange(event, index)} value={item} />
            }
            label={item}
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
                    <Typography variant="subheading">
                      No Results to Display
            </Typography>
                  )} */}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      // <Container fluid>
      //   {/* <Row>
      //     <Col size="md-6">
      //     <Jumbotron style={{display: "block"}}>
      //         <h1>Home Kit</h1>
      //     </Jumbotron>
      //     <form>
      //         <Input name="item" placeholder="Home Items (required)" />

      //         <FormBtn>Submit Item</FormBtn>
      //     </form>
      //     </Col>
      //     <Col size="md-6">

      //     </Col>
      //   </Row> */}
      //   <Col size="md-6">
      //     <Jumbotron>
      //       <h1>Home Kit</h1>
      //     </Jumbotron>
      //     <form>
      //       <Input name="item" placeholder="Home Items (required)" />

      //       <FormBtn>Submit Item</FormBtn>
      //     </form>
      //     {this.state.items.length ? (
      //       <List>
      //         {this.state.items.map(items => {
      //           return (
      //             <ListItem key={items._id}>
      //               <a href={"/homelists/" + items._id}>

      //               </a>
      //               <DeleteBtn onClick={() => this.deleteHomelists(items._id)} />
      //             </ListItem>
      //           );
      //         })}
      //       </List>
      //     ) : (
      //         <h3>No Results to Display</h3>
      //       )}
      //   </Col>
      // </Container>
    );
  }
}

Homelists.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Homelists)

        // export default Homelists;
