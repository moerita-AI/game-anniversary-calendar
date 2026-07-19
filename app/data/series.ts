import type { GameSeries } from "../types/game";

export const series: GameSeries[] = [
  { id: "final-fantasy", name: "FINAL FANTASY", shortName: "FF", color: "#3678d4", sortOrder: 10 },
  { id: "dragon-quest", name: "ドラゴンクエスト", shortName: "DQ", color: "#23805a", sortOrder: 20 },
  { id: "saga", name: "サガ", shortName: "サガ", color: "#c94b55", sortOrder: 30 },
  { id: "mana", name: "聖剣伝説", shortName: "聖剣", color: "#668c35", sortOrder: 40 },
  { id: "chrono", name: "クロノ", shortName: "クロノ", color: "#c86525", sortOrder: 50 },
  { id: "xeno", name: "ゼノギアス", shortName: "ゼノギアス", color: "#7659ad", sortOrder: 60 },
  { id: "kingdom-hearts", name: "キングダム ハーツ", shortName: "KH", color: "#247f9d", sortOrder: 70 },
  { id: "nier", name: "NieR", shortName: "NieR", color: "#626b73", sortOrder: 80 },
  { id: "octopath", name: "オクトパストラベラー", shortName: "オクトラ", color: "#8b5a35", sortOrder: 90 },
  { id: "star-ocean", name: "スターオーシャン", shortName: "SO", color: "#244f86", sortOrder: 91 },
  { id: "valkyrie", name: "ヴァルキリー", shortName: "VP", color: "#6750a4", sortOrder: 92 },
  { id: "front-mission", name: "フロントミッション", shortName: "FM", color: "#4e6575", sortOrder: 93 },
  { id: "drakengard", name: "ドラッグ オン ドラグーン", shortName: "DOD", color: "#8d493a", sortOrder: 94 },
  { id: "bravely", name: "ブレイブリー", shortName: "BD", color: "#8a6b2e", sortOrder: 95 },
  { id: "world-ends-with-you", name: "すばらしきこのせかい", shortName: "すばせか", color: "#315a9b", sortOrder: 96 },
  { id: "parasite-eve", name: "パラサイト・イヴ", shortName: "PE", color: "#9b3f5e", sortOrder: 97 },
  { id: "musashi", name: "武蔵伝", shortName: "武蔵伝", color: "#a75b28", sortOrder: 98 },
  { id: "hanjuku-hero", name: "半熟英雄", shortName: "半熟英雄", color: "#a67b24", sortOrder: 99 },
  { id: "other-square", name: "その他スクウェア作品", shortName: "その他スクウェア", color: "#b94f83", sortOrder: 120 },
  { id: "other-enix", name: "その他エニックス作品", shortName: "その他エニックス", color: "#927129", sortOrder: 130 },
  { id: "other", name: "その他", shortName: "その他", color: "#58616b", sortOrder: 999 },
];

export const seriesById = new Map(series.map((item) => [item.id, item]));
