import type { GameRelease } from "../types/game";
import { PublicationDetails } from "./PublicationDetails";
import { ReleaseCard } from "./ReleaseCard";

export function TodayAnniversaries({ games, year, registeredCount }: {
  games: GameRelease[];
  year: number;
  registeredCount: number;
}) {
  return <section className={`todaySection ${games.length ? "hasReleases" : "isEmpty"}`} aria-labelledby="page-title">
    <div className="sectionHeading">
      <h1 id="page-title"><img className="titleCakeIcon" src="./icons/cake-192.png" alt="" /><span className="titleText">スクエニ作品<br />発売記念日カレンダー<span className="unofficialLabel">（非公式）</span></span></h1>
    </div>
    <div className="publicationInfo">
      <p>公開情報で発売日を確認できた作品を掲載しています。</p>
      <p>未登録の作品があります。（登録作品数：{registeredCount}作品）</p>
      <p>リメイク・リマスター、移植、スマートフォン・アーケード専用作品などは対象外です。</p>
      <details className="siteDisclaimer">
        <summary><span>掲載方針と注意事項</span><span className="disclaimerToggle" aria-hidden="true"><b /></span></summary>
        <div className="siteDisclaimerBody"><PublicationDetails /></div>
      </details>
    </div>
    {games.length > 0 && <div className="todayContent"><details className="todayReleasesDisclosure"><summary><span className="todayReleaseSummaryLabel"><strong>本日の発売記念日</strong><small>{games.length}作品</small></span><span className="todayReleaseToggle" aria-hidden="true"><b /></span></summary><div className="releaseList todayReleaseList">{games.map((game) => <ReleaseCard key={game.id} game={game} year={year} />)}</div></details></div>}
  </section>;
}
