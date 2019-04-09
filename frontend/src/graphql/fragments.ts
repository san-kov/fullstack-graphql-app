import gql from 'graphql-tag'

export const SERIES_FRAGMENT = gql`
  fragment Series on Series {
    id
    title
    description
    imageURL
    rating
  }
`

export const SERIES_ITEM_FRAGMENT = gql`
  fragment SeriesItem on Series {
    id
    title
    description
    imageURL
    rating
    episodes {
      title
      description
      id
    }
  }
`
