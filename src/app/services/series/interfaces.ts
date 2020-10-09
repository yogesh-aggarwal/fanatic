export interface SeriesEpisodeInterface {
  id: string;
  name: string;
  description: string;
  videoId: string;
  diamonds: string[];
}

export interface SeasonInterface {
  id: string;
  name: string;
  nEpisodes: number;
  diamonds: string[];
  episodes?: SeriesEpisodeInterface[];
}

export interface SeriesInterface {
  id: string;
  name: string;
  description: string;
  topics: string[];
  thumbnail: string;
  slideshowImages: string[];
  fans: string[];
  views: string[];
  diamonds: string[];
  seasons?: SeasonInterface[];
}
