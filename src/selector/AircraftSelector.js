import React from 'react';

const AircraftSelector = ({ aircrafts, selectedAircraft, onChange }) => (
    <div>
        <label htmlFor="aircraft-select">Aircraft:</label>
        <select
            id="aircraft-select"
            value={selectedAircraft}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="">Select an aircraft</option>
            {aircrafts.map((aircraft) => (
                <option key={aircraft.id} value={aircraft.id}>
                    {aircraft.model} ({aircraft.registration})
                </option>
            ))}
        </select>
    </div>
);

export default AircraftSelector;
