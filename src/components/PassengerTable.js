import React from 'react';

const PassengerTable = ({ passengers }) => (
    <div className="container mt-4">
        <h3>Passengers</h3>
        <table className="table table-bordered">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Flight</th>
                <th>Seat</th>
            </tr>
            </thead>
            <tbody>
            {passengers.map(passenger => (
                <tr key={passenger.id}>
                    <td>{passenger.id}</td>
                    <td>{passenger.name}</td>
                    <td>{passenger.flight}</td>
                    <td>{passenger.seat}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default PassengerTable;
