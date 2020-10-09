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
  storyLine: string;
  achievement: string;
  topics: string[];
  thumbnail: string;
  releaseDate: any;
  minAge: number;
  slideshowImages: string[];
  fans: string[];
  views: string[];
  diamonds: string[];
  seasons?: SeasonInterface[];
}
