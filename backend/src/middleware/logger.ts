import { MiddlewareFn } from 'type-graphql'
import { Context } from '../types/Context'

export const logger: MiddlewareFn<Context> = async ({ context }, next) => {
  console.log((context.req as any).userId)
  await next()
}
