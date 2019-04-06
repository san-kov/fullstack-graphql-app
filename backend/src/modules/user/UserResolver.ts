import { Resolver, Mutation, Arg, Ctx, Query } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { User } from '../../entities/User'

import { v4 } from 'uuid'
import { RegisterInput } from './RegisterInput'
import { Context } from '../../types/Context'

import jwt from 'jsonwebtoken'
import { LoginInput } from './LoginInput'

@Resolver(User)
export class UserResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('data') { email, password }: LoginInput,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } })
    if (!user) return null

    const valid = bcrypt.compare(password, user.password)

    if (!valid) return null

    const token = jwt.sign({ userId: user.id }, 'kek')

    ctx.res.cookie('token', token)

    return user
  }

  @Mutation(() => User)
  async register(@Arg('data')
  {
    email,
    password,
    username
  }: RegisterInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      id: v4()
    }).save()

    return user
  }

  @Query(() => User)
  async me(@Ctx() ctx: Context): Promise<User | null> {
    const userId = (ctx.req as any).userId
    if (!userId) {
      return null
    }

    const user = await User.findOne({ where: { id: userId } })
    if (!user) return null
    return user
  }
}
