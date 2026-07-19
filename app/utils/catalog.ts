import type { GameRelease } from "../types/game";

export const featuredCalendarSeriesIds = new Set([
  "final-fantasy",
  "dragon-quest",
  "saga",
  "mana",
  "chrono",
  "xeno",
  "kingdom-hearts",
  "nier",
  "octopath",
]);

export type CatalogCategory = "mainline" | "related";

const mainlineIds = new Set([
  "makai-toushi-saga",
  "saga-2-hihou-densetsu",
  "saga-3-jikuu-no-hasha",
  "romancing-saga",
  "romancing-saga-2",
  "romancing-saga-3",
  "saga-frontier",
  "saga-frontier-2",
  "unlimited-saga",
  "saga-scarlet-grace",
  "saga-emerald-beyond",
  "seiken-densetsu",
  "seiken-densetsu-2",
  "seiken-densetsu-3",
  "legend-of-mana",
  "dawn-of-mana",
  "visions-of-mana",
  "chrono-trigger",
  "chrono-cross",
  "xenogears",
  "kingdom-hearts",
  "kingdom-hearts-2",
  "kingdom-hearts-3",
  "nier-replicant",
  "nier-automata",
  "octopath-traveler-0",
  "octopath-traveler",
  "octopath-traveler-2",
]);

const numberedMainlinePattern = /^(?:final-fantasy-(?:[1-9]|1[0-6])|dragon-quest-(?:[1-9]|10|11))$/;

export function catalogCategoryFor(game: GameRelease): CatalogCategory {
  if (numberedMainlinePattern.test(game.id) || mainlineIds.has(game.id)) return "mainline";

  // 主要9シリーズ内の外伝・派生作品を「関連作品」として分けます。
  // それ以外のシリーズは、そのシリーズ自体の本編として扱います。
  return featuredCalendarSeriesIds.has(game.seriesId) ? "related" : "mainline";
}
