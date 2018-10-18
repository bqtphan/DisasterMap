import React from 'react';
const { compose, withProps, withStateHandlers } = require("recompose");
const {
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} = require("react-google-maps");


const DisasterMap = compose(
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
        defaultCenter = {{lat: 36, lng: -113}}
        center = {props.currentLoc}
    >
        {props.markers.map((id, index) =>
            <Marker key={index} position={id.location}             
            onClick={props.onToggleOpen}
            >
                {props.isOpen && <InfoWindow
                 onCloseClick={props.onToggleOpen}>
                    <div style={{ fontSize: `12px`, fontColor: `#08233B`, textAlign: `center`, fontFamily:'Bai Jamjuree, sans-serif'}}>
                      Type: {id.alert}:{id.situation} <br></br> Msg: {id.message}
                    </div>
                </InfoWindow>}
            </Marker>
        )}
    </GoogleMap>
);

export default DisasterMap;