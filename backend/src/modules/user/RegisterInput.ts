import { InputType, Field } from 'type-graphql'
import { Length, IsEmail } from 'class-validator'
import { UniqueEmail } from './UniqueEmail'

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 30)
  username: string

  @Field()
  @IsEmail()
  @UniqueEmail({ message: 'Email is already in use' })
  email: string

  @Field()
  password: string
}
