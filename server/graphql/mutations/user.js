const graphql = require('graphql');
const UserType = require('../types/user');
const auth = require('../../controllers/auth');

const {
  GraphQLString
} = graphql;

const userMutation = {
  signup: {
    type: UserType,
    args: {
      email: {type: GraphQLString},
      password: {type: GraphQLString},
      firstName: {type: GraphQLString},
      lastName: {type: GraphQLString}
    },
    resolve: (parent, args, req) => {
      return auth.signup({args, req});
    }
  },
  login: {
    type: UserType,
    args: {
      email: {type: GraphQLString},
      password: {type: GraphQLString},
    },
    resolve: (parent, {email, password}, req) => {
      return auth.login({email, password, req})
    }
  },
  logout: {
    type: UserType,
    resolve: (parent, args, req) => {
      req.logout();
      return req.user;
    }
  }
}

module.exports = userMutation;