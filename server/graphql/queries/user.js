const graphql = require('graphql');
const UserType = require('../types/user');

const userQuery = {
  user: {
    type: UserType,
    resolve: (parent, args, req) => {
      return req.user
    }
  }
}

module.exports = userQuery;