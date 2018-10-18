import React, { Component } from "react";
// import API from "../utils/API";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, Avatar, ListItemText, ListItemSecondaryAction, Checkbox, MenuItem, Card, CardContent, CardHeader, CardActions, Grid, Button, TextField } from '@material-ui/core';
import { PersonAdd, Home } from '@material-ui/icons';
import Footer from '../components/Footer';
import API from '../utils/API';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit * 2,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        maxHeight: '100%',
        overflow: 'auto',
    },
    toolbar: theme.mixins.toolbar,
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    menu: {
        width: 200,
    },
    mainContainer: {
        minHeight: 'calc(100% - 123px)'
    }
});

class Household extends Component {
    state = {
        household: "",
        householdName: "",
        firstName: "",
        lastName: "",
        email: "",
        // relationship: "",
        checked: [],
    };

    componentDidMount() {
        this.loadHousehold();
    }

    loadHousehold = () => {
        API.getHouseholdByOwner(this.props.user._id)
          .then(res => {
            this.setState({ household: res.data[0], householdName: "", firstName: "", lastName: ""})
        })
          .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleCreateHousehold = (e) => {
        console.log(this.props.user)
        console.log(this.state.householdName)
        e.preventDefault();
        if (this.state.householdName && this.props.user) {
          API.saveHousehold({
              name: this.state.householdName, 
              users: [{firstName: this.props.user.firstName, lastName: this.props.user.lastName, email: this.props.user.email}],
                createdBy: this.props.user._id
            }).then(res => this.loadHousehold())
            .catch(err => console.log(err));
        }
    };
    handleAddHousehold = (e) => {

        e.preventDefault();
        const { firstName, lastName, email } = this.state
       
        if ( firstName && lastName || email && this.props.user ) {
            let usersArr = {...this.state.household}
            usersArr.users.push({firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email})
          API.updateHousehold(this.props.user._id, usersArr)
          .then(res => this.loadHousehold())
          .catch(err => console.log(err));
        }
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
    
        this.setState({
          checked: newChecked,
        });
      };

    render() {
        const { classes } = this.props;

        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div className={classes.mainContainer}>
                <Grid container spacing={24}>
                    <Grid item xs={12} md={4} >
                        <Card>
                    <form onSubmit={this.handleCreateHousehold}>
                            <Grid item>
                                <CardHeader title="Create a household" />
                            </Grid>
                            <Grid item>
                                <CardContent>
                                    <TextField
                                        id="household"
                                        label="Name of Household"
                                        name="householdName"
                                        type="text"
                                        className={classes.textField}
                                        value={this.state.householdName}
                                        onChange={this.handleInputChange}
                                        margin="normal"
                                        required
                                        fullWidth
                                    />
                                </CardContent>
                            </Grid>
                            <Grid item>
                                <CardActions className={classes.actions} disableActionSpacing>
                                    <Button type="submit" variant="contained" color="primary" className={classes.button} aria-label="Create household">
                                        Create household
            <Home className={classes.rightIcon} />
                                    </Button>
                                </CardActions>
                            </Grid>
                    </form>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card>
                    <form onSubmit={this.handleAddHousehold}>
                            <CardHeader title="Add a person to your household" />
                            <CardContent>
                                <Grid container item xs={12} md={12} spacing={8}>
                                    <Grid item xs={12} md={6}>
                                        <Grid item>
                                            <TextField
                                                id="firstName"
                                                label="First Name"
                                                name="firstName"
                                                type="text"
                                                className={classes.textField}
                                                value={this.state.firstName}
                                                onChange={this.handleInputChange}
                                                margin="normal"
                                                required={!this.state.email}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Grid item>
                                            <TextField
                                                id="lastName"
                                                label="Last Name"
                                                name="lastName"
                                                type="text"
                                                className={classes.textField}
                                                value={this.state.lastName}
                                                onChange={this.handleInputChange}
                                                margin="normal"
                                                required={!this.state.email}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Grid item>
                                            <TextField
                                                id="email"
                                                label="Email"
                                                name="email"
                                                type="email"
                                                className={classes.textField}
                                                value={this.state.email}
                                                onChange={this.handleInputChange}
                                                margin="normal"
                                                required={!this.state.firstName && !this.state.lastName}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    {/* <Grid item xs={12} md={6}>
                                        <Grid item>
                                            <TextField
                                                select
                                                id="relationship"
                                                label="Relationship"
                                                name="relationship"
                                                className={classes.textField}
                                                value={this.state.relationship}
                                                onChange={this.handleInputChange}
                                                margin="normal"
                                                fullWidth
                                                SelectProps={{
                                                    MenuProps: {
                                                      className: classes.menu,
                                                    },
                                                  }}
                                                helperText="Please select your relationship"
                                            >
                                            <MenuItem key={-1} value="">
              Select Relationship
                                                        </MenuItem>
                                     {['Spouse','Sibling', 'Grandparent', 'Aunt', 'Uncle', 'Cousin', 'Niece', 'Nephew', 'Family-in-law', 'Other']
                                                    .map((option, i) => (
                                                        <MenuItem key={option} value={option}>                  {option}
                                                        </MenuItem>
                                         ))                                 }
                                            </TextField>
                                        </Grid>
                                    </Grid> */}
                                </Grid>
                            </CardContent>
                            <CardActions className={classes.actions} disableActionSpacing>
                                <Button type="submit" variant="contained" color="primary" className={classes.button} aria-label="Add to household">
                                    Add to household
            <PersonAdd className={classes.rightIcon} />
                                </Button>
                            </CardActions>
                        </form>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                    <Card>
                            
                                <CardHeader title="Your Household" />
                            
                                <CardContent>
          {this.state.household ? 
          this.state.household.users.map((x, i) => (
                                <List>
              <ListItem key={i} dense button className={classes.listItem}>
              <Avatar alt="Remy Sharp">R</Avatar>
              <ListItemText primary={`${x.firstName} ${x.lastName}`} />
              <ListItemSecondaryAction>
                <Checkbox
                  onChange={this.handleToggle(i)}
                  checked={this.state.checked.indexOf(i) !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
        </List>
            ))
            : <Typography component="p">
            Don't have one! Go create a household first.
          </Typography> 
            } 
              
            
                                </CardContent>                            
                        </Card>
                    </Grid>
                            
                </Grid>
                </div>
                <Footer/>
            </main >
        );
    }
}

Household.propTypes = {
    classes: PropTypes.object.isRequired,
};

// const mapStateToProps = (state) => {
//   return {

//   }
// } 
// const mapDispatchToProps = (dispatch) => {
//   return {

//   }
// } 

// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Household))
export default withStyles(styles, { withTheme: true })(Household)