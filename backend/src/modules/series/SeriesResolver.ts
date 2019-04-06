import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root
} from 'type-graphql'
import { v4 } from 'uuid'

import { Series } from '../../entities/Series'
import { Episode } from '../../entities/Eposide'

@Resolver(Series)
export class SeriesResolver {
  @Query(() => [Series], { nullable: true })
  async getAllSeries(): Promise<Series[]> {
    const series: Series[] = await Series.find()
    return series
  }

  @FieldResolver(() => [Episode], { nullable: true })
  async episodes(@Root() series: Series): Promise<Episode[] | null> {
    const foundSeries = await Series.findOne({
      where: { id: series.id },
      relations: ['episodes']
    })

    console.log(foundSeries)

    if (foundSeries) return foundSeries.episodes

    return null
  }

  @Mutation(() => Series)
  async addSeries(
    @Arg('title') title: string,
    @Arg('description') description: string,
    @Arg('imageURL') imageURL: string
  ): Promise<Series> {
    return await Series.create({
      title,
      description,
      imageURL,
      episodes: [],
      id: v4()
    }).save()
  }
}
