import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, TextField, Checkbox, InputAdornment, Button, Stepper, StepContent, Step, StepLabel } from '@material-ui/core';
import { Lock, Person, Email } from '@material-ui/icons'
import API from '../utils/API';
import { auth } from '../components/firebase';
// import { withRouter } from "react-router";
import { withRouter} from 'react-router-dom'; 

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    formContainer: {
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
    container: {
        [theme.breakpoints.up('md')]: {
            margin: theme.spacing.unit * 3,
          }
    }
});

class SignUp extends Component {
    state = {
        name: "",
        // middleName: "",
        // lastName: "",
        // address: "",
        // phoneNumber: "",
        email: "",
        password: "",
        password2: ""
        // activeStep: 0,
    }

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };


    handleRegisterSubmit = async event => {
        event.preventDefault();
        const { name, email, password, password2 } = this.state

        const {
            history,
          } = this.props;

        sessionStorage.clear();
         // Store all content into sessionStorage
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("email", email);

        console.log(name,email,password,password2)
            auth.doCreateUserWithEmailAndPassword (email, password)
            .then(function (user) {
                API.saveUser({ name, email })
                .then(result => console.log(user))
                .catch(err => console.log(err))
                history.push("/");  
            }).catch(function (error) {
            console.log(error.message);
            });
    }

    render() {
        const { classes } = this.props

        return (
            <Grid container spacing={24} className={classes.container}>
                <Grid item xs={12} md={8}>
                    <Paper className={classes.paper}>
              <Typography component="h1" variant="h6" align="center">
              Sign up
          </Typography>
                        <form className={classes.formContainer} onSubmit={this.handleRegisterSubmit}>

                            <TextField
                                id="name"
                                label="Full Name"
                                name="name"
                                type="text"
                                className={classes.textField}
                                value={this.state.firstName}
                                onChange={this.handleInputChange}
                                margin="normal"
                                required
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><Person /></InputAdornment>,
                                }}
                                autoFocus
                                fullWidth
                            />
                            {/* <TextField
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                type="text"
                                className={classes.textField}
                                value={this.state.lastName}
                                onChange={this.handleInputChange}
                                margin="normal"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><Person /></InputAdornment>,
                                }}
                                required
                                fullWidth
                            /> */}
                            <TextField
                                id="email"
                                label="Email"
                                name="email"
                                type="email"
                                className={classes.textField}
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                margin="normal"
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><Email /></InputAdornment>,
                                }}
                                autoComplete="email"
                            />

                            <TextField
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                className={classes.textField}
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                margin="normal"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><Lock /></InputAdornment>,
                                }}
                                required
                                fullWidth
                                autoComplete="current-password"
                            />
                            <TextField
                                id="password2"
                                label="Confirm Password"
                                name="password2"
                                type="password"
                                className={classes.textField}
                                value={this.state.password2}
                                onChange={this.handleInputChange}
                                margin="normal"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><Lock /></InputAdornment>,
                                }}
                                required
                                fullWidth
                                autoComplete="current-password"
                            />

                            <Button type="submit" variant="contained" color="primary" className={classes.button} onClick={(e) => this.handleRegisterSubmit(e,this.state)}>
                                Set up your Account
</Button>
                        </form>

                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SignUp))