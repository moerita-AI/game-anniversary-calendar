import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the calendar and its publication notices", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>スクエニ作品 発売記念日カレンダー（非公式）｜ゲームの周年情報<\/title>/);
  assert.match(html, /スクエニ作品<br\/>発売記念日カレンダー/);
  assert.match(html, /class="titleCakeIcon"/);
  assert.doesNotMatch(html, /titleCakeCandle|titleCakeFlame/);
  assert.match(html, /<span class="unofficialLabel">（非公式）<\/span>/);
  assert.doesNotMatch(html, /今日は2026年7月18日（土）/);
  assert.match(html, /<p>公開情報で発売日を確認できた作品を掲載しています。<\/p>/);
  assert.match(html, /<p>未登録の作品があります。（登録作品数：<!-- -->257<!-- -->作品）<\/p>/);
  assert.match(html, /リメイク・リマスター、移植、スマートフォン・アーケード専用作品などは対象外です。/);
  assert.match(html, /<h3 id="publication-policy-heading">掲載方針<\/h3>/);
  assert.match(html, /旧スクウェア、旧エニックス、スクウェア・エニックスが日本向けに発売した/);
  assert.match(html, /シリーズ、派生、単独作品の発売日を掲載します/);
  assert.doesNotMatch(html, /初回発売日/);
  assert.match(html, /確認できた作品から順次追加しています。未登録作品があります/);
  assert.match(html, /スマートフォン・アーケード専用、他社主体の作品/);
  assert.doesNotMatch(html, /比較的知名度の低い作品/);
  assert.match(html, /<h3 id="publication-notes-heading">注意事項<\/h3>/);
  assert.match(html, /<details class="siteDisclaimer"><summary><span>掲載方針と注意事項<\/span>/);
  assert.doesNotMatch(html, /⌄/);
  assert.match(html, /年月を選ぶ/);
  assert.match(html, /aria-controls="calendar-date-picker"/);
  assert.doesNotMatch(html, /ドラゴンクエスト 1/);
  assert.match(html, /<strong class="shortTitleValue">DQ1<\/strong>/);
  assert.equal(html.match(/ファン制作の非公式サイトです/g)?.length, 2);
  assert.equal(html.match(/本サイトから収益は得ていません/g)?.length, 2);
  assert.doesNotMatch(html, /ゲームの記念日を、もっと身近に/);
  assert.doesNotMatch(html, /各社の公式サイト/);
  assert.match(html, /非公式ファン向けカレンダー（公式サイトではありません）/);
  assert.doesNotMatch(html, /’公式サイトではありません/);
  assert.match(html, /id="calendar"/);
  assert.match(html, /主要9シリーズのみ表示/);
  assert.match(html, /（FF・DQ・サガ・聖剣・クロノ・ゼノギアス・KH・NieR・オクトラ）/);
  assert.match(html, /日付をタップすると、その日の作品一覧を確認できます。/);
  assert.match(html, /ゼノギアス/);
  assert.match(html, /発売日順（古い順）で掲載しています/);
  assert.match(html, /最終更新日：<time dateTime="2026-07-19">2026年7月19日<\/time>/);
  assert.match(html, /連絡先：<a href="https:\/\/x\.com\/MoeLINE4" target="_blank" rel="noreferrer">X @MoeLINE4<\/a>/);
  assert.ok(html.indexOf("連絡先：") > html.indexOf("<footer>"));
  assert.doesNotMatch(html, /掲載希望/);
  assert.match(html, /FF ナンバリング作品/);
  assert.match(html, /FF 派生作品/);
  assert.doesNotMatch(html, /<option value="final-fantasy:all">/);
  assert.doesNotMatch(html, /FF すべて/);
  assert.match(html, /<option value="star-ocean:all">スターオーシャン<\/option>/);
  assert.match(html, /<option value="valkyrie:all">ヴァルキリープロファイル<\/option>/);
  assert.match(html, /<option value="front-mission:all">フロントミッション<\/option>/);
  assert.match(html, /<option value="bravely:all">ブレイブリー<\/option>/);
  assert.match(html, /<option value="parasite-eve:all">パラサイト・イヴ<\/option>/);
  assert.match(html, /<option value="hanjuku-hero:all">半熟英雄<\/option>/);
  assert.match(html, /その他スクウェア/);
  assert.match(html, /その他エニックス/);
  assert.match(html, /<thead><tr><th scope="col">正式タイトル<\/th><th scope="col">略称（カレンダー表示名）<\/th><th scope="col">発売年月日<\/th><th scope="col">機種名<\/th><th scope="col">種別<\/th><\/tr><\/thead>/);
  assert.doesNotMatch(html, /略称（カレンダー表示）/);
  assert.match(html, /クロノトリガー/);
  assert.match(html, /クロノクロス/);
  assert.doesNotMatch(html, /registered-category-filter/);
  assert.match(html, /registered-series-filter/);
  assert.doesNotMatch(html, /作品名の五十音順で掲載しています/);
  assert.match(html, /257(?:<!-- -->)? \/ (?:<!-- -->)?257(?:<!-- -->)?作品/);
  assert.doesNotMatch(html, /class="siteHeader"/);
});

