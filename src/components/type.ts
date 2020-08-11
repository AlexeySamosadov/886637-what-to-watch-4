export interface Film {
  name: string,
  backgroundImage: string,
  genre: string,
  released: number,
  posterImage: string,
  backgroundColor: string,
  id: number,
  isFavorite: boolean,
  director: string,
  starring: string[],
  runTime: number,
  rating: number,
  description: string,
  scoresCount: number,
}

interface User {
  id: number,
  name: string,
}

export interface Review {
  id: number,
  comment: string,
  user: User,
  rating: number,
  date: string,
}
