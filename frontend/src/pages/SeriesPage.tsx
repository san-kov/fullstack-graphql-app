import React from 'react'
import { RouteComponentProps } from 'react-router'
import SeriesItem from '../components/SeriesItem'

interface MatchType {
  id: string
}

const SeriesPage: React.SFC<RouteComponentProps<MatchType>> = ({
  match: {
    params: { id }
  }
}) => {
  return (
    <div>
      <SeriesItem id={id} />
    </div>
  )
}

export default SeriesPage
