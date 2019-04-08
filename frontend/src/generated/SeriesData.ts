/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SeriesData
// ====================================================

export interface SeriesData_getAllSeries_episodes {
  __typename: "Episode";
  id: string;
  title: string;
  description: string;
  rating: number;
  imageURL: string | null;
}

export interface SeriesData_getAllSeries {
  __typename: "Series";
  id: string;
  title: string;
  description: string;
  episodes: SeriesData_getAllSeries_episodes[] | null;
  imageURL: string;
}

export interface SeriesData {
  getAllSeries: SeriesData_getAllSeries[] | null;
}
