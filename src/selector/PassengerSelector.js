import React from 'react';

const PassengerSelector = ({ passengers, selectedPassenger, onChange }) => (
    <div>
        <label htmlFor="passenger-select">Passenger:</label>
        <select
            id="passenger-select"
            value={selectedPassenger}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="">Select a passenger</option>
            {passengers.map((passenger) => (
                <option key={passenger.id} value={passenger.id}>
                    {passenger.name}
                </option>
            ))}
        </select>
    </div>
);

export default PassengerSelector;
