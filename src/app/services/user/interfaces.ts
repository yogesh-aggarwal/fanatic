export interface AchievementsInterface {
  name: string;
  dateAquired: Date;
}

export interface UserInterface {
  name: string;
  uid: string;
  profileImg: string;
  coverImg: string;
  email: string;
  achievements: AchievementsInterface[];
  dateJoined: Date;
  diamonds: number;
}
