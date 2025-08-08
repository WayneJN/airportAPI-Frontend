import React from 'react';

const AircraftTable = ({ aircraft }) => (
    <div className="container mt-4">
        <h3>Aircraft</h3>
        <table className="table table-bordered">
            <thead>
            <tr>
                <th>ID</th>
                <th>Model</th>
                <th>Capacity</th>
                <th>Airline</th>
            </tr>
            </thead>
            <tbody>
            {aircraft.map(plane => (
                <tr key={plane.id}>
                    <td>{plane.id}</td>
                    <td>{plane.model}</td>
                    <td>{plane.capacity}</td>
                    <td>{plane.airline}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default AircraftTable;
