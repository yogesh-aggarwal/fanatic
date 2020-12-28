export interface PublicTopicsInterface {
  series: string[];
}

export interface GeneralDataInterface {
  coverImages: string[];
}

export interface SearchIndex {
  id: string;
  name: string;
  releaseDate: any;
  topics: string[];
  thumbnail: string;
}

export interface SearchDataInterface {
  [key: string]: SearchIndex;
}
