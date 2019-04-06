import { Column, Entity, BaseEntity, ManyToOne, PrimaryColumn } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Series } from './Series'

@ObjectType()
@Entity()
export class Episode extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  id: string

  @Field()
  @Column()
  title: string

  @Field()
  @Column()
  description: string

  @Field()
  @Column({ type: 'float', default: 0 })
  rating: number

  @ManyToOne(() => Series, series => series.episodes)
  series: Series

  @Field({ nullable: true })
  @Column({ name: 'image_url', nullable: true })
  imageURL: string
}
