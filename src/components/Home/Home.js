import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData/fakeData.json";
import Header from "../Header/Header";
import Vehicle from "../Vehicle/Vehicle";
import "./Home.css";

const Home = () => {
    const [vehicles, setVehicle] = useState([]);

    useEffect(() => {
        const vehicles = fakeData;
        setVehicle(vehicles);
    }, []);

    return (
        <div className="home">
            <Header />
            <div className="container pt-3">
                <div className="d-flex flex-wrap justify-content-center">
                    {vehicles.map((vehicle) => (
                        <Vehicle key={vehicle.id} vehicle={vehicle} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
