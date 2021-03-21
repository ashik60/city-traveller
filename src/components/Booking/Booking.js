import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fakeData from "../../fakeData/fakeData.json";
import Header from "../Header/Header";
import GMap from "./../Map/Map";
import "./Booking.css";

const Booking = () => {
    const { vehicleType } = useParams();
    const vehicle = vehicleType;
    const [vehicles, setVehicle] = useState([]);
    const [from, setFrom] = useState("");
    const [destination, setDestination] = useState("");
    const [destinationSelected, setSestinationSelected] = useState(false);
    //"https://api.jsonbin.io/b/605573767ffeba41c07e6414/4"
    useEffect(() => {
        const vehicles = fakeData;
        setVehicle(vehicles);
    }, []);

    const targetVehicle = vehicles.find(({ vehicleType }) => vehicleType === vehicle) || "";

    const onSearch = (event) => {
        event.preventDefault();
        setSestinationSelected(true);
    };

    const handleChange = (e) => {
        if (e.target.name === "from") setFrom(e.target.value);
        if (e.target.name === "destination") setDestination(e.target.value);
    };

    return (
        <div>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-4 bg-light">
                        <div>
                            {!destinationSelected ? (
                                <form onSubmit={onSearch}>
                                    <div className="form-group">
                                        <label>Pick From</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="from"
                                            required
                                            placeholder="From"
                                            onChange={handleChange}
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Pick To</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="destination"
                                            required
                                            placeholder="Destination"
                                            onChange={handleChange}
                                        ></input>
                                    </div>
                                    <div>
                                        <label>Date </label>
                                        <br />
                                        <input type="date" className="date" name="date"></input>
                                        <br />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Search
                                    </button>
                                </form>
                            ) : (
                                <div className="pt-3 ">
                                    <div className="bg-info p-2 rounded text-white">
                                        <ul class="timeline">
                                            <li> {from}</li>
                                            <li> {destination}</li>
                                        </ul>
                                    </div>
                                    {targetVehicle.fare.map((f) => (
                                        <div className="p-2">
                                            <div className="row  mt-2">
                                                <div className="col-3">
                                                    <img
                                                        width="50px"
                                                        src={targetVehicle.vehicleImage}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-3">
                                                    <h6>{targetVehicle.vehicleType}</h6>
                                                </div>
                                                <div className="col-3">
                                                    <h6>
                                                        <FontAwesomeIcon icon={faUserFriends} />
                                                        {targetVehicle.people}
                                                    </h6>
                                                </div>
                                                <div className="col-3">
                                                    <h6>${f}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-md-8">
                        <GMap />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
