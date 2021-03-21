import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import React from "react";
import { apiKey } from "./MapKey";

const loactions = [
    {
        id: 1,
        lat: 23.8103,
        lng: 90.4125,
    },
    {
        id: 1,
        lat: 23.901,
        lng: 90.4088,
    },
    {
        id: 1,
        lat: 23.7932,
        lng: 90.2713,
    },
];

const Map = () => {
    return <GoogleMap defaultZoom={10} defaultCenter={{ lat: 23.8103, lng: 90.4125 }} />;
};

const WrappedMap = withScriptjs(
    withGoogleMap((props) => (
        <GoogleMap defaultZoom={10} defaultCenter={{ lat: 23.8103, lng: 90.4125 }}>
            {
                loactions.map(loc => (
                    <Marker key={loc.id} position={{lat: loc.lat, lng: loc.lng}}/>
                ))
            }
        </GoogleMap>
    ))
);


const GMap = () => {
    return (
        <div style={{ width: "50vw", height: "50vh" }}>
            <WrappedMap
                isMarkerShown
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
};

export default GMap;
