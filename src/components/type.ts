export interface Film {
  name:string,
  backgroundImage:string,
  genre:string,
  released:number,
  posterImage:string,
  backgroundColor:string,
  id?:number,
  isFavorite:boolean,
  director: string,
  starring: string[],
  runTime: number,
  rating: number,
  description: string,
  scoresCount: number,
}

