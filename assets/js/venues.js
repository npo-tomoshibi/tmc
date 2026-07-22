const VENUE_STATUS = {
  OPEN: "open",
  COMING_SOON: "coming-soon",
  SOLD_OUT: "sold-out",
  CLOSED: "closed",
  CANCELLED: "cancelled",
};

const VENUE_CANCELLATION_NOTICE_URL = "https://tmsb.or.jp/news/IO0nYMF8";

const TMC_VENUES = [
  {
    slug: "tokushima",
    label: "徳島",
    area: "Tokushima",
    color: "#1B4E8A",
    href: "./tokushima/",
    pageHref: "../tokushima/",
    banner: "/assets/images/venues/banner-tokushima.svg",
    shape: "/assets/images/prefectures/prefecture-tokushima.svg",
    mapX: "30%",
    mapY: "80%",
    date: "2026-08-08",
    dateLabel: "08/08 13:30〜",
    startTime: "13:30",
    venueName: "徳島駅クレメントプラザ 5F とくしまDX推進HUB toku-Noix",
    venueShortName: "とくしまDX推進HUB toku-Noix",
    target: "小・中学生",
    capacity: 30,
    capacityLabel: "30名",
    fee: "3,600円",
    status: VENUE_STATUS.OPEN,
    statusLabel: "申込受付中",
    isCampaignEligible: true,
    peatixUrl: "https://tmc-tokushima.peatix.com",
    noticeUrl: null,
    address: "後日公開",
    venueInfo: [
      "受付開始は開始時刻の15分前を予定しています。",
      "イベントは室内で実施します。",
    ],
    access: {
      public: "後日公開",
      car: "後日公開",
      parking: "後日公開",
    },
    belongings: [
      "筆記用具",
      "飲み物",
    ],
    attention: [
      "当日は動きやすい服装でお越しください。",
      "体調がすぐれない場合は参加をお控えください。",
      "写真・動画撮影については、申込ページまたは当日の案内をご確認ください。",
    ],
  },
  {
    slug: "hyogo",
    label: "兵庫",
    area: "Hyogo",
    color: "#0076B6",
    href: "./hyogo/",
    pageHref: "../hyogo/",
    banner: "/assets/images/venues/banner-hyogo.svg",
    shape: "/assets/images/prefectures/prefecture-hyogo.svg",
    mapX: "50%",
    mapY: "45%",
    date: "2026-08-09",
    dateLabel: "08/09 13:30〜",
    startTime: "13:30",
    venueName: "兵庫県立兵庫津ミュージアム",
    venueFullName: "兵庫県立兵庫津ミュージアム",
    target: "小・中学生",
    capacity: 60,
    capacityLabel: "60名",
    fee: "3,600円",
    status: VENUE_STATUS.OPEN,
    statusLabel: "申込受付中",
    isCampaignEligible: true,
    peatixUrl: "https://tmc-hyogo.peatix.com",
    noticeUrl: null,
    address: "後日公開",
    venueInfo: [
      "受付開始は開始時刻の15分前を予定しています。",
      "イベントは室内で実施します。",
    ],
    access: {
      public: "後日公開",
      car: "後日公開",
      parking: "後日公開",
    },
    belongings: [
      "筆記用具",
      "飲み物",
    ],
    attention: [
      "当日は動きやすい服装でお越しください。",
      "体調がすぐれない場合は参加をお控えください。",
      "写真・動画撮影については、申込ページまたは当日の案内をご確認ください。",
    ],
  },
  {
    slug: "kyoto",
    label: "京都",
    area: "Kyoto",
    color: "#6A2C70",
    href: "./kyoto/",
    pageHref: "../kyoto/",
    banner: "/assets/images/venues/banner-kyoto.svg",
    shape: "/assets/images/prefectures/prefecture-kyoto.svg",
    mapX: "72%",
    mapY: "36%",
    date: "2026-08-11",
    dateLabel: "08/11 13:30〜",
    startTime: "13:30",
    venueName: "京都アスニー",
    target: "小・中学生",
    capacity: 40,
    capacityLabel: "40名",
    fee: "3,600円",
    status: VENUE_STATUS.CANCELLED,
    statusLabel: "開催中止",
    isCampaignEligible: false,
    peatixUrl: null,
    noticeUrl: VENUE_CANCELLATION_NOTICE_URL,
    address: "後日公開",
    venueInfo: [
      "受付開始は開始時刻の15分前を予定しています。",
      "イベントは室内で実施します。",
    ],
    access: {
      public: "後日公開",
      car: "後日公開",
      parking: "後日公開",
    },
    belongings: [
      "筆記用具",
      "飲み物",
    ],
    attention: [
      "当日は動きやすい服装でお越しください。",
      "体調がすぐれない場合は参加をお控えください。",
      "写真・動画撮影については、申込ページまたは当日の案内をご確認ください。",
    ],
  },
  {
    slug: "shiga",
    label: "滋賀",
    area: "Shiga",
    color: "#4F8A5B",
    href: "./shiga/",
    pageHref: "../shiga/",
    banner: "/assets/images/venues/banner-shiga.svg",
    shape: "/assets/images/prefectures/prefecture-shiga.svg",
    mapX: "86%",
    mapY: "32%",
    date: "2026-08-12",
    dateLabel: "08/12 13:30〜",
    startTime: "13:30",
    venueName: "草津市立市民交流プラザ 小会議室2",
    venueShortName: "草津市立市民交流プラザ",
    target: "小・中学生",
    capacity: 30,
    capacityLabel: "30名",
    fee: "3,600円",
    status: VENUE_STATUS.CANCELLED,
    statusLabel: "開催中止",
    isCampaignEligible: false,
    peatixUrl: null,
    noticeUrl: VENUE_CANCELLATION_NOTICE_URL,
    address: "後日公開",
    venueInfo: [
      "受付開始は開始時刻の15分前を予定しています。",
      "イベントは室内で実施します。",
    ],
    access: {
      public: "後日公開",
      car: "後日公開",
      parking: "後日公開",
    },
    belongings: [
      "筆記用具",
      "飲み物",
    ],
    attention: [
      "当日は動きやすい服装でお越しください。",
      "体調がすぐれない場合は参加をお控えください。",
      "写真・動画撮影については、申込ページまたは当日の案内をご確認ください。",
    ],
  },
  {
    slug: "nara",
    label: "奈良",
    area: "Nara",
    color: "#7BA23F",
    href: "./nara/",
    pageHref: "../nara/",
    banner: "/assets/images/venues/banner-nara.svg",
    shape: "/assets/images/prefectures/prefecture-nara.svg",
    mapX: "76%",
    mapY: "58%",
    date: "2026-08-13",
    dateLabel: "08/13 13:30〜",
    startTime: "13:30",
    venueName: "なら歴史芸術文化村",
    target: "小・中学生",
    capacity: 30,
    capacityLabel: "30名",
    fee: "3,600円",
    status: VENUE_STATUS.CANCELLED,
    statusLabel: "開催中止",
    isCampaignEligible: false,
    peatixUrl: null,
    noticeUrl: VENUE_CANCELLATION_NOTICE_URL,
    address: "後日公開",
    venueInfo: [
      "受付開始は開始時刻の15分前を予定しています。",
      "イベントは室内で実施します。",
    ],
    access: {
      public: "後日公開",
      car: "後日公開",
      parking: "後日公開",
    },
    belongings: [
      "筆記用具",
      "飲み物",
    ],
    attention: [
      "当日は動きやすい服装でお越しください。",
      "体調がすぐれない場合は参加をお控えください。",
      "写真・動画撮影については、申込ページまたは当日の案内をご確認ください。",
    ],
  },
  {
    slug: "wakayama",
    label: "和歌山",
    area: "Wakayama",
    color: "#F39800",
    href: "./wakayama/",
    pageHref: "../wakayama/",
    banner: "/assets/images/venues/banner-wakayama.svg",
    shape: "/assets/images/prefectures/prefecture-wakayama.svg",
    mapX: "56%",
    mapY: "74%",
    date: "2026-08-15",
    dateLabel: "08/15 13:30〜",
    startTime: "13:30",
    venueName: "和歌山ビッグ愛 802会議室",
    venueShortName: "和歌山ビッグ愛",
    target: "小・中学生",
    capacity: 20,
    capacityLabel: "20名",
    fee: "3,600円",
    status: VENUE_STATUS.CANCELLED,
    statusLabel: "開催中止",
    isCampaignEligible: false,
    peatixUrl: null,
    noticeUrl: VENUE_CANCELLATION_NOTICE_URL,
    address: "後日公開",
    venueInfo: [
      "受付開始は開始時刻の15分前を予定しています。",
      "イベントは室内で実施します。",
    ],
    access: {
      public: "後日公開",
      car: "後日公開",
      parking: "後日公開",
    },
    belongings: [
      "筆記用具",
      "飲み物",
    ],
    attention: [
      "当日は動きやすい服装でお越しください。",
      "体調がすぐれない場合は参加をお控えください。",
      "写真・動画撮影については、申込ページまたは当日の案内をご確認ください。",
    ],
  },
  {
    slug: "osaka",
    label: "大阪",
    area: "Osaka",
    color: "#F58220",
    href: "./osaka/",
    pageHref: "../osaka/",
    banner: "/assets/images/venues/banner-osaka.svg",
    shape: "/assets/images/prefectures/prefecture-osaka.svg",
    mapX: "66%",
    mapY: "48%",
    date: "2026-08-16",
    dateLabel: "08/16 13:30〜",
    startTime: "13:30",
    venueName: "大阪産業創造館 研修室A・B",
    venueShortName: "大阪産業創造館",
    target: "小・中学生",
    capacity: 60,
    capacityLabel: "60名",
    fee: "3,600円",
    status: VENUE_STATUS.CANCELLED,
    statusLabel: "開催中止",
    isCampaignEligible: false,
    peatixUrl: null,
    noticeUrl: VENUE_CANCELLATION_NOTICE_URL,
    address: "後日公開",
    venueInfo: [
      "受付開始は開始時刻の15分前を予定しています。",
      "イベントは室内で実施します。",
    ],
    access: {
      public: "後日公開",
      car: "後日公開",
      parking: "後日公開",
    },
    belongings: [
      "筆記用具",
      "飲み物",
    ],
    attention: [
      "当日は動きやすい服装でお越しください。",
      "体調がすぐれない場合は参加をお控えください。",
      "写真・動画撮影については、申込ページまたは当日の案内をご確認ください。",
    ],
  },
];

