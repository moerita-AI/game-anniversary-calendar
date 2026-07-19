import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const dataFiles = [
  "../app/data/games.ts",
  "../app/data/additionalSeriesGames.ts",
  "../app/data/additionalArchiveGames.ts",
  "../app/data/additionalModernGames.ts",
];

const isValidDate = (value) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const [, year, month, day] = match.map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() + 1 === month && date.getUTCDate() === day;
};

test("game data is complete, unique, and uses valid original-release dates", async () => {
  const source = (await Promise.all(dataFiles.map((file) => readFile(new URL(file, import.meta.url), "utf8")))).join("\n");
  const ids = [...source.matchAll(/(?<![A-Za-z])id: "([^"]+)"/g)].map((match) => match[1]);
  const dates = [...source.matchAll(/releaseDate: "([^"]*)"/g)].map((match) => match[1]);

  assert.ok(ids.length >= 250, `expected at least 250 titles, found ${ids.length}`);
  assert.equal(new Set(ids).size, ids.length, "game ids must not be duplicated");
  assert.equal(dates.length, ids.length, "every game must have one release date");
  assert.deepEqual(dates.filter((date) => !isValidDate(date)), []);
  assert.doesNotMatch(source, /platform: \[[^\]]*アーケード/);
  assert.doesNotMatch(source, /bravely-default-2-placeholder/);
  assert.doesNotMatch(source, /id: "chocobo-land"/);
  assert.match(source, /id: "chrono-trigger"[^\n]*shortTitle: "クロノトリガー"/);
  assert.match(source, /id: "chrono-cross"[^\n]*shortTitle: "クロノクロス"/);

  for (const requiredId of [
    "final-fantasy-usa-mystic-quest",
    "final-fantasy-tactics",
    "final-fantasy-crystal-chronicles",
    "chocobo-mysterious-dungeon",
    "chocobo-stallion",
    "dice-de-chocobo",
    "dragon-quest-builders",
    "kenshin-dragon-quest",
    "bahamut-lagoon",
    "parasite-eve",
    "brave-fencer-musashi",
  ]) assert.ok(ids.includes(requiredId), `${requiredId} must be registered`);
});

test("every registered title in the major nine series has an official verification source", async () => {
  const source = (await Promise.all(dataFiles.map((file) => readFile(new URL(file, import.meta.url), "utf8")))).join("\n");
  const verification = await readFile(new URL("../app/data/majorSeriesVerification.ts", import.meta.url), "utf8");
  const majorSeries = new Set([
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
  const records = [...source.matchAll(/id: "([^"]+)"[^\n]*seriesId: "([^"]+)"/g)]
    .map((match) => ({ id: match[1], seriesId: match[2] }))
    .filter(({ seriesId }) => majorSeries.has(seriesId));

  assert.equal(records.length, 120, `expected 120 verified major-series titles, found ${records.length}`);
  for (const { id } of records) {
    const generatedNumberedId = /^final-fantasy-(?:[1-9]|1[0-6])$/.test(id);
    assert.ok(generatedNumberedId || verification.includes(`"${id}"`), `${id} needs an official verification record`);
  }
  assert.doesNotMatch(verification, /wikipedia\.org/i);
  assert.match(verification, /MAJOR_SERIES_VERIFIED_ON = "2026-07-19"/);
});
