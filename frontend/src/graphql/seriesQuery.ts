import gql from 'graphql-tag'
import { SERIES_FRAGMENT, SERIES_ITEM_FRAGMENT } from './fragments'

export const getSeries = gql`
  query SeriesData {
    getAllSeries {
      ...Series
    }
  }

  ${SERIES_FRAGMENT}
`

export const getSeriesById = gql`
  query SeriesItemData($id: String!) {
    getSeriesById(id: $id) {
      ...SeriesItem
    }
  }

  ${SERIES_ITEM_FRAGMENT}
`
