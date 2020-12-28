export interface GemsInterface {
  [key: string]: number;
}

export interface SeriesEpisodeInterface {
  id: string;
  name: string;
  index: number;
  description: string;
  videoId: string;
}

export interface SeasonInterface {
  id: string;
  name: string;
  nEpisodes: number;
  gems: GemsInterface;
  episodes?: SeriesEpisodeInterface[];
}

export interface SeriesInterface {
  id: string;
  name: string;
  description: string;
  storyLine: string;
  achievement: string;
  topics: string[];
  thumbnail: string;
  related: string[];
  similar: string[];
  releaseDate: any;
  minAge: number;
  slideshowImages: string[];
  fans: string[];
  views: string[];
  gems: GemsInterface;
  seasons?: SeasonInterface[];
}
