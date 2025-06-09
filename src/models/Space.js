class Space {
  constructor(id, name, type, capacity, pricePerHour) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.capacity = capacity;
    this.pricePerHour = pricePerHour;
    this.reservations = [];
  }

  addReservation(reservation) {
    this.reservations.push(reservation);
  }

  removeReservation(reservationId) {
    this.reservations = this.reservations.filter(r => r.id !== reservationId);
  }
}

module.exports = Space; 