function getVenuesByDate() {
  return [...TMC_VENUES].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}

function getOtherVenuesByDate(currentSlug) {
  return getVenuesByDate().filter((venue) => venue.slug !== currentSlug);
}

function getActiveVenuesByDate() {
  return getVenuesByDate().filter((venue) => venue.status === VENUE_STATUS.OPEN);
}

function getCancelledVenuesByDate() {
  return getVenuesByDate().filter((venue) => venue.status === VENUE_STATUS.CANCELLED);
}

function getCampaignVenuesByDate() {
  return getVenuesByDate().filter(
    (venue) =>
      venue.status === VENUE_STATUS.OPEN &&
      venue.isCampaignEligible === true &&
      Boolean(venue.peatixUrl),
  );
}

const TMC_PROGRAM_STEPS = [
  ["01", "困りごとを見つける", "家や学校、まちの中にある「あれ？」を観察して、発明の種を探します。"],
  ["02", "解決アイデアを考える", "どうすれば変えられそうかを、ノートに描きながら考えます。"],
  ["03", "ものづくりで形にする", "材料や道具を使い、試しながら小さな発明にしていきます。"],
  ["04", "作ったものを発表する", "できたものと考えたことを、自分の言葉で伝えます。"],
];

const TMC_ATTENTION_ITEMS = [
  ["開催会場の変更について", '徳島会場・兵庫会場のみ開催します。京都・滋賀・奈良・和歌山・大阪会場は開催中止となりました。<a href="https://tmsb.or.jp/news/IO0nYMF8" target="_blank" rel="noopener noreferrer">開催中止について詳しく見る</a>'],
  ["参加に関する注意事項", "各会場は事前申込制です。対象、定員、参加条件などの詳細は各会場の申込ページで案内します。"],
  ["持ち物について", "必要な持ち物は会場ごとに異なります。申込ページまたは会場詳細で案内します。"],
  ["会場での安全について", "スタッフが制作をサポートし、道具の扱い方を説明します。安全のため、スタッフの案内に沿ってご参加ください。"],
  ["写真・動画撮影について", "記録や広報のために撮影を行う場合があります。方針や確認方法は申込時または会場詳細で案内します。"],
  ["キャンセルについて", "キャンセル方法や締切は各申込ページで案内します。参加できなくなった場合は早めの手続きをお願いします。"],
  ["体調不良時の対応について", "発熱や体調不良がある場合は参加をお控えください。詳しい扱いは各会場の申込ページで案内します。"],
  ["保護者の付き添いについて", "付き添いの可否や待機場所は会場によって異なります。詳細は各会場の申込ページで案内します。"],
];

const TMC_FAQ_ITEMS = [
  ["どの会場で開催されますか？", '徳島会場と兵庫会場で開催します。京都・滋賀・奈良・和歌山・大阪会場は開催中止となりました。<a href="https://tmsb.or.jp/news/IO0nYMF8" target="_blank" rel="noopener noreferrer">詳細は主催者からのお知らせをご確認ください。</a>'],
  ["ものづくりが初めてでも参加できますか？", "はい。初めての方でも参加しやすい内容にし、スタッフが制作をサポートします。"],
  ["対象は何年生ですか？", "小中学生を対象にしています。学年などの詳しい条件は各会場の申込ページで案内します。"],
  ["保護者の付き添いは必要ですか？", "会場ごとに案内します。付き添いの可否や待機場所は各会場の申込ページをご確認ください。"],
  ["兄弟姉妹で参加できますか？", "定員や対象条件に合えば参加できます。申込方法の詳細は各会場の申込ページで案内します。"],
  ["参加費はいくらですか？", "参加費は後日公開です。詳細は各会場の申込ページで案内します。"],
  ["持ち物はありますか？", "必要な持ち物がある場合は、各会場の申込ページまたは会場詳細で案内します。"],
  ["どのくらいの時間がかかりますか？", "開催時間は後日公開です。詳細は各会場の申込ページで案内します。"],
  ["危険な工具は使いますか？", "使用する道具は内容に合わせて選び、スタッフが使い方を説明します。安全面の詳細は各会場で案内します。"],
  ["写真や動画の撮影はありますか？", "撮影を行う場合があります。方針は申込時または会場詳細で案内します。"],
  ["キャンセルはできますか？", "キャンセル方法は各会場の申込ページで案内します。"],
  ["遅刻した場合は参加できますか？", "進行状況により異なります。詳細は各会場の申込ページで案内します。"],
  ["作ったものは持ち帰れますか？", "原則として持ち帰りを想定していますが、内容により異なる場合があります。詳細は各会場で案内します。"],
];

const TMC_SHARE_TEXT =
  "徳島・兵庫で開催する小中学生向けものづくり体験イベント「TOMOSHIBI MAKERS CARAVAN」。身近な困りごとを解決する発明づくりに挑戦しよう！";
