import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import SideNavBar from "./components/SideNavBar";
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// Pages
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Dashboard from './pages/Dashboard';
import EmergencyKits from './pages/EmergencyKits';
import Map from './pages/Map';
import Evacuationlists from "./pages/evacuationlists";
import Homelists from "./pages/homelists";

const styles = theme => ({
    root: {
        flexGrow: 1,
        minHeight: '100vh',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
})

class App extends Component {
    state = {
        mobileOpen: false,
        modal: false,
        email: "",
        password: "",
        userLogin: false
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    }

    handleOpenModal = () => {
    this.setState({ modal: true });
    };

    handleCloseModal = () => {
    this.setState({ modal: false });
    };

    handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
        [name]: value
    });
    };

    handleLoginSubmit = event => {
    // Preventing the default behavior of the Login submit (which is to refresh the page)
    event.preventDefault();
    
    // ==================================
    // FIREBASE AUTHENTICATION GOES HERE 

    // TESTING WITH DUMMY DATA: EMAIL-David PW-code
    if(this.state.email === "David" && this.state.password === "code") {
        this.setState({
            userLogin: true,
            email: "",
            password: "",
            modal: false
        })
    }
    // ==================================
    
    };

    render() {
        const { classes, theme } = this.props;

        return <Router>
            <div className={classes.root}>
                <CssBaseline />

                <Header
                    onDrawerToggle={this.handleDrawerToggle}
                    mobileOpen={this.state.mobileOpen}
                    modal={this.state.modal}
                    onOpenModal={this.handleOpenModal}
                    onCloseModal={this.handleCloseModal}
                    email={this.state.email}
                    password={this.state.password}
                    onInputChange={this.handleInputChange}
                    onLoginSubmit={this.handleLoginSubmit}
                    userLogin={this.state.userLogin}
                />

                <SideNavBar
                    onDrawerToggle={this.handleDrawerToggle}
                    mobileOpen={this.state.mobileOpen}
                    userLogin={this.state.userLogin}
                />

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/dashboard" component={Dashboard} /> 
                        <Route exact path="/map" component={Map} />
                        <Route exact path="/evacuationlists" component={Evacuationlists} />
                        <Route exact path="/homelists" component={Homelists} />
                        <Route component={NoMatch} />
                    </Switch>
                </main>
            </div>

        </Router>
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App)
