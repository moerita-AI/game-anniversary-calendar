import { seriesById } from "../data/series";
import type { GameRelease, ReleaseType } from "../types/game";
import { anniversaryInYear, formatJapaneseDate } from "../utils/date";
import { formatCalendarTitle } from "../utils/title";

const typeLabels: Record<ReleaseType, string> = {
  original: "原作", port: "移植", remake: "リメイク", remaster: "リマスター",
  mobile: "モバイル", arcade: "アーケード", collection: "コレクション",
};

export function ReleaseCard({ game, year }: { game: GameRelease; year: number }) {
  const gameSeries = seriesById.get(game.seriesId);
  return <article className="releaseCard todayReleaseCard" style={{ "--series-color": gameSeries?.color ?? "#58616b" } as React.CSSProperties}>
    <h3>{game.title}</h3>
    <div className="anniversaryBadge">{anniversaryInYear(game, year)}</div>
    <dl className="todayReleaseFacts">
      <div><dt>略称（カレンダー表示名）</dt><dd><strong className="shortTitleValue">{formatCalendarTitle(game)}</strong></dd></div>
      <div><dt>発売年月日</dt><dd>{formatJapaneseDate(game.releaseDate)}</dd></div>
      <div><dt>機種名</dt><dd>{game.platform.join("／")}</dd></div>
      <div><dt>種別</dt><dd><span className={`releaseTypeTag ${game.releaseType === "original" ? "isOriginal" : ""}`}>{typeLabels[game.releaseType]}</span></dd></div>
    </dl>
  </article>;
}
