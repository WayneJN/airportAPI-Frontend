import React, { useState } from 'react';
import '../css/Dashboard.css'; // Reuse the same CSS for consistency

const AdminDashboard = ({ flights, onAddFlight, onUpdateFlight, onDeleteFlight }) => {
    const [newFlight, setNewFlight] = useState({
        destination: '',
        airline: '',
        arrivalTime: '',
        departureTime: '',
        type: 'arrival',
        airportId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewFlight(prev => ({ ...prev, [name]: value }));
    };

    const handleAdd = () => {
        if (newFlight.destination && newFlight.airline) {
            onAddFlight(newFlight);
            setNewFlight({
                destination: '',
                airline: '',
                arrivalTime: '',
                departureTime: '',
                type: 'arrival',
                airportId: ''
            });
        }
    };

    return (
        <div className="ticker">
            <h2 className="dashboard-title">Admin Dashboard</h2>

            <div className="form-section">
                <input
                    type="text"
                    name="destination"
                    placeholder="Destination"
                    value={newFlight.destination}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="airline"
                    placeholder="Airline"
                    value={newFlight.airline}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="arrivalTime"
                    placeholder="Arrival Time"
                    value={newFlight.arrivalTime}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="departureTime"
                    placeholder="Departure Time"
                    value={newFlight.departureTime}
                    onChange={handleChange}
                />
                <select name="type" value={newFlight.type} onChange={handleChange}>
                    <option value="arrival">Arrival</option>
                    <option value="departure">Departure</option>
                </select>
                <input
                    type="text"
                    name="airportId"
                    placeholder="Airport ID"
                    value={newFlight.airportId}
                    onChange={handleChange}
                />
                <button className="crud-button add" onClick={handleAdd}>Add Flight</button>
            </div>

            <table>
                <thead>
                <tr>
                    <th>Destination</th>
                    <th className="text-right">Airline</th>
                    <th className="text-right">Arrival</th>
                    <th className="text-right">Departure</th>
                    <th className="text-right">Type</th>
                    <th className="text-right">Actions</th>
                </tr>
                </thead>
                <tbody>
                {flights.map((flight, index) => (
                    <tr key={index} className="animate-enter animate-enter-active">
                        <td>{flight.destination}</td>
                        <td className="text-right">{flight.airline}</td>
                        <td className="text-right">{flight.arrivalTime}</td>
                        <td className="text-right">{flight.departureTime}</td>
                        <td className="text-right">{flight.type}</td>
                        <td className="text-right">
                            <button className="crud-button update" onClick={() => onUpdateFlight(flight)}>Update</button>
                            <button className="crud-button delete" onClick={() => onDeleteFlight(flight.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
