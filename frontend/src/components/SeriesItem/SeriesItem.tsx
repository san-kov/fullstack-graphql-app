import React from 'react'
import { graphql, ChildDataProps } from 'react-apollo'
import {
  SeriesItemData,
  SeriesItemDataVariables
} from '../../generated/SeriesItemData'
import { getSeriesById } from '../../graphql/seriesQuery'
import Series from '../Series/Series'

interface ISeriesItemProps {
  id: string
}

type ChildProps = ChildDataProps<
  ISeriesItemProps,
  SeriesItemData,
  SeriesItemDataVariables
>

const SeriesItem: React.SFC<ChildProps> = ({ data }) => {
  if (data.loading) return <p>loading</p>

  if (!data.getSeriesById || data.error) return null

  return (
    <div>
      <Series item series={data.getSeriesById} />
      <div>{data.getSeriesById.description}</div>
      <button>Add to watchlist</button>
    </div>
  )
}

const withSeriesItem = graphql<
  ISeriesItemProps,
  SeriesItemData,
  SeriesItemDataVariables,
  ChildProps
>(getSeriesById, {
  options: ({ id }) => ({
    variables: { id }
  })
})

export default withSeriesItem(SeriesItem)
