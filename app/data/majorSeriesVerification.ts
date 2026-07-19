/**
 * 主要9シリーズの作品別確認記録。
 *
 * 2026-07-19 に、スクウェア・エニックスの製品ページ、各シリーズの
 * 公式ポータル、公式ニュースリリースのいずれかで、正式名称・日本での
 * 発売日・発売機種を照合した作品だけを登録しています。
 */
export const MAJOR_SERIES_VERIFIED_ON = "2026-07-19";

const FF_PORTAL = "https://jp.finalfantasy.com/titles";
const FF_OFFICIAL_CATALOG = "https://www.jp.square-enix.com/game/?s=2";
const DQ_OFFICIAL_CATALOG = "https://www.dragonquest.jp/products/";
const SAGA_OFFICIAL_LINEUP = "https://www.jp.square-enix.com/saga_portal/lineup/index.html";

const ffNumberedSources: Record<string, string> = Object.fromEntries(
  Array.from({ length: 16 }, (_, index) => {
    const number = index + 1;
    return [`final-fantasy-${number}`, `${FF_PORTAL}/finalfantasy${number}`];
  }),
);

const ffSpinOffIds = [
  "final-fantasy-usa-mystic-quest",
  "final-fantasy-tactics",
  "final-fantasy-tactics-advance",
  "final-fantasy-tactics-a2",
  "final-fantasy-10-2",
  "final-fantasy-12-revenant-wings",
  "final-fantasy-13-2",
  "lightning-returns-final-fantasy-13",
  "final-fantasy-four-heroes-of-light",
  "final-fantasy-type-0",
  "final-fantasy-explorers",
  "world-of-final-fantasy",
  "stranger-of-paradise-final-fantasy-origin",
  "crisis-core-final-fantasy-7",
  "dirge-of-cerberus-final-fantasy-7",
  "final-fantasy-crystal-chronicles",
  "ffcc-ring-of-fates",
  "ffcc-my-life-as-a-king",
  "ffcc-echoes-of-time",
  "ffcc-my-life-as-a-darklord",
  "ffcc-crystal-bearers",
  "chocobo-mysterious-dungeon",
  "chocobo-mysterious-dungeon-2",
  "chocobo-racing",
  "chocobo-stallion",
  "dice-de-chocobo",
  "hataraku-chocobo",
  "chocobo-tales",
  "chocobo-tales-2",
  "chocobo-toki-wasure",
  "chocobo-gp",
  "dissidia-final-fantasy",
  "theatrhythm-final-fantasy",
  "theatrhythm-final-bar-line",
] as const;

const dragonQuestIds = [
  "dragon-quest-1",
  "dragon-quest-2",
  "dragon-quest-3",
  "dragon-quest-4",
  "dragon-quest-5",
  "dragon-quest-6",
  "dragon-quest-7",
  "dragon-quest-8",
  "dragon-quest-9",
  "dragon-quest-10",
  "dragon-quest-11",
  "torneko-no-daibouken",
  "torneko-no-daibouken-2",
  "torneko-no-daibouken-3",
  "young-yangus-mystery-dungeon",
  "dragon-quest-monsters",
  "dragon-quest-monsters-2-luka",
  "dragon-quest-monsters-caravan-heart",
  "dragon-quest-monsters-joker",
  "dragon-quest-monsters-joker-2",
  "dragon-quest-monsters-joker-3",
  "dragon-quest-monsters-3",
  "slime-morimori-dragon-quest",
  "slime-morimori-dragon-quest-2",
  "slime-morimori-dragon-quest-3",
  "kenshin-dragon-quest",
  "dragon-quest-builders",
  "dragon-quest-builders-2",
  "dragon-quest-heroes",
  "dragon-quest-heroes-2",
  "dragon-quest-swords",
  "dragon-quest-wars",
  "theatrhythm-dragon-quest",
  "dragon-quest-treasures",
  "infinity-strash-dragon-quest-dai",
] as const;

