export const formConfig = {
    aircraft: {
        label: 'Aircraft',
        fields: [
            { name: 'model', label: 'Model', type: 'text' },
            { name: 'manufacturer', label: 'Manufacturer', type: 'text' },
            { name: 'capacity', label: 'Capacity', type: 'number' }
        ]
    },
    airline: {
        label: 'Airline',
        fields: [
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'code', label: 'Code', type: 'text' },
            { name: 'country', label: 'Country', type: 'text' }
        ]
    },
    airport: {
        label: 'Airport',
        fields: [
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'code', label: 'Code', type: 'text' },
            { name: 'city', label: 'City', type: 'dropdown', optionsFrom: 'cities' }
        ]
    },
    city: {
        label: 'City',
        fields: [
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'state', label: 'State', type: 'text' },
            { name: 'country', label: 'Country', type: 'text' },
            { name: 'population', label: 'Population', type: 'number' }
        ]
    },
    flight: {
        label: 'Flight',
        fields: [
            { name: 'flightNumber', label: 'Flight Number', type: 'text' },
            { name: 'departureTime', label: 'Departure Time', type: 'datetime-local' },
            { name: 'arrivalTime', label: 'Arrival Time', type: 'datetime-local' },
            { name: 'aircraft', label: 'Aircraft', type: 'dropdown', optionsFrom: 'aircraft' },
            { name: 'originAirport', label: 'Origin Airport', type: 'dropdown', optionsFrom: 'airports' },
            { name: 'destinationAirport', label: 'Destination Airport', type: 'dropdown', optionsFrom: 'airports' },
            { name: 'airline', label: 'Airline', type: 'dropdown', optionsFrom: 'airlines' },
            { name: 'gate', label: 'Gate', type: 'dropdown', optionsFrom: 'gates' }
        ]
    },
    gate: {
        label: 'Gate',
        fields: [
            { name: 'gateNumber', label: 'Gate Number', type: 'text' },
            { name: 'airport', label: 'Airport', type: 'dropdown', optionsFrom: 'airports' }
        ]
    },
    passenger: {
        label: 'Passenger',
        fields: [
            { name: 'firstName', label: 'First Name', type: 'text' },
            { name: 'lastName', label: 'Last Name', type: 'text' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'phoneNumber', label: 'Phone Number', type: 'text' },
            { name: 'passportNumber', label: 'Passport Number', type: 'text' },
            { name: 'city', label: 'City', type: 'dropdown', optionsFrom: 'cities' }
        ]
    }
};
