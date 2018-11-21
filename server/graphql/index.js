const graphql = require('graphql');
const userQuery = require('./queries/user');
const userMutation = require('./mutations/user');

const {
  GraphQLObjectType,
  GraphQLSchema
} = graphql;

const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    ...userQuery
  }
})

const mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    ...userMutation
  }
})

module.exports = new GraphQLSchema({query, mutation});