test("uses the three-candle cake icon for the page and installed app", async () => {
  const [layout, manifestSource, iconScript, icon192, icon512] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/manifest.json", import.meta.url), "utf8"),
    readFile(new URL("../scripts/generateCakeIcons.ps1", import.meta.url), "utf8"),
    readFile(new URL("../public/icons/cake-192.png", import.meta.url)),
    readFile(new URL("../public/icons/cake-512.png", import.meta.url)),
  ]);
  const manifest = JSON.parse(manifestSource);
  const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  assert.match(layout, /\/icons\/favicon-32\.png/);
  assert.match(layout, /\/icons\/apple-touch-icon\.png/);
  assert.match(iconScript, /\$candleXs = @\(176, 246, 316\)/);
  assert.deepEqual(manifest.icons.map((icon) => icon.src), ["./icons/cake-192.png", "./icons/cake-512.png"]);
  assert.deepEqual(icon192.subarray(0, 8), pngSignature);
  assert.deepEqual(icon512.subarray(0, 8), pngSignature);
});

test("publishes indexable metadata and discovery files", async () => {
  const [layout, staticIndex, robots, sitemap] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
  ]);

  const canonicalUrl = "https://moerita-ai.github.io/game-anniversary-calendar/";
  assert.match(layout, /alternates: \{ canonical: siteUrl \}/);
  assert.match(layout, /index: true/);
  assert.match(layout, /openGraph:/);
  assert.match(layout, /twitter:/);
  assert.match(staticIndex, new RegExp(`<link rel="canonical" href="${canonicalUrl}"`));
  assert.match(staticIndex, /<meta name="robots" content="index, follow/);
  assert.match(staticIndex, /<script type="application\/ld\+json">/);
  assert.match(staticIndex, /"@type": "WebSite"/);
  assert.match(staticIndex, /<noscript>/);
  assert.doesNotMatch(`${layout}\n${staticIndex}\n${robots}`, /noindex/i);
  assert.match(robots, new RegExp(`Sitemap: ${canonicalUrl}sitemap\\.xml`));
  assert.match(sitemap, new RegExp(`<loc>${canonicalUrl}<\\/loc>`));
});

