import React from 'react'
import { RouteComponentProps } from 'react-router'
import SeriesItem from '../components/SeriesItem/SeriesItem'

interface MatchType {
  id: string
}

const SeriesPage: React.SFC<RouteComponentProps<MatchType>> = ({
  match: {
    params: { id }
  }
}) => {
  return (
    <div className="series-page">
      <SeriesItem id={id} />
    </div>
  )
}

export default SeriesPage
