"use client";

import { useCallback, useMemo, useState } from "react";
import { MonthlyCalendar } from "./components/MonthlyCalendar";
import { RegisteredReleaseList } from "./components/RegisteredReleaseList";
import { ReleaseModal } from "./components/ReleaseModal";
import { SiteDisclaimerText } from "./components/SiteDisclaimerText";
import { TodayAnniversaries } from "./components/TodayAnniversaries";
import { games } from "./data/games";
import type { GameRelease } from "./types/game";
import { gamesOnMonthDay, getJapanToday, parseYmd } from "./utils/date";

type ModalState = { label: string; games: GameRelease[]; year: number } | null;

export default function Home() {
  const todayYmd = useMemo(() => getJapanToday(), []);
  const today = parseYmd(todayYmd)!;
  const [view, setView] = useState({ year: today.year, month: today.month });
  const [modal, setModal] = useState<ModalState>(null);
  const todayGames = gamesOnMonthDay(games, today.month, today.day, today.year);
  const registeredCount = games.filter((game) => game.isVisible).length;

  const moveMonth = (delta: number) => setView((current) => {
    const date = new Date(Date.UTC(current.year, current.month - 1 + delta, 1));
    return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1 };
  });

  const openDay = useCallback((year: number, month: number, day: number, dayGames: GameRelease[]) => {
    if (month !== view.month || year !== view.year) setView({ year, month });
    setModal({ label: `${month}月${day}日`, games: dayGames, year });
  }, [view]);

  return <>
    <main id="top">
      <TodayAnniversaries
        games={todayGames}
        year={today.year}
        registeredCount={registeredCount}
      />
      <MonthlyCalendar
        games={games}
        year={view.year}
        month={view.month}
        todayYmd={todayYmd}
        onMove={moveMonth}
        onToday={() => setView({ year: today.year, month: today.month })}
        onSelectMonth={(year, month) => setView({ year, month })}
        onSelectDay={openDay}
      />
      <RegisteredReleaseList games={games} />
    </main>
    <footer>
      <strong>スクエニ作品 発売記念日カレンダー</strong>
      <div className="footerDisclaimer"><SiteDisclaimerText /></div>
      <small>非公式ファン向けカレンダー（公式サイトではありません）</small>
      <p className="footerContact">連絡先：<a href="https://x.com/MoeLINE4" target="_blank" rel="noreferrer">X @MoeLINE4</a></p>
    </footer>
    {modal && <ReleaseModal dateLabel={modal.label} games={modal.games} year={modal.year} onClose={() => setModal(null)} />}
  </>;
}
