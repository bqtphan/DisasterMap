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
import { Paper, Grid, Typography, TextField, Button, List, ListItem, ListItemText } from '@material-ui/core';
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
        items: []
    };

   

    componentDidMount() {
        this.loadEvacuationlists();
    }


loadEvacuationlists = () => {
  console.log("Hello")
  API.getAllEvacuationLists()
    .then(res =>{
        this.setState({ evacuationlists: res.data, items: ""})
    }
        )
    .catch(err => console.log(err));
};

deleteEvacuationlists = id => {
    API.deleteEvacuatlists(id)
    .then(res => this.getAllEvacuationlists())
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
        items: this.state.items,
        
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
                <Typography variant="title" align="center">
                Evacuation Kit
          </Typography>
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
                {this.state.items.length ? (
                  <List>
                    {this.state.items.map(items => {
                      return (
                        <ListItem key={items._id}>
                          <Link to={`/evacuationlists/${items._id}`} />
                          <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.deleteEvacuationlists(items._id)}>
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
                  )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      // <Container fluid>
      //     {/* <Col size="md-6"> */}
      //       {/* <Jumbotron>
      //         <h1>Disaster Kit</h1>
      //       </Jumbotron>
      //     {/* </Col> */}
      //     <Col size="md-6">
      //       <Jumbotron>
      //         <h1>Evacuation Kit</h1>
      //       </Jumbotron>
      //       <form>
      //         <Input name="item" placeholder="Evacuation Items (required)" />
              
      //         <FormBtn>Submit Item</FormBtn>
      //       </form>
      //       {this.state.items.length ? (
      //         <List>
      //           {this.state.items.map(items => {
      //             return (
      //               <ListItem key={items._id}>
      //                 <a href={"/evacuationlists/" + items._id}>
                        
      //                 </a>
      //                 <DeleteBtn onClick={() => this.deleteEvacuationlists(items._id)} />
      //               </ListItem>
      //             );
      //           })}
      //         </List>
      //       ) : (
      //         <h3>No Results to Display</h3>
      //       )}
      //     </Col>
      // </Container>
    );
  }
}

// export default Evacuationlists;


Evacuationlists.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Evacuationlists)