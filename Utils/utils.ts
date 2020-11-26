export const getTmdbImage = (imgPath: string): string => {
  return `https://image.tmdb.org/t/p/original${imgPath}`;
};
export type SearchType = "tv" | "movie";
