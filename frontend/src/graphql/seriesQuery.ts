import gql from 'graphql-tag'

export const getSeries = gql`
  query SeriesData {
    getAllSeries {
      id
      title
      description
      episodes {
        id
        title
        description
        rating
        imageURL
      }
      imageURL
    }
  }
`
