import React, { Component } from 'react'
import { Query, graphql, ChildDataProps } from 'react-apollo'
import {
  SeriesItemData,
  SeriesItemDataVariables
} from '../generated/SeriesItemData'
import { getSeriesById } from '../graphql/seriesQuery'

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

  return <div>{JSON.stringify(data.getSeriesById)}</div>
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
