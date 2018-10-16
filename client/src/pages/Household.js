import React, { Component } from "react";
// import API from "../utils/API";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MenuItem, Card, CardContent, CardHeader, CardActions, Grid, Button, TextField } from '@material-ui/core';
import { PersonAdd, Home } from '@material-ui/icons';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit * 2,
    },
    containerScroll: {
        overflow: 'auto',
        maxHeight: '100vh',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    menu: {
        width: 200,
    },
});

class Household extends Component {
    state = {
        household: "",
        householdName: "",
        firstName: "",
        lastName: "",
        relationship: "",
    };

    componentDidMount() {
        // this.loadHousehold();
    }

    loadHousehold = () => {
        // API.getAllEvacuationLists()
        //   .then(res => this.setState({ items: res.data, item: "" }))
        //   .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleCreateHousehold = () => {
        
        if (this.state.householdName) {
          console.log(this.state.householdName)
        }
    };
    handleAddHousehold = () => {
        
        const { firstName, lastName, relationship } = this.state
        if ( firstName && lastName && relationship ) {
          console.log("Added ", firstName, lastName, relationship)
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container spacing={24} className={classes.containerScroll}>
                    <Grid item xs={12} md={4} >
                        <Card>
                            <Grid item>
                                <CardHeader title="Create a household" />
                            </Grid>
                            <Grid item>
                                <CardContent>
                                    <TextField
                                        id="household"
                                        label="Name of Household"
                                        name="householdName"
                                        className={classes.textField}
                                        value={this.state.householdName}
                                        onChange={this.handleInputChange}
                                        margin="normal"
                                        fullWidth
                                    />
                                </CardContent>
                            </Grid>
                            <Grid item>
                                <CardActions className={classes.actions} disableActionSpacing>
                                    <Button variant="contained" color="primary" className={classes.button} aria-label="Add to favorites" onClick={this.handleCreateHousehold}>
                                        Create household
            <Home className={classes.rightIcon} />
                                    </Button>
                                </CardActions>
                            </Grid>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardHeader title="Add a person to your household" />
                            <CardContent>
                                <Grid container item xs={12} md={12} spacing={8}>
                                    <Grid item={12} md={6}>
                                        <Grid item>
                                            <TextField
                                                id="firstName"
                                                label="First Name"
                                                name="firstName"
                                                className={classes.textField}
                                                value={this.state.firstName}
                                                onChange={this.handleInputChange}
                                                margin="normal"
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
                                                className={classes.textField}
                                                value={this.state.lastName}
                                                onChange={this.handleInputChange}
                                                margin="normal"
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
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
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions className={classes.actions} disableActionSpacing>
                                <Button variant="contained" color="primary" className={classes.button} aria-label="Add to favorites" onClick={this.handleAddHousehold}>
                                    Add to household
            <PersonAdd className={classes.rightIcon} />
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                </Grid>

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