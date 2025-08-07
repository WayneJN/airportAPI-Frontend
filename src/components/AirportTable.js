import React from 'react';

const AirportTable = ({ airports }) => (
    <div className="container mt-4">
        <h3>Airports</h3>
        <table className="table table-bordered">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>City</th>
                <th>Code</th>
            </tr>
            </thead>
            <tbody>
            {airports.map(airport => (
                <tr key={airport.id}>
                    <td>{airport.id}</td>
                    <td>{airport.name}</td>
                    <td>{airport.city}</td>
                    <td>{airport.code}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default AirportTable;
