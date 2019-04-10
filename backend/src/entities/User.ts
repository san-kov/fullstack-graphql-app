import { PrimaryColumn, Column, Entity, BaseEntity } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: string

  @Field()
  @Column()
  username: string

  @Field()
  @Column('text', { unique: true })
  email: string

  @Column()
  password: string
}
