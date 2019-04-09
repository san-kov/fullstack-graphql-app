/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SeriesItem
// ====================================================

export interface SeriesItem_episodes {
  __typename: "Episode";
  title: string;
  description: string;
  id: string;
}

export interface SeriesItem {
  __typename: "Series";
  id: string;
  title: string;
  description: string;
  imageURL: string;
  rating: number;
  episodes: SeriesItem_episodes[] | null;
}
