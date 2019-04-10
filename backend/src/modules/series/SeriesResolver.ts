import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  UseMiddleware,
  Authorized
} from 'type-graphql'
import { v4 } from 'uuid'

import { Series } from '../../entities/Series'
import { Episode } from '../../entities/Eposide'
import { logger } from '../../middleware/logger'

@Resolver(Series)
export class SeriesResolver {
  @UseMiddleware(logger)
  @Query(() => [Series], { nullable: true })
  async getAllSeries(): Promise<Series[]> {
    const series: Series[] = await Series.find()
    return series
  }

  @Query(() => Series, { nullable: true })
  async getSeriesById(@Arg('id') id: string): Promise<Series | null> {
    const series = await Series.findOne({ where: { id } })
    if (!series) return null
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

  @Authorized()
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
