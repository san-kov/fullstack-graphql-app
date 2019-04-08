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

export const getSeriesById = gql`
  query SeriesItemData($id: String!) {
    getSeriesById(id: $id) {
      id
      title
      description
      episodes {
        title
        description
        id
      }
    }
  }
`
