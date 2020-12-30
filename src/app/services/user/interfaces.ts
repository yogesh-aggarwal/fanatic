export interface AchievementsInterface {
  name: string;
  dateAquired: Date;
}

export interface TimelineItemInterface {
  videoId: string;
  seriesId: string;
  seasonId: string;
  episodeId: string;
  dateLastWatched: Date;
  dateFirstWatched: Date;
}

export interface LibraryInterface {
  [key: string]: {
    name: string;
    seriesIds: string[];
    lastUpdated: any;
  };
}

export interface UserInterface {
  name: string;
  uid: string;
  profileImg: string;
  coverImg: string;
  email: string;
  achievements: AchievementsInterface[];
  dateJoined: Date;
  gems: number;
}
