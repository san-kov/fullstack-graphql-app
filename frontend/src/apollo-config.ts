import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { RetryLink } from 'apollo-link-retry'
const BACKEND_URL = 'http://localhost:8080/graphql'

const httpLink = new HttpLink({
  uri: BACKEND_URL,
  credentials: 'include'
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(graphQLErrors)
  }
  if (networkError) {
    console.log(networkError)
  }
})

const retryLink = new RetryLink()

const link = ApolloLink.from([errorLink, retryLink, httpLink])

const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache
})

export default client
