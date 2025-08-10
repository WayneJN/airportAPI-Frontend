import React from 'react';
import '../css/Ticket.css'; // This is your uploaded CSS

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
                    <span className="airline">{flight.airline}</span>
                    <span className="airline airlineslip">{flight.airline}</span>
                    <span className="boarding">Boarding pass</span>

                    <div className="content">
                        <span className="jfk">{flight.departureCode || 'XXX'}</span>
                        <span className="plane">✈️</span>
                        <span className="sfo">{flight.destinationCode || 'YYY'}</span>

                        <span className="jfk jfkslip">{flight.departureCode || 'XXX'}</span>
                        <span className="plane planeslip">✈️</span>
                        <span className="sfo sfoslip">{flight.destinationCode || 'YYY'}</span>

                        <div className="sub-content">
                            <span className="watermark">{flight.airline}</span>
                            <span className="name">PASSENGER NAME<br /><span>{passenger?.firstName || 'John'} {passenger?.lastName || 'Doe'}</span></span>
                            <span className="flight">FLIGHT N°<br /><span>{flight.flightNumber || 'X3-65C3'}</span></span>
                            <span className="gate">GATE<br /><span>11B</span></span>
                            <span className="seat">SEAT<br /><span>5A</span></span>
                            <span className="boardingtime">BOARDING TIME<br /><span>{formatBoardingTime(flight.departureTime)}</span></span>

                            <span className="flight flightslip">FLIGHT N°<br /><span>{flight.flightNumber || 'X3-65C3'}</span></span>
                            <span className="seat seatslip">SEAT<br /><span>5A</span></span>
                            <span className="name nameslip">PASSENGER NAME<br /><span>{passenger?.lastName || 'Doe'}, {passenger?.firstName || 'John'}</span></span>
                        </div>
                    </div>

                    <div className="barcode"></div>
                    <div className="barcode slip"></div>
                </div>
            </div>
            <button className="close-button" onClick={onClose}>Close</button>
        </div>
    );
};

export default TicketModal;
