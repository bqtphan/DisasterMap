import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, List, Hidden, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Dashboard, Assignment, Map, Home, Announcement, DepartureBoard, Style, Help, LocationCity } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({

    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        minHeight: '100vh',
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    }
});

const MyLink = props => <Link to="/emergencykits" {...props} />
const SideNavBar = ({ classes, theme, onDrawerToggle, mobileOpen, userLogin }) => {

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemIcon>
                        <Home />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>

                {userLogin ? <ListItem button component={Link} to="/dashboard">
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem> : null}

                <ListItem button component={Link} to="/announcement">
                    <ListItemIcon>
                        <Announcement />
                    </ListItemIcon>
                    <ListItemText primary="Announcement" />
                </ListItem>

                <ListItem button component={Link} to="/evacuationlists">
                    <ListItemIcon>
                        <Style />
                    </ListItemIcon>
                    <ListItemText primary="Evacuation List" />
                </ListItem>
                <ListItem button component={Link} to="/homelists">
                    <ListItemIcon>
                        <Style />
                    </ListItemIcon>
                    <ListItemText primary="Home List" />
                </ListItem>

                <ListItem button component={Link} to="/evacuationplan">
                    <ListItemIcon>
                        <DepartureBoard />
                    </ListItemIcon>
                    <ListItemText primary="Evacuation Plan" />
                </ListItem>
                <ListItem button component={Link} to="/shelter">
                    <ListItemIcon>
                        <LocationCity />
                    </ListItemIcon>
                    <ListItemText primary="Shelter" />
                </ListItem>
                <ListItem button component={Link} to="/map">
                    <ListItemIcon>
                        <Map />
                    </ListItemIcon>
                    <ListItemText primary="Map" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button component={Link} to="/resources">
                    <ListItemIcon>
                        <Help />
                    </ListItemIcon>
                    <ListItemText primary="Resources" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <Fragment>
            <Hidden mdUp>
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={onDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    variant="permanent"
                    open
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </Fragment>
    );
}


SideNavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SideNavBar);