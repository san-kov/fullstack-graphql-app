import 'reflect-metadata'
import express from 'express'

import { ApolloServer } from 'apollo-server-express'
import { buildSchema, ArgumentValidationError } from 'type-graphql'
import { createConnection } from 'typeorm'

import { UserResolver } from './modules/user/UserResolver'
import { SeriesResolver } from './modules/series/SeriesResolver'
import { EpisodeResolver } from './modules/episode/EpisodeResolver'

import jwt from 'jsonwebtoken'

import cookieParser from 'cookie-parser'
import { GraphQLError } from 'graphql'

const start = async () => {
  await createConnection()

  const schema = await buildSchema({
    resolvers: [UserResolver, SeriesResolver, EpisodeResolver],
    authChecker: ({ context: { req } }) => !!req.userId
  })

  const app = express()

  app.use(cookieParser())

  app.use((req, _, next) => {
    const { token } = req.cookies
    if (token) {
      try {
        const { userId } = jwt.verify(token, 'kek') as any
        let myReq = req as any
        myReq.userId = userId
      } catch (e) {
        next()
      }
    }

    next()
  })
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    formatError: (error: GraphQLError) => {
      if (error.originalError instanceof ArgumentValidationError) {
        return {
          ...error,
          extensions: {
            ...error.extensions,
            exception: { ...error!.extensions!.exception, stacktrace: '' }
          }
        }
      }

      return new GraphQLError('internal server error')
    }
  })

  apolloServer.applyMiddleware({
    app,
    cors: { origin: 'http://localhost:3000', credentials: true }
  })

  app.listen(8080, () => console.log('listening on 8080'))
}

start()
