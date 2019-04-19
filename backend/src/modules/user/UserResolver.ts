import { Resolver, Mutation, Arg, Ctx, Query } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { User } from '../../entities/User'

import { v4 } from 'uuid'
import { RegisterInput } from './RegisterInput'
import { Context } from '../../types/Context'

import jwt from 'jsonwebtoken'
import { LoginInput } from './LoginInput'
import { formatErrors } from './FormatErrors'

@Resolver(User)
export class UserResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('data') { email, password }: LoginInput,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } })

    if (!user)
      throw formatErrors([{ path: 'email', message: 'User not found' }])

    const valid = await bcrypt.compare(password, user.password)

    if (!valid)
      throw formatErrors([{ path: 'password', message: 'Password is wrong' }])

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

  @Mutation(() => Boolean)
  logout(@Ctx() ctx: Context): Boolean {
    try {
      ctx.res.clearCookie('token')
      return true
    } catch (e) {
      return false
    }
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | null> {
    const userId = (ctx.req as any).userId

    const user = await User.findOne({ where: { id: userId } })
    if (!user) return null
    return user
  }
}
