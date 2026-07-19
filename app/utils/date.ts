import type { GameRelease } from "../types/game";

export const getJapanToday = (now = new Date()): string => {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
};

export const parseYmd = (value: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [year, month, day] = match.slice(1).map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return { year, month, day, date };
};

export const anniversaryInYear = (game: GameRelease, year: number) => {
  const release = parseYmd(game.releaseDate);
  if (!release || release.year > year) return null;
  const count = year - release.year;
  return count === 0 ? "本日発売" : `${count}周年`;
};

export const gamesOnMonthDay = (items: GameRelease[], month: number, day: number, year: number) =>
  items.filter((game) => {
    const release = parseYmd(game.releaseDate);
    return game.isVisible && release && release.year <= year && release.month === month && release.day === day;
  });

export const formatJapaneseDate = (ymd: string, withYear = true) => {
  const value = parseYmd(ymd);
  if (!value) return "日付不明";
  const weekday = ["日", "月", "火", "水", "木", "金", "土"][value.date.getUTCDay()];
  return `${withYear ? `${value.year}年` : ""}${value.month}月${value.day}日（${weekday}）`;
};

export type CalendarCell = { year: number; month: number; day: number; ymd: string; inMonth: boolean };

export const createCalendarCells = (year: number, month: number): CalendarCell[] => {
  const first = new Date(Date.UTC(year, month - 1, 1));
  const start = new Date(first);
  start.setUTCDate(1 - first.getUTCDay());
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index);
    const y = date.getUTCFullYear();
    const m = date.getUTCMonth() + 1;
    const d = date.getUTCDate();
    return { year: y, month: m, day: d, ymd: `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`, inMonth: m === month };
  });
};
