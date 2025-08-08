import React from 'react';

const CityTable = ({ cities }) => (
    <div className="container mt-4">
        <h3>Cities</h3>
        <table className="table table-bordered">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Country</th>
            </tr>
            </thead>
            <tbody>
            {cities.map(city => (
                <tr key={city.id}>
                    <td>{city.id}</td>
                    <td>{city.name}</td>
                    <td>{city.country}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default CityTable;
