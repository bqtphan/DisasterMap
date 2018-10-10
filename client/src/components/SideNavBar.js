import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, List, Hidden, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Dashboard, BusinessCenter, Map, Home, Announcement, Work, Help, LocationCity } from '@material-ui/icons';
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

                <Divider />

                <ListItem button component={Link} to="/evacuationlists">
                    <ListItemIcon>
                        <Work />
                    </ListItemIcon>
                    <ListItemText primary="Evacuation Kit" />
                </ListItem>
                <ListItem button component={Link} to="/homelists">
                    <ListItemIcon>
                        <BusinessCenter />
                    </ListItemIcon>
                    <ListItemText primary="Home Kit" />
                </ListItem>

                <ListItem button component={Link} to="/shelters">
                    <ListItemIcon>
                        <LocationCity />
                    </ListItemIcon>
                    <ListItemText primary="Shelters" />
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