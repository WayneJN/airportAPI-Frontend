import React from 'react';

const FlightTable = ({ flights }) => (
    <div className="container mt-4">
        <h3>Flights</h3>
        <table className="table table-bordered">
            <thead>
            <tr>
                <th>ID</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Departure</th>
                <th>Arrival</th>
            </tr>
            </thead>
            <tbody>
            {flights.map(flight => (
                <tr key={flight.id}>
                    <td>{flight.id}</td>
                    <td>{flight.origin}</td>
                    <td>{flight.destination}</td>
                    <td>{flight.departureTime}</td>
                    <td>{flight.arrivalTime}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default FlightTable;
