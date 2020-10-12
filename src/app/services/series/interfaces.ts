export interface SeriesEpisodeInterface {
  id: string;
  name: string;
  description: string;
  videoId: string;
  gems: string[];
}

export interface SeasonInterface {
  id: string;
  name: string;
  nEpisodes: number;
  gems: string[];
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
  gems: string[];
  seasons?: SeasonInterface[];
}
