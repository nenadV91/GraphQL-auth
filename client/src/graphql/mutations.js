import gql from 'graphql-tag';

const signup = gql`
  mutation Signup(
    $email: String,
    $password: String,
    $firstName: String,
    $lastName: String
  ) {
    signup(
      email: $email,
      password: $password,
      firstName: $firstName,
      lastName: $lastName
    ) {
      id
      email
    }
  }
`

const login = gql`
  mutation Login(
    $email: String,
    $password: String
  ) {
    login(
      email: $email,
      password: $password
    ) {
      id
      email
    }
  }
`

const logout = gql`
  mutation Logout {
    logout {
      id
      email
    }
  }
`

export {
  signup,
  login,
  logout
}