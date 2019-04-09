import gql from 'graphql-tag'

export const register = gql`
  mutation Register($email: String!, $username: String!, $password: String!) {
    register(
      data: { email: $email, username: $username, password: $password }
    ) {
      id
      email
      username
    }
  }
`
