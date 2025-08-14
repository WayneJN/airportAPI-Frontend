import React from 'react';
import '../css/Ticket.css';

const TicketModal = ({ flight, passenger, onClose }) => {
    const formatBoardingTime = (departureTime) => {
        const dep = new Date(departureTime);
        dep.setHours(dep.getHours() - 2);
        return dep.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="modal-overlay">
            <div className="ticket-wrapper">
                <div className="ticket">
                    {/* Header */}
                    <div className="ticket-header">
                        <span className="header-left">{flight.airlineName || 'Air Canada'}</span>
                        <span className="header-right">Boarding Pass</span>
                    </div>

                    <div className="ticket-content">
                        <div className="info-row">
                            <span>Passenger</span>
                            <span>{passenger?.firstName || 'John'} {passenger?.lastName || 'Doe'}</span>
                        </div>
                        <div className="info-row">
                            <span>Seat</span>
                            <span>{flight.seat || '12A'}</span>
                        </div>
                        <div className="info-row">
                            <span>Boarding Time</span>
                            <span>{formatBoardingTime(flight.departureTime)}</span>
                        </div>

                        <div className="tear-line"></div>

                        <div className="slip-info">
                            Flight: {flight.flightNumber || 'AC123'}<br />
                            Gate: {flight.gate || 'B7'}<br />
                            Departure: {flight.departureCode || 'YYT'}<br />
                            Arrival: {flight.destinationCode || 'YYZ'}
                        </div>
                    </div>
                    <div className="barcode">
                        {Array.from({ length: 10 }, (_, i) => (
                            <span key={i}></span>
                        ))}
                    </div>


                    {/* Red Bottom Bar */}
                    <div className="ticket-footer-bar"></div>
                </div>

                {/* Close Button outside ticket */}
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default TicketModal;
