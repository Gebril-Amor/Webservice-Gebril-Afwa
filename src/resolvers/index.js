const { v4: uuidv4 } = require('uuid');
const { differenceInHours } = require('date-fns');

// In-memory data store
const spaces = [];
const users = [];
const reservations = [];

const spaceResolvers = require('./spaceResolvers');
const userResolvers = require('./userResolvers');
const reservationResolvers = require('./reservationResolvers');

const resolvers = {
  Query: {
    ...spaceResolvers.Query,
    ...userResolvers.Query,
    ...reservationResolvers.Query
  },
  Mutation: {
    ...spaceResolvers.Mutation,
    ...userResolvers.Mutation,
    ...reservationResolvers.Mutation
  }
};

module.exports = resolvers; 