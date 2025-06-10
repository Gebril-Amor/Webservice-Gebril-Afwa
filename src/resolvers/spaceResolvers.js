const { v4: uuidv4 } = require('uuid');
const Space = require('../models/Space');

// In-memory data store
const spaces = [];

const spaceResolvers = {
  Query: {
    spaces: () => spaces,
    space: (_, { id }) => spaces.find(space => space.id === id),
    availableSpaces: (_, { startTime, endTime }) => {
      const start = new Date(startTime);
      const end = new Date(endTime);
      
      return spaces.filter(space => {
        const hasConflict = space.reservations.some(res => 
          res.status !== 'CANCELLED' &&
          ((new Date(res.startTime) <= end && new Date(res.endTime) >= start))
        );
        return !hasConflict;
      });
    }
  },

  Mutation: {
    createSpace: (_, { name, type, capacity, pricePerHour }) => {
      const space = new Space(
        uuidv4(),
        name,
        type,
        capacity,
        pricePerHour
      );
      spaces.push(space);
      return space;
    }
  }
};

module.exports = spaceResolvers; 