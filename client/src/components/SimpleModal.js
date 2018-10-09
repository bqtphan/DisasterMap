import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';

const styles = theme => ({
    modal: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

const SimpleModal = (props) => {

    const { classes, open, onClose, children, ariaLabel, ariaDescription } = props;

    return (
        <div>
            <Modal
                aria-labelledby={ariaLabel}
                aria-describedby={ariaDescription}
                open={open}
                onClose={onClose}
            >
                <div className={classes.modal}>
                    {children}
                </div>
            </Modal>
        </div >
    );
}


SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleModal);