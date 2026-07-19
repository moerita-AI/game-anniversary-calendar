import { SiteDisclaimerText } from "./SiteDisclaimerText";

export function PublicationDetails() {
  return <>
    <section aria-labelledby="publication-policy-heading">
      <h3 id="publication-policy-heading">掲載方針</h3>
      <dl className="scopeSummary">
        <div><dt>対象</dt><dd>旧スクウェア、旧エニックス、スクウェア・エニックスが日本向けに発売した家庭用・携帯型・PC用のオリジナル作品。シリーズ、派生、単独作品の発売日を掲載します。</dd></div>
        <div><dt>対象外</dt><dd>リメイク、リマスター、移植、廉価・再発売、コレクション、追加版・短編、内容がほぼ同じ別版、スマートフォン・アーケード専用、他社主体の作品。</dd></div>
        <div><dt>登録状況</dt><dd>確認できた作品から順次追加しています。未登録作品があります。</dd></div>
      </dl>
    </section>
    <section aria-labelledby="publication-notes-heading">
      <h3 id="publication-notes-heading">注意事項</h3>
      <SiteDisclaimerText />
    </section>
  </>;
}
