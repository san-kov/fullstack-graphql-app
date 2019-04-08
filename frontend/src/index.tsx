import React from 'react'
import ReactDOM from 'react-dom'

import './styles/styles.scss'

import client from './apollo-config'
import { ApolloProvider } from 'react-apollo'
import App from './App'

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
