import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css';
import { getEntityById, updateEntity, createEntity, getDropdownOptions } from './api';
import { formConfig } from './formConfig';
import '../css/Modal.css';

const EditModal = ({ entityType, entityId, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [dropdowns, setDropdowns] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (entityId !== null) {
                    const data = await getEntityById(entityType, entityId);
                    setFormData(data);
                }

                const config = formConfig[entityType];
                const dropdownFields = config.fields.filter(f => f.type === 'dropdown');

                const dropdownData = {};
                for (const field of dropdownFields) {
                    dropdownData[field.name] = await getDropdownOptions(field.optionsFrom);
                }

                setDropdowns(dropdownData);
                setLoading(false);
            } catch (err) {
                setError('Failed to load data');
                setLoading(false);
            }
        };

        fetchData();
    }, [entityType, entityId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            if (entityId === null) {
                await createEntity(entityType, formData); // ✅ Create new
            } else {
                await updateEntity(entityType, entityId, formData); // ✅ Update existing
            }
            onSuccess();
            onClose();
        } catch (err) {
            setError('Save failed');
        }
    };

    const config = formConfig[entityType];
    if (!config) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{entityId === null ? `Add New ${config.label}` : `Edit ${config.label}`}</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <form>
                        {config.fields.map(field => (
                            <div key={field.name} className="form-group">
                                <label>{field.label}</label>
                                {field.type === 'dropdown' ? (
                                    <select
                                        name={field.name}
                                        value={formData[field.name]?.id || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        {dropdowns[field.name]?.map(opt => (
                                            <option key={opt.id} value={opt.id}>
                                                {opt.name || opt.code || opt.gateNumber}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                    />
                                )}
                            </div>
                        ))}
                        {error && <p className="error">{error}</p>}
                        <div className="modal-actions">
                            <button type="button" onClick={handleSubmit}>Save</button>
                            <button type="button" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditModal;
