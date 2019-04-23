import React from 'react'
import { graphql, ChildDataProps } from 'react-apollo'
import {
  SeriesItemData,
  SeriesItemDataVariables
} from '../../generated/SeriesItemData'
import { getSeriesById } from '../../graphql/seriesQuery'
import Series from '../Series/Series'
import { useQuery } from 'react-apollo-hooks'
import { CurrentUser } from '../../generated/CurrentUser'
import { getCurrentUser } from '../../graphql/userQuery'
import Loader from '../Loader'
import WithUser from '../HOCs/WithUser'

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
  const { data: userData, loading, error } = useQuery<CurrentUser>(
    getCurrentUser
  )

  if (!data.getSeriesById || data.error) return null

  return (
    <div>
      <Series item series={data.getSeriesById} />
      <div>{data.getSeriesById.description}</div>
      <WithUser>
        <button>add to watchlist</button>
      </WithUser>
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
