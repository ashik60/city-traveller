import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Booking = () => {
    const { vehicleType } = useParams();
    const vehicle = vehicleType;
    const [vehicles, setVehicle] = useState([]);
    const [destinationSelected, setSestinationSelected] = useState(false);

    useEffect(() => {
        fetch("https://api.jsonbin.io/b/605573767ffeba41c07e6414/4")
            .then((res) => res.json())
            .then((data) => {
                setVehicle(data);
            })
            .catch((err) => console.log("error", err));
    }, []);

    const targetVehicle = vehicles.find(({ vehicleType }) => vehicleType === vehicle) || "";

    function onSearch() {
        setSestinationSelected(true);
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-4 bg-light">
                    <div>
                        {!destinationSelected ? (
                            <form>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Pick From</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="From"
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputPassword1">Pick To</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Destination"
                                    ></input>
                                </div>
                                <h5 onClick={onSearch} className="btn btn-primary">
                                    Search
                                </h5>
                            </form>
                        ) : (
                            <div className="">
                                <div className="bg-info rounded text-white">
                                    <h3>From: </h3>
                                    <h3>To: </h3>
                                </div>

                                <div className="row">
                                    <div className="col-md-3">
                                        <img width="80%" src={targetVehicle.vehicleImage} alt="" />
                                    </div>
                                    <div className="col-md-3">
                                        <h4>{targetVehicle.vehicleType}</h4>
                                    </div>
                                    <div className="col-md-3">
                                        <h4>{targetVehicle.people}</h4>
                                    </div>
                                    <div className="col-md-3">
                                        <h4>{targetVehicle.fare}</h4>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-md-8">
                    <img src={targetVehicle.vehicleImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Booking;
