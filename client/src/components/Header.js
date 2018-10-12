import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Button, TextField, InputAdornment, FormControlLabel, Checkbox, Avatar } from '@material-ui/core';
import { Menu, PermIdentity, Lock, AccountCircle } from '@material-ui/icons';
import LoginModal from './SimpleModal';
import { Redirect } from 'react-router-dom';
import { auth } from '../components/firebase';


const drawerWidth = 240;

const styles = theme => ({
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    grow: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    avatar: {
        margin: 10,
    },
});

const Header = ({ classes, theme, onDrawerToggle, onOpenModal, onCloseModal, modal, email, password, onInputChange, onLoginSubmit, userLogin }) => {

    onLoginSubmit = () => {
        const { email, password } = this.state
        if (email && password) {
            auth.doSignInWithEmailAndPassword(email, password)
                .then(res => console.log("It works"))
                .catch(err => console.log(err))
        }
    }

    return (
        <Fragment>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={onDrawerToggle}
                        className={classes.navIconHide}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap className={classes.grow} >
                        Disaster Map
                    </Typography>

                    {userLogin ? (
                                    
                                        <div>
                                          <IconButton
                                            color="inherit"
                                          >
                                            <AccountCircle />
                                          </IconButton>
                                          </div>
                    ) : (
                        <Fragment>
                        <Button href="/signup" color="inherit">Sign Up</Button>
                        <Button onClick={onOpenModal} color="inherit">Login</Button>
                        </Fragment>
                    )}
                    

                    <LoginModal
                        ariaLabel="Login"
                        ariaDescription="Sign in using your email and password."
                        open={modal}
                        onClose={onCloseModal}
                    >
                        <Typography variant="h6">
                            Welcome
                    </Typography>
                        <form className={classes.container} onSubmit={onLoginSubmit}>

                            <TextField
                                id="email"
                                label="Email"
                                name="email"
                                type="text"
                                className={classes.textField}
                                value={email}
                                onChange={onInputChange}
                                margin="normal"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><PermIdentity /></InputAdornment>,
                                }}
                                required
                                autoComplete="email"
                                autoFocus
                            />

                            <TextField
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                className={classes.textField}
                                value={password}
                                onChange={onInputChange}
                                margin="normal"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><Lock /></InputAdornment>,
                                }}
                                required
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />

                            <Button type="submit" variant="contained" color="primary" className={classes.button}>
                                Log in
                            </Button>
                        </form>
                    </LoginModal>
                </Toolbar>
            </AppBar>

        </Fragment >
    );
}


Header.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Header);