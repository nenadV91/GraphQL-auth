const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: {type: GraphQLID},
    email: {type: GraphQLString},
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString}
  })
})

module.exports = UserType;
