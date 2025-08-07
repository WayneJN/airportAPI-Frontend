import React from 'react';

const GateTable = ({ gates }) => (
    <div className="container mt-4">
        <h3>Gates</h3>
        <table className="table table-bordered">
            <thead>
            <tr>
                <th>ID</th>
                <th>Airport</th>
                <th>Gate Number</th>
            </tr>
            </thead>
            <tbody>
            {gates.map(gate => (
                <tr key={gate.id}>
                    <td>{gate.id}</td>
                    <td>{gate.airport}</td>
                    <td>{gate.number}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default GateTable;
