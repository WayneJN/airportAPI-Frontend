import React from 'react';

const GateSelector = ({ gates, selectedGate, onChange }) => {
    return (
        <div>
            <label htmlFor="gate-select">Gate:</label>
            <select
                id="gate-select"
                value={selectedGate}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Select a gate</option>
                {gates.map((gate) => (
                    <option key={gate.id} value={gate.id}>
                        {gate.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default GateSelector;
