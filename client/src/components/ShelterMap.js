import React from 'react';
const { compose, withProps, withStateHandlers } = require("recompose");
const {
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} = require("react-google-maps");

const ShelterMap = compose(
    withStateHandlers(() => ({
        isOpen: false,
    }), {
            onToggleOpen: ({ isOpen }) => () => ({
                isOpen: !isOpen,
            })
        }),
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
        <Marker
            position={{ lat: -34.397, lng: 150.644 }}
            onClick={props.onToggleOpen}
        >
            {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
                <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                    Hello, Kaohsiung!
                </div>
            </InfoWindow>}
        </Marker>
    </GoogleMap>
);


export default ShelterMap;


