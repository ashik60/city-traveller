import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData/fakeFata";
import Vehicle from "../Vehicle/Vehicle";
import "./Home.css"

const Home = () => {
    const [vehicles, setVehicle] = useState([]);

    useEffect(() => {
        fetch("https://api.jsonbin.io/b/605573767ffeba41c07e6414/4")
            .then((res) => res.json())
            .then((data) => {
                setVehicle(data);
            })
            .catch((err) => console.log("error", err));
        // const vehicles = fakeData;
        // setVehicle(vehicles);
        // console.log(vehicles);
    }, []);
    // console.log(vehicles);
    return (
        <div className="home container pt-3">
            <div className="d-flex flex-wrap justify-content-center">
                {vehicles.map((vehicle) => (
                    <Vehicle key={vehicle.id} vehicle={vehicle} />
                ))}
            </div>
        </div>
    );
};

export default Home;
