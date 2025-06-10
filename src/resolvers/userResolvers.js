const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');

// In-memory data store
const users = [];

const userResolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(user => user.id === id)
  },

  Mutation: {
    createUser: (_, { name, email }) => {
      const user = new User(
        uuidv4(),
        name,
        email
      );
      users.push(user);
      return user;
    }
  }
};

module.exports = { ...userResolvers, users }; 