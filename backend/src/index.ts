import 'reflect-metadata'
import express from 'express'

import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'

import { UserResolver } from './modules/user/UserResolver'
import { SeriesResolver } from './modules/series/SeriesResolver'
import { EpisodeResolver } from './modules/episode/EpisodeResolver'

import jwt from 'jsonwebtoken'

import cookieParser from 'cookie-parser'
import cors from 'cors'

const start = async () => {
  await createConnection()

  const schema = await buildSchema({
    resolvers: [UserResolver, SeriesResolver, EpisodeResolver]
  })
  const app = express()

  app.use(cookieParser())
  app.use(
    cors({
      credentials: true
    })
  )

  app.use((req, _, next) => {
    const { token } = req.cookies
    if (token) {
      const { userId } = jwt.verify(token, 'kek') as any
      let myReq = req as any
      myReq.userId = userId
    }

    next()
  })
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res })
  })

  apolloServer.applyMiddleware({ app })

  app.listen(8080, () => console.log('listening on 8080'))
}

start()
