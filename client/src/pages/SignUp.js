import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, TextField, Checkbox, InputAdornment, Button, Stepper, StepContent, Step, StepLabel } from '@material-ui/core';
import { Lock, Person, Email } from '@material-ui/icons'
import API from '../utils/API';
import { auth } from '../components/firebase';

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
    },
    button: {
        margin: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    steppersRoot: {
        width: '90%',
    },
});

// function getSteps() {
//     return ['Step 1', 'Step 2', 'Step 3'];
// }

// function getStepContent(step) {
//     switch (step) {
//         case 0:
//             return 'Select campaign settings...';
//         case 1:
//             return 'What is an ad group anyways?';
//         case 2:
//             return 'This is the bit I really care about!';
//         default:
//             return 'Unknown step';
//     }
// }

class SignUp extends Component {
    state = {
        name: "",
        // middleName: "",
        // lastName: "",
        address: "",
        // phoneNumber: "",
        email: "",
        password: "",
        password2: ""
        // activeStep: 0,
    }

    // handleNext = () => {
    //     const { activeStep } = this.state;
    //     let {  } = this.state;
    //     this.setState({
    //         activeStep: activeStep + 1
    //     });
    // };

    // handleBack = () => {
    //     this.setState(state => ({
    //         activeStep: state.activeStep - 1,
    //     }));
    // };

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };


    handleRegisterSubmit = (event) => {
        event.preventDefault();
        const { name, email, password, password2 } = this.state
        if (name && email && password && password2) {
            auth.doCreateUserWithEmailAndPassword (email, password)
            .then(function (user) {
                console.log(user);
                // API.saveUser({ name, email })
                // .then(result => console.log("It works"))
                // .catch(err => console.log(err))
            }).catch(function (error) {
            console.log(error.message);
            });
        }
    }

    render() {
        const { classes } = this.props
        // const steps = getSteps();
        // const { activeStep } = this.state;

        return (
            <Grid container spacing={24}>
                <Grid item xs={12} md={8}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6">
                            Sign up
              </Typography>
                        <form className={classes.container} onSubmit={this.handleRegisterSubmit}>

                            {/* <div className={classes.steppersRoot}>
                                <Stepper activeStep={activeStep}>
                                    {steps.map((label, index) => {
                                        const props = {};
                                        const labelProps = {};

                                        return (
                                            <Step key={label} {...props}>
                                                <StepLabel {...labelProps}>{label}</StepLabel>
                                            </Step>
                                        );
                                    })}
                                </Stepper>
                                <div>
                                    {activeStep === steps.length ? (
                                        <div>
                                            <Typography className={classes.instructions}>
                                                All steps completed - you&quot;re finished
              </Typography>
                                        </div>
                                    ) : (
                                            <div>
                                                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                                <div>
                                                    <Button
                                                        disabled={activeStep === 0}
                                                        onClick={this.handleBack}
                                                        className={classes.button}
                                                    >
                                                        Back
                </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.handleNext}
                                                        className={classes.button}
                                                    >
                                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </div> */}

                            <TextField
                                id="name"
                                label="Full Name"
                                name="Name"
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

                            <Button type="submit" variant="contained" color="primary" className={classes.button}>
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

export default withStyles(styles)(SignUp)