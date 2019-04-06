import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import { v4 } from 'uuid'

import { Series } from '../../entities/Series'
import { Episode } from '../../entities/Eposide'

@Resolver(Series)
export class EpisodeResolver {
  @Query(() => Episode, { nullable: true })
  async getEpisodeByID(@Arg('id') id: number): Promise<Episode | undefined> {
    return await Episode.findOne({
      where: {
        id
      }
    })
  }

  @Mutation(() => Episode)
  async addEpisode(
    @Arg('seriesId') seriesId: string,
    @Arg('title') title: string,
    @Arg('description') description: string,
    @Arg('imageURL', { nullable: true }) imageURL: string
  ): Promise<Episode> {
    const episode = Episode.create({
      title,
      description,
      imageURL,
      id: v4()
    })

    const series = await Series.findOne({
      where: { id: seriesId },
      relations: ['episodes']
    })

    if (series) {
      console.log(series)
      series.episodes.push(episode)
      await episode.save()
      await series.save()
      return episode
    }

    return await episode.save()
  }
}
