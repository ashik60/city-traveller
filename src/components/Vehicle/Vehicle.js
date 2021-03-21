import React from "react";
import { useHistory } from "react-router-dom";


const Vehicle = (props) => {
    const { vehicleImage, vehicleType } = props.vehicle;
    const history = useHistory();
    const toTravelPage = (vehicleType) => {
        history.push("/booking/" + vehicleType);
    };
    return (
        <div
            onClick={() => toTravelPage(vehicleType)}
            className="card p-2 mr-2 mt-5"
            style={{ width: "15rem" }}
        >
            <img className="card-img-top" width="80%" height="200px" src={vehicleImage} alt="Card cap"></img>
            <div className="card-body">
                <h3>{vehicleType.toUpperCase()}</h3>
            </div>
        </div>
    );
};

export default Vehicle;
