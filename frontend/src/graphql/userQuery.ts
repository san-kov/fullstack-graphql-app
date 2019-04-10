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

export const login = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      id
      email
      username
    }
  }
`

export const getCurrentUser = gql`
  query CurrentUser {
    me {
      id
      email
      username
    }
  }
`

export const logout = gql`
  mutation Logout {
    logout
  }
`
