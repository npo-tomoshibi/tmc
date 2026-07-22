import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "campaign/index.html",
  "tokushima/index.html",
  "hyogo/index.html",
  "osaka/index.html",
  "kyoto/index.html",
  "shiga/index.html",
  "nara/index.html",
  "wakayama/index.html",
  "assets/css/style.css",
  "assets/js/venues.js",
  "assets/js/app.js",
  "assets/images/tmc_yoko.svg",
  "assets/images/tmc_tate.svg",
  "assets/images/design.svg",
  "assets/images/favicon/favicon.ico",
  "assets/images/favicon/favicon-16x16.png",
  "assets/images/favicon/favicon-32x32.png",
  "assets/images/favicon/apple-touch-icon.png",
  "assets/images/favicon/icon-192.png",
  "assets/images/favicon/icon-512.png",
  "assets/images/favicon/site.webmanifest",
  "assets/images/venues/banner-tokushima.svg",
  "assets/images/venues/banner-hyogo.svg",
  "assets/images/venues/banner-osaka.svg",
  "assets/images/venues/banner-kyoto.svg",
  "assets/images/venues/banner-shiga.svg",
  "assets/images/venues/banner-nara.svg",
  "assets/images/venues/banner-wakayama.svg",
];

for (const file of requiredFiles) {
  await access(file);
}

const html = await readFile("index.html", "utf8");
const css = await readFile("assets/css/style.css", "utf8");
const venues = await readFile("assets/js/venues.js", "utf8");

const requiredSections = [
  "ABOUT",
  "SCHEDULE",
  "MAP",
  "PROGRAM",
  "FOR PARENTS",
  "MESSAGE",
  "ATTENTION",
  "FAQ",
  "ORGANIZER",
  "SHARE",
];

for (const label of requiredSections) {
  if (!html.includes(label)) {
    throw new Error(`Missing section label: ${label}`);
  }
}

const cancellationNoticeUrl = "https://tmsb.or.jp/news/IO0nYMF8";
const venuesByDate = [
  ["tokushima", "2026-08-08", "30名", "open", "申込受付中", "https://tmc-tokushima.peatix.com", true],
  ["hyogo", "2026-08-09", "60名", "open", "申込受付中", "https://tmc-hyogo.peatix.com", true],
  ["kyoto", "2026-08-11", "40名", "cancelled", "開催中止", null, false],
  ["shiga", "2026-08-12", "30名", "cancelled", "開催中止", null, false],
  ["nara", "2026-08-13", "30名", "cancelled", "開催中止", null, false],
  ["wakayama", "2026-08-15", "20名", "cancelled", "開催中止", null, false],
  ["osaka", "2026-08-16", "60名", "cancelled", "開催中止", null, false],
];

