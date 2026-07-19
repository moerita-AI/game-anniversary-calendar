export type ReleaseType = "original" | "port" | "remake" | "remaster" | "mobile" | "arcade" | "collection";

export type GameRelease = {
  id: string;
  title: string;
  shortTitle: string;
  titleKana?: string;
  englishTitle?: string;
  seriesId: string;
  releaseDate: string;
  originalReleaseDate?: string;
  platform: string[];
  region: "JP" | "NA" | "EU" | "WORLD";
  releaseType: ReleaseType;
  publisher?: string;
  developer?: string;
  description?: string;
  sourceUrls: string[];
  searchKeywords?: string[];
  relatedGameIds?: string[];
  isVisible: boolean;
};

export type GameSeries = {
  id: string;
  name: string;
  shortName: string;
  color: string;
  textColor?: string;
  sortOrder: number;
};
