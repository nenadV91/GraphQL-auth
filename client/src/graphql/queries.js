import gql from 'graphql-tag';

const current = gql`
  query Current {
    user {
      id
      email
      firstName
      lastName
    }
  }
`

export {
  current
}