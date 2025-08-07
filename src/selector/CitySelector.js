import React from 'react';

const CitySelector = ({ cities, selectedCity, onChange }) => (
    <div>
        <label htmlFor="city-select">City:</label>
        <select
            id="city-select"
            value={selectedCity}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="">Select a city</option>
            {cities.map((city) => (
                <option key={city.id} value={city.id}>
                    {city.name}
                </option>
            ))}
        </select>
    </div>
);

export default CitySelector;
