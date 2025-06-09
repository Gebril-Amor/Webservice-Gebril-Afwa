class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.reservations = [];
  }

  addReservation(reservation) {
    this.reservations.push(reservation);
  }

  removeReservation(reservationId) {
    this.reservations = this.reservations.filter(r => r.id !== reservationId);
  }
}

module.exports = User; 