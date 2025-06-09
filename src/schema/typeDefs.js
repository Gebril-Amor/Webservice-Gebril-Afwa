const { gql } = require('apollo-server');

const typeDefs = gql`
  type Space {
    id: ID!
    name: String!
    type: SpaceType!
    capacity: Int!
    pricePerHour: Float!
    reservations: [Reservation!]
  }

  type User {
    id: ID!
    name: String!
    email: String!
    reservations: [Reservation!]
  }

  type Reservation {
    id: ID!
    space: Space!
    user: User!
    startTime: String!
    endTime: String!
    status: ReservationStatus!
    totalPrice: Float!
  }

  enum SpaceType {
    DESK
    MEETING_ROOM
    PRIVATE_OFFICE
  }

  enum ReservationStatus {
    PENDING
    CONFIRMED
    CANCELLED
  }

  type Query {
    spaces: [Space!]!
    space(id: ID!): Space
    users: [User!]!
    user(id: ID!): User
    reservations: [Reservation!]!
    reservation(id: ID!): Reservation
    availableSpaces(startTime: String!, endTime: String!): [Space!]!
  }

  type Mutation {
    createSpace(
      name: String!
      type: SpaceType!
      capacity: Int!
      pricePerHour: Float!
    ): Space!
    
    createUser(
      name: String!
      email: String!
    ): User!
    
    createReservation(
      spaceId: ID!
      userId: ID!
      startTime: String!
      endTime: String!
    ): Reservation!
    
    cancelReservation(id: ID!): Reservation!
    
    updateReservationStatus(
      id: ID!
      status: ReservationStatus!
    ): Reservation!
  }
`;

module.exports = typeDefs; 