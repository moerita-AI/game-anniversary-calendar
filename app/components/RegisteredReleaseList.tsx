"use client";

import { useMemo, useState } from "react";
import { series as allSeries, seriesById } from "../data/series";
import type { GameRelease, ReleaseType } from "../types/game";
import { catalogCategoryFor, type CatalogCategory } from "../utils/catalog";
import { formatCalendarTitle } from "../utils/title";

const releaseTypeLabels: Record<ReleaseType, string> = {
  original: "原作", port: "移植", remake: "リメイク", remaster: "リマスター",
  mobile: "モバイル版", arcade: "アーケード版", collection: "コレクション",
};

const formatReleaseDate = (releaseDate: string) => {
  const [year, month, day] = releaseDate.split("-").map(Number);
  return `${year}年${month}月${day}日`;
};

const filterSeriesNames: Record<string, string> = {
  "star-ocean": "スターオーシャン",
  valkyrie: "ヴァルキリープロファイル",
  "front-mission": "フロントミッション",
  bravely: "ブレイブリー",
  "parasite-eve": "パラサイト・イヴ",
};

export function RegisteredReleaseList({ games }: { games: GameRelease[] }) {
  const [seriesFilter, setSeriesFilter] = useState("");
  const visibleGames = useMemo(() => games
    .filter((game) => game.isVisible)
    .slice()
    .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate) || a.title.localeCompare(b.title, "ja", { numeric: true })), [games]);
  const seriesOptions = useMemo(() => allSeries.filter((item) => visibleGames.some((game) => game.seriesId === item.id)), [visibleGames]);
  const filterOptions = useMemo(() => seriesOptions.flatMap((item) => {
    const categories = new Set(visibleGames.filter((game) => game.seriesId === item.id).map(catalogCategoryFor));
    const filterName = filterSeriesNames[item.id] ?? item.shortName;
    if (categories.size < 2) return [{ value: `${item.id}:all`, label: filterName }];

    const mainlineLabel = ["final-fantasy", "dragon-quest", "kingdom-hearts"].includes(item.id) ? "ナンバリング作品" : "本編";
    return [
      { value: `${item.id}:mainline`, label: `${filterName} ${mainlineLabel}` },
      { value: `${item.id}:related`, label: `${filterName} 派生作品` },
    ];
  }), [seriesOptions, visibleGames]);
  const filteredGames = useMemo(() => {
    if (!seriesFilter) return visibleGames;
    const [seriesId, category] = seriesFilter.split(":") as [string, CatalogCategory | "all"];
    return visibleGames.filter((game) => game.seriesId === seriesId && (category === "all" || catalogCategoryFor(game) === category));
  }, [seriesFilter, visibleGames]);

  return <section className="registeredSection" aria-labelledby="registered-heading">
    <div className="registeredHeading">
      <div><span className="kicker">REGISTERED TITLES</span><h2 id="registered-heading">掲載作品一覧</h2><p className="registeredOrderNote">発売日順（古い順）で掲載しています</p><p className="registeredMeta"><span>最終更新日：<time dateTime="2026-07-19">2026年7月19日</time></span></p></div>
      <span className="registeredCount" aria-live="polite">{filteredGames.length} / {visibleGames.length}作品</span>
    </div>
    <div className="titleFilter">
      <label htmlFor="registered-series-filter">シリーズ・作品区分で絞り込む</label>
      <div className="titleFilterControl"><span aria-hidden="true">☷</span><select id="registered-series-filter" value={seriesFilter} onChange={(event) => setSeriesFilter(event.target.value)}><option value="">すべての作品</option>{filterOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div>
    </div>
    <div className="registeredTableWrap">
      <table className="registeredTable">
        <thead><tr><th scope="col">正式タイトル</th><th scope="col">略称（カレンダー表示名）</th><th scope="col">発売年月日</th><th scope="col">機種名</th><th scope="col">種別</th></tr></thead>
        <tbody>{filteredGames.map((game) => {
          const gameSeries = seriesById.get(game.seriesId);
          return <tr key={game.id} style={{ "--series-color": gameSeries?.color ?? "#58616b" } as React.CSSProperties}>
            <th scope="row" data-label="正式タイトル"><span className="registeredSeriesDot" aria-hidden="true" /><span>{game.title}</span></th>
            <td data-label="略称（カレンダー表示名）"><strong className="shortTitleValue">{formatCalendarTitle(game)}</strong></td>
            <td data-label="発売年月日"><time dateTime={game.releaseDate}>{formatReleaseDate(game.releaseDate)}</time></td>
            <td data-label="機種名">{game.platform.join("／")}</td>
            <td data-label="種別"><span className={`releaseTypeTag ${game.releaseType === "original" ? "isOriginal" : ""}`}>{releaseTypeLabels[game.releaseType]}</span></td>
          </tr>;
        })}</tbody>
      </table>
    </div>
  </section>;
}