test("keeps the compact introduction ordered and fluid", async () => {
  const [css, component, calendar] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/components/TodayAnniversaries.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/MonthlyCalendar.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(css, /\.publicationInfo\s*\{/);
  assert.match(css, /\.todayContent\s*\{/);
  assert.match(css, /\.siteDisclaimer\s*\{/);
  assert.match(css, /\.calendarFilterRow\s*\{[^}]*justify-content:flex-start/);
  assert.match(css, /\.publicationInfo,\.publicationInfo>p\s*\{[^}]*font-size:13px/);
  assert.match(css, /\.calendarCell\s*\{[^}]*min-height:162px/);
  assert.match(css, /\.miniRelease b\s*\{[^}]*font-size:12px/);
  assert.match(css, /@media\(min-width:721px\)\{[\s\S]*?\.publicationInfo,[^}]*font-size:15px/);
  assert.match(css, /@media\(min-width:721px\)\{[\s\S]*?\.miniRelease b\{font-size:13px/);
  assert.match(css, /\.calendarCell\.hasBusyWeek\{min-height:150px\}/);
  assert.match(css, /\.calendarSeriesFilter small\{color:inherit;font-size:12px;font-weight:800\}/);
  assert.match(css, /\.unofficialLabel\{font-size:\.45em\}/);
  assert.match(css, /\.titleCakeIcon\{align-self:flex-start;margin-top:2px\}/);
  assert.match(css, /\.titleCakeIcon\{overflow:hidden;background:#fffaf1;object-fit:cover\}/);
  assert.match(css, /@media\(min-width:721px\)\{\.calendarSeriesFilter small\{font-size:12px\}\}/);
  assert.match(css, /@media\(max-width:720px\)[^{]*\{[^}]*\.todaySection/);
  assert.ok(component.indexOf('className="publicationInfo"') < component.indexOf('className="todayContent"'));
  assert.doesNotMatch(component, /todayDate/);
  assert.match(component, /<details className="todayReleasesDisclosure">/);
  assert.match(component, /<strong>本日の発売記念日<\/strong><small>\{games\.length\}作品<\/small>/);
  assert.doesNotMatch(component, /<details className="todayReleasesDisclosure" open/);
  assert.match(calendar, /dayGames\.slice\(0, 3\)/);
  assert.match(calendar, /dayGames\.length > 3/);
  assert.match(calendar, /dayGames\.length - 3/);
  assert.match(calendar, /dayGames\.length >= 3/);
  assert.match(calendar, /busyWeekIndexes\.has\(Math\.floor\(index \/ 7\)\) \? "hasBusyWeek"/);
});

test("shows the registered-list fields as soon as today's foldout opens", async () => {
  const [card, css] = await Promise.all([
    readFile(new URL("../app/components/ReleaseCard.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(card, /releaseCard todayReleaseCard/);
  assert.match(card, /className="todayReleaseFacts"/);
  assert.match(card, /<dt>略称（カレンダー表示名）<\/dt>/);
  assert.match(card, /<dt>発売年月日<\/dt>/);
  assert.match(card, /<dt>機種名<\/dt>/);
  assert.match(card, /<dt>種別<\/dt>/);
  assert.match(card, /className="shortTitleValue"/);
  assert.match(card, /className=\{`releaseTypeTag/);
  assert.match(card, /className="releaseTitleRow"/);
  assert.doesNotMatch(card, /className="seriesEyebrow"/);
  assert.doesNotMatch(card, /releaseCardTapTarget|onDetails|詳細を見る/);
  assert.match(css, /\.todayReleaseFacts\{display:grid!important;grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/);
  assert.doesNotMatch(css, /\.todayReleaseFacts div:nth-child\(3\)\{grid-column:1\/-1\}/);
  assert.doesNotMatch(css, /\.releaseCardTapTarget\{/);
  assert.match(css, /\.todayReleasesDisclosure>summary\{display:flex/);
  assert.match(css, /\.todaySection\.hasReleases\+\.calendarSection\{margin-top:18px\}/);
});

test("matches calendar-day cards to the registered-list fields", async () => {
  const [modal, css] = await Promise.all([
    readFile(new URL("../app/components/ReleaseModal.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(modal, /<dt>略称（カレンダー表示名）<\/dt>/);
  assert.match(modal, /<dt>発売年月日<\/dt>/);
  assert.match(modal, /<dt>機種名<\/dt>/);
  assert.match(modal, /<dt>種別<\/dt>/);
  assert.match(modal, /className="shortTitleValue"/);
  assert.match(modal, /className=\{`releaseTypeTag/);
  assert.match(modal, /className="releaseTitleRow modalReleaseTitleRow"/);
  assert.doesNotMatch(modal, /modalGameTop/);
  assert.doesNotMatch(modal, /<small>\{gameSeries\?\.name/);
  assert.doesNotMatch(modal, /発売地域|発売元|開発元|modalDescription|modalSources/);
  assert.doesNotMatch(modal, /詳しい情報/);
  assert.match(css, /\.modalGameDetails\{display:grid;grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/);
  assert.match(css, /\.modalGameDetails \.shortTitleValue\{color:#404a54\}/);
  assert.match(css, /\.releaseTitleRow\{display:grid;grid-template-columns:minmax\(0,1fr\) auto/);
  assert.match(css, /\.releaseTitleRow h3\{min-width:0;overflow-wrap:anywhere\}/);
  assert.match(css, /\.releaseTitleRow \.anniversaryBadge\{position:static/);
  assert.match(css, /\.miniRelease b\{color:var\(--ink\)\}/);
  assert.match(css, /@media\(max-width:720px\)[\s\S]*?\.modalGameDetails\{grid-template-columns:1fr 1fr/);
});
