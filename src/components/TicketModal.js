import React from 'react';
import '../css/Ticket.css';

const TicketModal = ({ flight, passenger, onClose }) => {
    const formatBoardingTime = (departureTime) => {
        const dep = new Date(departureTime);
        dep.setHours(dep.getHours() - 2);
        return dep.toLocaleString();
    };

    return (
        <div className="modal-overlay">
            <div className="box">
                <ul className="left">{Array.from({ length: 14 }, (_, i) => <li key={i}></li>)}</ul>
                <ul className="right">{Array.from({ length: 14 }, (_, i) => <li key={i}></li>)}</ul>

                <div className="ticket">
                    <span className="airline">{flight.airlineName || flight.airline || 'Airline'}</span>
                    <span className="boarding">Boarding Pass</span>

                    <div className="content">
                        <div className="route">
                            <span className="code">{flight.departureCode || 'XXX'}</span>
                            <span className="plane">✈️</span>
                            <span className="code">{flight.destinationCode || 'YYY'}</span>
                        </div>

                        <div className="details">
                            <div>
                                <strong>Passenger:</strong><br />
                                {passenger?.firstName || 'John'} {passenger?.lastName || 'Doe'}
                            </div>
                            <div>
                                <strong>Flight #:</strong><br />
                                {flight.flightNumber || 'X3-65C3'}
                            </div>
                            <div>
                                <strong>Gate:</strong><br />
                                {flight.gate || '11B'}
                            </div>
                            <div>
                                <strong>Seat:</strong><br />
                                {flight.seat || '5A'}
                            </div>
                            <div>
                                <strong>Boarding Time:</strong><br />
                                {formatBoardingTime(flight.departureTime)}
                            </div>
                        </div>
                    </div>

                    <div className="barcode"></div>
                </div>
            </div>
            <button className="close-button" onClick={onClose}>Close</button>
        </div>
    );
};

export default TicketModal;
