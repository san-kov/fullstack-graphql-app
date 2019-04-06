import { PrimaryColumn, Column, Entity, BaseEntity, OneToMany } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Episode } from './Eposide'

@ObjectType()
@Entity()
export class Series extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: string

  @Field()
  @Column()
  title: string

  @Field()
  @Column()
  description: string

  @OneToMany(() => Episode, episode => episode.series)
  episodes: Episode[]

  @Field()
  @Column({ unique: true, name: 'image_url' })
  imageURL: string
}