const sagaIds = [
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
] as const;

const entries = [
  ...Object.entries(ffNumberedSources),
  ...ffSpinOffIds.map((id) => [id, FF_OFFICIAL_CATALOG]),
  ["final-fantasy-usa-mystic-quest", "https://www.jp.square-enix.com/archive/ff_usa/"],
  ["chocobo-stallion", "https://www.jp.square-enix.com/game/detail/chocobostallion/"],
  ["dice-de-chocobo", "https://www.jp.square-enix.com/game/detail/dicedechocobo/"],
  ...dragonQuestIds.map((id) => [id, DQ_OFFICIAL_CATALOG]),
  ...sagaIds.map((id) => [id, SAGA_OFFICIAL_LINEUP]),
  ["seiken-densetsu", "https://www.jp.square-enix.com/game/detail/seiken/"],
  ["seiken-densetsu-2", "https://www.jp.square-enix.com/game/detail/seiken2/"],
  ["seiken-densetsu-3", "https://www.jp.square-enix.com/game/detail/seiken3/"],
  ["legend-of-mana", "https://www.jp.square-enix.com/game/ps/"],
  ["children-of-mana", "https://www.jp.square-enix.com/game/ds/"],
  ["dawn-of-mana", "https://www.jp.square-enix.com/game/detail/seiken4/"],
  ["heroes-of-mana", "https://www.jp.square-enix.com/game/ds/"],
  ["visions-of-mana", "https://www.jp.square-enix.com/visionsofmana/"],
  ["chrono-trigger", "https://www.jp.square-enix.com/game/detail/chronotrigger/"],
  ["chrono-cross", "https://www.jp.square-enix.com/game/detail/chronocross/"],
  ["xenogears", "https://www.jp.square-enix.com/game/detail/xenogears/"],
  ["kingdom-hearts", "https://www.jp.square-enix.com/game/detail/kh/"],
  ["kingdom-hearts-chain-of-memories", "https://www.jp.square-enix.com/company/ja/news/2004/download/0302-200408261100-01.pdf"],
  ["kingdom-hearts-2", "https://www.jp.square-enix.com/game/detail/kh2/"],
  ["kingdom-hearts-358-2-days", "https://www.jp.square-enix.com/company/ja/news/2009/html/c6b649b31592a69066398322db8db16e.html"],
  ["kingdom-hearts-birth-by-sleep", "https://www.jp.square-enix.com/company/ja/news/2009/html/17f82070796276a89d2adc2268695b731365cf98.html"],
  ["kingdom-hearts-dream-drop-distance", "https://www.jp.square-enix.com/company/ja/news/2012/html/33856cee23d9bf93d4a51c6a353489ec.html"],
  ["kingdom-hearts-3", "https://www.jp.square-enix.com/kingdom/kh3/"],
  ["kingdom-hearts-melody-of-memory", "https://www.jp.square-enix.com/kingdom/kh_mom/"],
  ["nier-replicant", "https://www.jp.square-enix.com/nierarchive/replicant.html"],
  ["nier-automata", "https://www.jp.square-enix.com/company/ja/news/2016/html/2be663c1898648417e502bd0ff955ad4dd251ba4.html"],
  ["octopath-traveler", "https://www.jp.square-enix.com/company/ja/news/2018/html/eaa37726a7081263c83128e7375989745d09ed30.html"],
  ["octopath-traveler-2", "https://www.jp.square-enix.com/topics/detail/2300/"],
  ["octopath-traveler-0", "https://www.jp.square-enix.com/octopathtraveler0/"],
] as Array<[string, string]>;

export const majorSeriesOfficialSourceByGameId = Object.freeze(Object.fromEntries(entries));

export const getMajorSeriesOfficialSource = (gameId: string): string | undefined =>
  majorSeriesOfficialSourceByGameId[gameId];
