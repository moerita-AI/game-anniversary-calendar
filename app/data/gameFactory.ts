import type { GameRelease } from "../types/game";

export const SQUARE_HISTORY = "https://en.wikipedia.org/wiki/List_of_Square_video_games";
export const ENIX_HISTORY = "https://en.wikipedia.org/wiki/List_of_Enix_games";
export const SQUARE_ENIX_HISTORY = "https://en.wikipedia.org/wiki/List_of_Square_Enix_video_games";

type GameSeed = Omit<GameRelease, "region" | "releaseType" | "publisher" | "sourceUrls" | "isVisible"> & {
  sourceUrl?: string;
};

const createOriginal = (publisher: string, defaultSource: string) => ({ sourceUrl, ...game }: GameSeed): GameRelease => ({
  ...game,
  region: "JP",
  releaseType: "original",
  publisher,
  sourceUrls: [sourceUrl ?? defaultSource],
  isVisible: true,
});

export const squareOriginal = createOriginal("スクウェア", SQUARE_HISTORY);
export const enixOriginal = createOriginal("エニックス", ENIX_HISTORY);
export const squareEnixOriginal = createOriginal("スクウェア・エニックス", SQUARE_ENIX_HISTORY);
