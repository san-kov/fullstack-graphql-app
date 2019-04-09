import React from 'react'
import { getSeries } from '../../graphql/seriesQuery'
import Series from '../../components/Series/Series'
import { Query } from 'react-apollo'
import { SeriesData } from '../../generated/SeriesData'
class GetSeries extends Query<SeriesData> {}

const SeriesList: React.SFC<{}> = props => {
  return (
    <GetSeries query={getSeries}>
      {({ data, error, loading }) => {
        if (loading) return 'loading'
        if (error || !data) return null

        console.log(data)
        return (
          <div className="series-list">
            {data.getAllSeries!.map(series => (
              <Series item={false} series={series} />
            ))}
          </div>
        )
      }}
    </GetSeries>
  )
}

export default SeriesList
