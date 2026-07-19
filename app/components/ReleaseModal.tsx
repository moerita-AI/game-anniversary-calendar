"use client";
import { useEffect, useRef } from "react";
import { seriesById } from "../data/series";
import type { GameRelease, ReleaseType } from "../types/game";
import { anniversaryInYear, formatJapaneseDate } from "../utils/date";
import { formatCalendarTitle } from "../utils/title";

const typeLabels: Record<ReleaseType, string> = {
  original: "原作", port: "移植", remake: "リメイク", remaster: "リマスター",
  mobile: "モバイル", arcade: "アーケード", collection: "コレクション",
};
export function ReleaseModal({ dateLabel, games, year, onClose }: { dateLabel: string; games: GameRelease[]; year: number; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { closeRef.current?.focus(); const key = (event: KeyboardEvent) => event.key === "Escape" && onClose(); document.addEventListener("keydown", key); return () => document.removeEventListener("keydown", key); }, [onClose]);
  return <div className="modalBackdrop" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}><section className="releaseModal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="sheetHandle" aria-hidden="true" /><header><div><span className="kicker">RELEASE LIST</span><h2 id="modal-title">{dateLabel}</h2><p>{games.length}作品</p></div><button ref={closeRef} className="closeButton" type="button" onClick={onClose} aria-label="閉じる">×</button></header><div className="modalList">{games.length ? games.map((game) => {
    const gameSeries = seriesById.get(game.seriesId);
    return <article key={game.id} style={{ "--series-color": gameSeries?.color ?? "#58616b" } as React.CSSProperties}>
      <span className="colorBar" />
      <div className="modalGameContent">
        <div className="modalGameTop"><strong>{anniversaryInYear(game, year)}</strong></div>
        <h3>{game.title}</h3>
        <dl className="modalGameDetails">
          <div><dt>略称（カレンダー表示名）</dt><dd><strong className="shortTitleValue">{formatCalendarTitle(game)}</strong></dd></div>
          <div><dt>発売年月日</dt><dd>{formatJapaneseDate(game.releaseDate)}</dd></div>
          <div><dt>機種名</dt><dd>{game.platform.join("／")}</dd></div>
          <div><dt>種別</dt><dd><span className={`releaseTypeTag ${game.releaseType === "original" ? "isOriginal" : ""}`}>{typeLabels[game.releaseType]}</span></dd></div>
        </dl>
      </div>
    </article>;
  }) : <p className="modalEmpty">この日の登録作品はありません。</p>}</div></section></div>;
}
