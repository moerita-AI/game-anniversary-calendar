"use client";

import { useState } from "react";
import { seriesById } from "../data/series";
import type { GameRelease } from "../types/game";
import { featuredCalendarSeriesIds } from "../utils/catalog";
import { anniversaryInYear, createCalendarCells, gamesOnMonthDay } from "../utils/date";
import { formatCalendarTitle } from "../utils/title";

export function MonthlyCalendar({ games, year, month, todayYmd, onMove, onToday, onSelectMonth, onSelectDay }: {
  games: GameRelease[];
  year: number;
  month: number;
  todayYmd: string;
  onMove: (delta: number) => void;
  onToday: () => void;
  onSelectMonth: (year: number, month: number) => void;
  onSelectDay: (year: number, month: number, day: number, games: GameRelease[]) => void;
}) {
  const cells = createCalendarCells(year, month);
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [pickerYear, setPickerYear] = useState(year);
  const [featuredOnly, setFeaturedOnly] = useState(true);
  const calendarGames = featuredOnly ? games.filter((game) => featuredCalendarSeriesIds.has(game.seriesId)) : games;
  const cellGames = cells.map((cell) => gamesOnMonthDay(calendarGames, cell.month, cell.day, cell.year));
  const busyWeekIndexes = new Set(cellGames.flatMap((dayGames, index) => dayGames.length >= 3 ? [Math.floor(index / 7)] : []));
  const firstReleaseYear = Math.min(...(calendarGames.length ? calendarGames.map((game) => Number(game.releaseDate.slice(0, 4))) : [year]));
  const lastPickerYear = Math.max(Number(todayYmd.slice(0, 4)) + 20, year);
  const firstPickerYear = Math.min(firstReleaseYear, year);
  const yearOptions = Array.from({ length: lastPickerYear - firstPickerYear + 1 }, (_, index) => firstPickerYear + index);

  const togglePicker = () => {
    if (!isPickerOpen) setPickerYear(year);
    setPickerOpen((current) => !current);
  };

  const selectMonth = (selectedMonth: number) => {
    onSelectMonth(pickerYear, selectedMonth);
    setPickerOpen(false);
  };

  return <section id="calendar" className="calendarSection" aria-labelledby="calendar-heading">
    <div className="calendarTop">
      <div><span className="kicker">MONTHLY CALENDAR</span><h2 id="calendar-heading">{year}年 {month}月</h2></div>
      <div className="calendarActionArea">
        <button className="datePickerToggle" type="button" onClick={togglePicker} aria-expanded={isPickerOpen} aria-controls="calendar-date-picker"><span aria-hidden="true">▦</span><span>年月を選ぶ</span><small>{year}年{month}月</small></button>
        <div className="calendarControls"><button type="button" onClick={() => onMove(-1)} aria-label="前の月へ">‹</button><button className="todayButton" type="button" onClick={onToday}>今日に戻る</button><button type="button" onClick={() => onMove(1)} aria-label="次の月へ">›</button></div>
      </div>
    </div>
    {isPickerOpen && <div id="calendar-date-picker" className="datePickerPanel" aria-label="表示する年月を選択">
      <label htmlFor="calendar-year-select">年を選ぶ</label>
      <select id="calendar-year-select" value={pickerYear} onChange={(event) => setPickerYear(Number(event.target.value))}>{yearOptions.map((optionYear) => <option key={optionYear} value={optionYear}>{optionYear}年</option>)}</select>
      <span className="monthPickerLabel">月をタップ</span>
      <div className="monthPickerGrid">{Array.from({ length: 12 }, (_, index) => index + 1).map((optionMonth) => <button key={optionMonth} type="button" className={pickerYear === year && optionMonth === month ? "isSelected" : ""} aria-pressed={pickerYear === year && optionMonth === month} onClick={() => selectMonth(optionMonth)}>{optionMonth}月</button>)}</div>
    </div>}
    <div className="calendarFilterArea">
      <div className="calendarFilterRow"><label className="calendarSeriesFilter">
        <input type="checkbox" checked={featuredOnly} onChange={(event) => setFeaturedOnly(event.target.checked)} />
        <span><strong>主要9シリーズのみ表示</strong><small>（FF・DQ・サガ・聖剣・クロノ・ゼノギアス・KH・NieR・オクトラ）</small></span>
      </label></div>
      <p className="calendarTapHint">日付をタップすると、その日の作品一覧を確認できます。</p>
    </div>
    <div className="weekdayRow" aria-hidden="true">{["日", "月", "火", "水", "木", "金", "土"].map((day, index) => <div key={day} className={index === 0 ? "sunday" : index === 6 ? "saturday" : ""}>{day}</div>)}</div>
    <div className="calendarGrid">{cellGames.map((dayGames, index) => {
      const cell = cells[index];
      const shown = dayGames.slice(0, 3);
      const isToday = cell.ymd === todayYmd;
      return <button
        key={cell.ymd}
        type="button"
        className={`calendarCell ${cell.inMonth ? "" : "outside"} ${isToday ? "isToday" : ""} ${busyWeekIndexes.has(Math.floor(index / 7)) ? "hasBusyWeek" : ""}`}
        aria-current={isToday ? "date" : undefined}
        aria-label={`${cell.year}年${cell.month}月${cell.day}日、${dayGames.length}作品`}
        onClick={() => onSelectDay(cell.year, cell.month, cell.day, dayGames)}
      >
        <span className={`dayNumber ${index % 7 === 0 ? "sunday" : index % 7 === 6 ? "saturday" : ""}`}>{cell.day}{isToday && <em>今日</em>}</span>
        <span className="dayReleases">{shown.map((game) => <span className="miniRelease" key={game.id} title={game.title}>
          <i style={{ backgroundColor: seriesById.get(game.seriesId)?.color }} aria-hidden="true" />
          <b>{formatCalendarTitle(game)}</b>
          <small>{anniversaryInYear(game, cell.year)}</small>
        </span>)}{dayGames.length > 3 && <span className="moreCount">ほか{dayGames.length - 3}件</span>}</span>
      </button>;
    })}</div>
    <div className="seriesLegend" aria-label="シリーズ色の凡例">{Array.from(new Set(calendarGames.map((game) => game.seriesId))).map((id) => { const item = seriesById.get(id); return item && <span key={id}><i style={{ background: item.color }} />{item.shortName}</span>; })}</div>
  </section>;
}
