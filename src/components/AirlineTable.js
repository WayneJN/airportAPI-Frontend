import React from 'react';

const AirlineTable = ({ airlines }) => (
    <div className="container mt-4">
        <h3>Airlines</h3>
        <table className="table table-bordered">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Country</th>
            </tr>
            </thead>
            <tbody>
            {airlines.map(airline => (
                <tr key={airline.id}>
                    <td>{airline.id}</td>
                    <td>{airline.name}</td>
                    <td>{airline.country}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default AirlineTable;
