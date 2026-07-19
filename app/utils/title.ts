import type { GameRelease } from "../types/game";

export const formatCalendarTitle = (game: GameRelease) =>
  game.id === "saga-frontier" ? `${game.shortTitle}1` : game.shortTitle;
