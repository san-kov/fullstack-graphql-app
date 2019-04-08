/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SeriesItemData
// ====================================================

export interface SeriesItemData_getSeriesById_episodes {
  __typename: "Episode";
  title: string;
  description: string;
  id: string;
}

export interface SeriesItemData_getSeriesById {
  __typename: "Series";
  id: string;
  title: string;
  description: string;
  episodes: SeriesItemData_getSeriesById_episodes[] | null;
}

export interface SeriesItemData {
  getSeriesById: SeriesItemData_getSeriesById | null;
}

export interface SeriesItemDataVariables {
  id: string;
}
