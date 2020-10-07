export interface PublicTopicsInterface {
  series: string[];
}

export interface SeriesEpisodeInterface {
  name: string;
  description: string;
  videoId: string;
  diamonds: string[];
}

export interface SeriesSeasonInterface {
  name: string;
  episodes: SeriesEpisodeInterface[];
}

export interface SeriesInterface {
  id: string;
  name: string;
  description: string;
  topics: string[];
  thumbnail: string;
  slideshowImages: string[];
  fans: string[];
  seasons: SeriesSeasonInterface[];
}