let previousVenueIndex = -1;
for (const [slug, date, capacityLabel, status, statusLabel, peatixUrl, isCampaignEligible] of venuesByDate) {
  if (!venues.includes(`slug: "${slug}"`)) {
    throw new Error(`Missing venue data for ${slug}`);
  }
  const currentVenueIndex = venues.indexOf(`slug: "${slug}"`);
  if (currentVenueIndex <= previousVenueIndex) {
    throw new Error(`Venue data must be in event-date order. Check ${slug}.`);
  }
  previousVenueIndex = currentVenueIndex;
  for (const snippet of [
    `date: "${date}"`,
    `capacityLabel: "${capacityLabel}"`,
    `status: VENUE_STATUS.${status === "open" ? "OPEN" : "CANCELLED"}`,
    `statusLabel: "${statusLabel}"`,
    `isCampaignEligible: ${isCampaignEligible}`,
  ]) {
    if (!venues.includes(snippet)) {
      throw new Error(`Missing required venue field for ${slug}: ${snippet}`);
    }
  }
  if (!venues.includes(`banner: "/assets/images/venues/banner-${slug}.svg"`)) {
    throw new Error(`Missing venue banner path for ${slug}`);
  }
  const venueData = venues.slice(currentVenueIndex, venues.indexOf("\n  },", currentVenueIndex) + 5);
  if (status === "open") {
    if (!venueData.includes(`peatixUrl: "${peatixUrl}"`) || !venueData.includes("noticeUrl: null")) {
      throw new Error(`Open venue must keep its Peatix URL and have no cancellation notice: ${slug}`);
    }
  } else if (!venueData.includes("peatixUrl: null") || !venueData.includes(`noticeUrl: VENUE_CANCELLATION_NOTICE_URL`)) {
    throw new Error(`Cancelled venue must remove its Peatix URL and use the official notice: ${slug}`);
  }
  const page = await readFile(`${slug}/index.html`, "utf8");
  if (!page.includes(`data-venue="${slug}"`)) {
    throw new Error(`Venue page is not wired for ${slug}`);
  }
  const expectedEventStatus = status === "open" ? "EventScheduled" : "EventCancelled";
  if (!page.includes(`https://schema.org/${expectedEventStatus}`)) {
    throw new Error(`Incorrect JSON-LD eventStatus for ${slug}`);
  }
  if (status === "cancelled" && (/tmc-[a-z]+\.peatix\.com/.test(page) || page.includes('"offers"'))) {
    throw new Error(`Cancelled venue must not contain Peatix or offers data: ${slug}`);
  }
}

for (const helper of [
  "function getVenuesByDate()",
  "function getActiveVenuesByDate()",
  "function getCancelledVenuesByDate()",
  "function getCampaignVenuesByDate()",
  "function getOtherVenuesByDate(currentSlug)",
]) {
  if (!venues.includes(helper)) {
    throw new Error(`Venue helper is required: ${helper}`);
  }
}

const app = await readFile("assets/js/app.js", "utf8");
if (!app.includes("getVenuesByDate()") || !app.includes("getOtherVenuesByDate(currentSlug)") || !app.includes("const campaignVenues = getCampaignVenuesByDate();")) {
  throw new Error("Venue list rendering must use date-sorted helpers.");
}

const campaign = await readFile("campaign/index.html", "utf8");
if (!campaign.includes("徳島会場・兵庫会場へのお申し込みが対象") || !campaign.includes('id="campaignVenueList"')) {
  throw new Error("Campaign page must identify and render only eligible venues.");
}
if (!html.includes(cancellationNoticeUrl)) {
  throw new Error("Top page must link to the official cancellation notice.");
}

const sitemap = await readFile("sitemap.xml", "utf8");
if (!sitemap.includes("<loc>https://tmc.tmsb.or.jp/campaign/</loc><priority>0.8</priority>")) {
  throw new Error("sitemap.xml must include the campaign page with priority 0.8.");
}

if (!html.includes('<h1 class="sr-only">TOMOSHIBI MAKERS CARAVAN</h1>')) {
  throw new Error("Hero must include sr-only h1.");
}

if (!html.includes("caravan-map__image") || !html.includes("./assets/images/design.svg")) {
  throw new Error("Caravan map must use design.svg as the base image.");
}

if (!css.includes("--site-max-width: 468px")) {
  throw new Error("Site shell must use the smartphone-width layout.");
}

if (!html.includes("family=Oswald:wght@400;500;600;700") || !html.includes("Zen+Kaku+Gothic+New")) {
  throw new Error("Google Fonts for Oswald and Zen Kaku Gothic New must be loaded.");
}

if (!css.includes('--font-ja: "Zen Kaku Gothic New"') || !css.includes('--font-en: "Oswald"')) {
  throw new Error("Font variables must define Zen Kaku Gothic New and Oswald.");
}

if (css.includes("backdrop-filter") || css.includes("blur(")) {
  throw new Error("Matte design must not use blur or backdrop-filter.");
}

if (css.includes("border-radius: 999px")) {
  throw new Error("Avoid fully pill-shaped border-radius in the cleaned-up design.");
}

if (!css.includes("box-shadow: none")) {
  throw new Error("Matte design should remove card/button shadows.");
}

console.log("TMC static site verification passed.");
