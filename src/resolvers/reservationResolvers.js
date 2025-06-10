const { v4: uuidv4 } = require('uuid');
const Reservation = require('../models/Reservation');

// Import data stores
const spaces = require('./spaceResolvers').spaces;
const users = require('./userResolvers').users;

// In-memory data store
const reservations = [];

const reservationResolvers = {
  Query: {
    reservations: () => reservations,
    reservation: (_, { id }) => reservations.find(res => res.id === id)
  },

  Mutation: {
    createReservation: (_, { spaceId, userId, startTime, endTime }) => {
      // Validate space exists
      const space = spaces.find(s => s.id === spaceId);
      if (!space) {
        throw new Error(`Space with ID ${spaceId} not found`);
      }

      // Validate user exists
      const user = users.find(u => u.id === userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      const start = new Date(startTime);
      const end = new Date(endTime);

      // Validate time slot
      if (start >= end) {
        throw new Error('End time must be after start time');
      }

      // Check for conflicts
      const hasConflict = space.reservations.some(res => 
        res.status !== 'CANCELLED' &&
        ((new Date(res.startTime) <= end && new Date(res.endTime) >= start))
      );

      if (hasConflict) {
        throw new Error('Time slot is already reserved');
      }

      const reservation = new Reservation(
        uuidv4(),
        space,
        user,
        startTime,
        endTime
      );

      reservations.push(reservation);
      space.addReservation(reservation);
      user.addReservation(reservation);

      return reservation;
    },

    cancelReservation: (_, { id }) => {
      const reservation = reservations.find(res => res.id === id);
      if (!reservation) {
        throw new Error(`Reservation with ID ${id} not found`);
      }
      reservation.updateStatus('CANCELLED');
      return reservation;
    },

    updateReservationStatus: (_, { id, status }) => {
      const reservation = reservations.find(res => res.id === id);
      if (!reservation) {
        throw new Error(`Reservation with ID ${id} not found`);
      }
      reservation.updateStatus(status);
      return reservation;
    }
  }
};

module.exports = reservationResolvers; 