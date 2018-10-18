import React, { Component } from "react";
// import { Provider } from 'react-redux';
// import configureStore from './store/configureStore';
// import { createBrowserHistory } from "history";

import Header from "./components/Header";
import SideNavBar from "./components/SideNavBar";
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { auth } from './components/firebase';

// Pages
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Dashboard from './pages/Dashboard';
import Map from './pages/Map';
import Evacuationlists from "./pages/evacuationlists";
import Homelists from "./pages/homelists";
import Resources from './pages/Resources';
import Shelters from './pages/Shelters';
import Announcement from './pages/Announcement';
import SignUp from './pages/SignUp';
import Household from './pages/Household';
import API from './utils/API';

// const store = configureStore();
// const hist = createBrowserHistory();

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100vh',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
})

class App extends Component {
    state = {
        user: "",
        mobileOpen: false,
        modal: false,
        email: "",
        password: "",
        anchorEl: null,
    };

    componentDidMount() {
        if (!this.state.user._id) {
            const userId = sessionStorage.getItem('id');
            API.getUser(userId)
            .then(res => this.setState({ user: res.data}))
            .catch(err => console.log(err));
        }
    }

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
        const { email, password } = this.state
        const { history } = this.props;

        // Clear sessionStorage
        sessionStorage.clear();

        // if (email && password) {
        auth.doSignInWithEmailAndPassword(email, password)
            .then(res => {
                API.getUserByEmail(email).then(res => {
                    const userData = res.data[0]
                    // Store all content into sessionStorage
                    sessionStorage.setItem("id", userData._id);
                    return this.setState({ user: userData, modal: false })
                }).catch(err => console.log(err));

            })
            .catch(err => alert(err))

    };

    handleLogOut = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        auth.doSignOut();
        this.setState({user: ""})
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes, theme, ...rest } = this.props;
        const { user } = this.state;
        return (
            // <Provider store={store}>
            <Router>
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
                        user={user}
                        handleMenu={this.handleMenu}
                        open={Boolean(this.state.anchorEl)}
                        anchorEl={this.state.anchorEl}
                        handleMenuClose={this.handleMenuClose}
                        handleLogOut = {this.handleLogOut}
                    />

                    <SideNavBar
                        onDrawerToggle={this.handleDrawerToggle}
                        mobileOpen={this.state.mobileOpen}
                        user={user}
                    />

                    <Switch>
                        <Route exact path="/" render={props => <Home {...props} user={user} />} />
                        <Route exact path="/dashboard" render={props => <Dashboard {...props} user={user} />} />
                        <Route exact path="/map" render={props => <Map {...props} user={user} />} />
                        <Route exact path="/evacuationlists" render={props => <Evacuationlists {...props} user={user} />} />
                        <Route exact path="/homelists" render={props => <Homelists {...props} user={user} />} />
                        <Route exact path="/shelters" render={props => <Shelters {...props} user={user} />} />
                        <Route exact path="/resources" render={props => <Resources {...props} user={user} />} />
                        <Route exact path="/announcement" render={props => <Announcement {...props} user={user} />} />
                        <Route exact path="/household" render={props => <Household {...props} user={user} />} />
                        <Route exact path="/signup" render={props => <SignUp {...props} user={user} />} />
                        <Route render={props => <NoMatch {...props} user />} />
                    </Switch>
                </div>
            </Router>
            // </Provider>
        )
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App)
