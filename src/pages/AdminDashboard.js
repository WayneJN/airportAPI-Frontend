import React, { useEffect, useState } from 'react';
import '../css/Dashboard.css';
import EditModal from '../components/EditModal';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({
                            flights,
                            passengers,
                            airports,
                            aircraft,
                            airlines,
                            cities,
                            onAddEntity,
                            onUpdateEntity,
                            onDeleteEntity
                        }) => {
    const navigate = useNavigate();
    const [view, setView] = useState('flights');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalEntityType, setModalEntityType] = useState('');
    const [modalEntityId, setModalEntityId] = useState(null);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const role = localStorage.getItem('userRole');
        if (!isLoggedIn || role !== 'admin') {
            navigate('/login');
        }
    }, [navigate]);

    const handleEdit = (entityType, entityId) => {
        setModalEntityType(entityType);
        setModalEntityId(entityId);
        setModalOpen(true);
    };

    const handleAdd = (entityType) => {
        setModalEntityType(entityType);
        setModalEntityId(null); // null means "new"
        setModalOpen(true);
    };

    const handleDelete = (entityType, entityId) => {
        onDeleteEntity(entityType, entityId);
    };

    const handleModalSuccess = () => {
        setModalOpen(false);
        // Optional: trigger a refresh or re-fetch here
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    const renderTable = () => {
        const entityType = view.slice(0, -1); // 'flights' → 'flight'
        const addButton = (
            <button
                className="crud-button add"
                onClick={() => handleAdd(entityType)}
            >
                Add New {entityType.charAt(0).toUpperCase() + entityType.slice(1)}
            </button>
        );

        switch (view) {
            case 'flights':
                return (
                    <>
                        {addButton}
                        <table>
                            <thead>
                            <tr>
                                <th>Origin</th>
                                <th>Destination</th>
                                <th>Airline</th>
                                <th>Departure</th>
                                <th>Arrival</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {flights.map((flight, index) => (
                                <tr key={index}>
                                    <td>{flight.originAirportCode}</td>
                                    <td>{flight.destinationAirportCode}</td>
                                    <td>{flight.airlineName}</td>
                                    <td>{flight.departureTime}</td>
                                    <td>{flight.arrivalTime}</td>
                                    <td>
                                        <button className="crud-button update" onClick={() => handleEdit('flight', flight.id)}>Update</button>
                                        <button className="crud-button delete" onClick={() => handleDelete('flight', flight.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                );
            case 'passengers':
                return (
                    <>
                        {addButton}
                        <table>
                            <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Passport</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {passengers.map((p, index) => (
                                <tr key={index}>
                                    <td>{p.firstName}</td>
                                    <td>{p.lastName}</td>
                                    <td>{p.email}</td>
                                    <td>{p.phoneNumber}</td>
                                    <td>{p.passportNumber}</td>
                                    <td>
                                        <button className="crud-button update" onClick={() => handleEdit('passenger', p.id)}>Update</button>
                                        <button className="crud-button delete" onClick={() => handleDelete('passenger', p.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                );
            case 'airports':
                return (
                    <>
                        {addButton}
                        <table>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Code</th>
                                <th>City</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {airports.map((a, index) => (
                                <tr key={index}>
                                    <td>{a.name}</td>
                                    <td>{a.code}</td>
                                    <td>{a.city?.name}</td>
                                    <td>
                                        <button className="crud-button update" onClick={() => handleEdit('airport', a.id)}>Update</button>
                                        <button className="crud-button delete" onClick={() => handleDelete('airport', a.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                );
            case 'aircraft':
                return (
                    <>
                        {addButton}
                        <table>
                            <thead>
                            <tr>
                                <th>Model</th>
                                <th>Manufacturer</th>
                                <th>Capacity</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {aircraft.map((a, index) => (
                                <tr key={index}>
                                    <td>{a.model}</td>
                                    <td>{a.manufacturer}</td>
                                    <td>{a.capacity}</td>
                                    <td>
                                        <button className="crud-button update" onClick={() => handleEdit('aircraft', a.id)}>Update</button>
                                        <button className="crud-button delete" onClick={() => handleDelete('aircraft', a.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                );
            case 'airlines':
                return (
                    <>
                        {addButton}
                        <table>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Country</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {airlines.map((a, index) => (
                                <tr key={index}>
                                    <td>{a.name}</td>
                                    <td>{a.code}</td>
                                    <td>{a.country}</td>
                                    <td>
                                        <button className="crud-button update" onClick={() => handleEdit('airline', a.id)}>Update</button>
                                        <button className="crud-button delete" onClick={() => handleDelete('airline', a.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                );
            case 'cities':
                return (
                    <>
                        {addButton}
                        <table>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>State</th>
                                <th>Population</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cities.map((c, index) => (
                                <tr key={index}>
                                    <td>{c.name}</td>
                                    <td>{c.state}</td>
                                    <td>{c.population}</td>
                                    <td>
                                        <button className="crud-button update" onClick={() => handleEdit('city', c.id)}>Update</button>
                                        <button className="crud-button delete" onClick={() => handleDelete('city', c.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="ticker">
            <h2 className="dashboard-title">Admin Dashboard</h2>

            <div className="view-toggle">
                {['flights', 'passengers', 'airports', 'aircraft', 'airlines', 'cities'].map(type => (
                    <button
                        key={type}
                        className={view === type ? 'active' : ''}
                        onClick={() => setView(type)}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>

            {renderTable()}

            {modalOpen && (
                <EditModal
                    entityType={modalEntityType}
                    entityId={modalEntityId}
                    onClose={() => setModalOpen(false)}
                    onSuccess={handleModalSuccess}
                    onAddEntity={onAddEntity}
                    onUpdateEntity={onUpdateEntity}
                />
            )}

            <div className="logout-container">
                <button className="logout-button" onClick={handleLogout}>
                    Logout / Back to Login
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
