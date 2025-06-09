class Reservation {
  constructor(id, space, user, startTime, endTime, status = 'PENDING') {
    this.id = id;
    this.space = space;
    this.user = user;
    this.startTime = startTime;
    this.endTime = endTime;
    this.status = status;
    this.totalPrice = this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    const start = new Date(this.startTime);
    const end = new Date(this.endTime);
    const hours = (end - start) / (1000 * 60 * 60);
    return this.space.pricePerHour * hours;
  }

  updateStatus(status) {
    this.status = status;
  }
}

module.exports = Reservation; 