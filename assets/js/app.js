(function () {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const fallback = (value) => value || "後日公開";
  const currentSlug = document.body.dataset.venue || "";
  const rootHref = currentSlug ? "../" : "./";

  function assetPath(path) {
    return `${rootHref}${path}`;
  }

  function venueAssetPath(path) {
    if (!path) return "";
    return assetPath(path.replace(/^\/+/, ""));
  }

  function renderDesktopChrome() {
    if ($(".desktop-chrome")) return;
    const sectionLinks = [
      ["TOP", "#top"],
      ["ABOUT", "#about"],
      ["SCHEDULE", "#schedule"],
      ["MAP", "#map"],
      ["PROGRAM", "#program"],
      ["PARENTS", "#parents"],
      ["ATTENTION", "#attention"],
      ["FAQ", "#faq"],
      ["ORGANIZER", "#organizer"],
    ];
    const pagePrefix = currentSlug ? "../" : "";
    const venueLinks = getVenuesByDate().map((venue) => {
      const href = currentSlug ? venue.pageHref : venue.href;
      const currentClass = venue.slug === currentSlug ? ' class="is-current"' : "";
      const dateText = venue.date.replaceAll("-", ".");
      return `<a href="${href}"${currentClass} style="--venue-color: var(--tmc-${venue.slug});">${venue.area.toUpperCase()} <span>${dateText}</span></a>`;
    }).join("");
    const navLinks = sectionLinks.map(([label, hash]) => `<a href="${pagePrefix}${hash}">${label}</a>`).join("");

    document.body.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="desktop-chrome desktop-chrome--left">
          <a href="${rootHref}" class="desktop-brand" aria-label="TOMOSHIBI MAKERS CARAVAN トップへ">
            <img src="${assetPath("assets/images/tmc_yoko.svg")}" alt="">
          </a>
        </div>

        <div class="desktop-chrome desktop-chrome--right">
          <nav class="desktop-nav" aria-label="ページ内ナビゲーション">
            ${navLinks}
            <a href="${rootHref}" class="desktop-nav__home">HOME</a>
            <div class="desktop-nav__venues" aria-label="会場一覧">
              ${venueLinks}
            </div>
          </nav>
        </div>
      `,
    );
  }

  function entryButton(venue, className = "button button--primary", label = "申し込む") {
    if (venue.peatixUrl) {
      return `<a class="${className}" href="${venue.peatixUrl}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    }
    return `<span class="${className} is-disabled" aria-disabled="true">申込準備中</span>`;
  }

  function renderVenueLogo(venue, className = "venue-card__logo") {
    const fallbackMarkup = `<span class="venue-logo-fallback" style="--venue-color: ${venue.color}">${venue.label}</span>`;
    if (!venue.logo) {
      return `<div class="${className}">${fallbackMarkup}</div>`;
    }
    return `
      <div class="${className}">
        <img src="${venueAssetPath(venue.logo)}" alt="${venue.label}会場" onerror="this.hidden=true;this.nextElementSibling.hidden=false">
        <span class="venue-logo-fallback" style="--venue-color: ${venue.color}" hidden>${venue.label}</span>
      </div>
    `;
  }

  function renderVenueShape(venue, className) {
    if (!venue.shape) return "";
    return `
      <div class="${className}" aria-hidden="true">
        <img src="${venueAssetPath(venue.shape)}" alt="">
      </div>
    `;
  }

  function renderVenueBanner(venue, className = "venue-card__banner") {
    if (!venue.banner) {
      return `
        <div class="${className}">
          <span class="venue-banner-fallback" style="--venue-color: ${venue.color}">${venue.area.toUpperCase()}</span>
        </div>
      `;
    }
    return `
      <div class="${className}">
        <img src="${venueAssetPath(venue.banner)}" alt="${venue.area.toUpperCase()}">
      </div>
    `;
  }

  function renderTopSchedule() {
    const container = $("#venueCards");
    if (!container) return;
    const venues = getVenuesByDate();
    container.innerHTML = venues.map(
      (venue) => `
        <article class="venue-card reveal" style="--venue-color: ${venue.color}">
          ${renderVenueShape(venue, "venue-card__shape")}
          ${renderVenueBanner(venue)}
          <h3>${venue.label}会場</h3>
          <p class="venue-card__venue">${venue.venueShortName || venue.venueName}</p>
          <dl class="mini-meta">
            <div><dt>日時</dt><dd>${fallback(venue.dateLabel)}</dd></div>
            <div><dt>対象</dt><dd>${fallback(venue.target)}</dd></div>
            <div><dt>定員</dt><dd>${fallback(venue.capacityLabel)}</dd></div>
            <div><dt>状態</dt><dd>${venue.statusLabel}</dd></div>
          </dl>
          <div class="venue-card__actions">
            <a class="button button--secondary button--compact" href="${venue.href}">詳細を見る</a>
            ${entryButton(venue, "button button--primary button--compact")}
          </div>
        </article>
      `,
    ).join("");
  }

  function formatDateForMapList(dateString) {
    const [yyyy, mm, dd] = dateString.split("-");
    return `${yyyy}.${mm}.${dd}`;
  }

  function renderMapList() {
    const mapList = $("[data-map-list]");
    if (!mapList) return;
    mapList.innerHTML = getVenuesByDate().map(
      (venue) => `
        <a
          href="${venue.href}"
          class="map-list__item"
          style="--venue-color: ${venue.color};"
        >
          <span class="map-list__dot"></span>
          <span class="map-list__name">${venue.label}</span>
          <span class="map-list__date">${formatDateForMapList(venue.date)}</span>
          <span class="map-list__arrow" aria-hidden="true">↗</span>
        </a>
      `,
    ).join("");
  }

  function renderMapPins() {
    const map = $("#caravanMap");
    if (!map) return;
    map.insertAdjacentHTML(
      "beforeend",
      getVenuesByDate().map(
        (venue) => `
          <a
            href="${venue.href}"
            class="caravan-map__pin"
            style="--x: ${venue.mapX}; --y: ${venue.mapY}; --venue-color: ${venue.color};"
            aria-label="${venue.label}会場の詳細を見る"
          >
            <span class="caravan-map__dot"></span>
            <span class="caravan-map__label">${venue.label}</span>
          </a>
        `,
      ).join(""),
    );
  }

  function renderProgram() {
    const container = $("#programSteps");
    if (!container) return;
    container.innerHTML = TMC_PROGRAM_STEPS.map(
      ([no, title, text]) => `
        <article class="program-step reveal">
          <span>${no}</span>
          <h3>${title}</h3>
          <p>${text}</p>
        </article>
      `,
    ).join("");
  }

  function renderAccordion(id, items) {
    const container = $(id);
    if (!container) return;
    container.innerHTML = items.map(([title, text]) => `<details class="reveal"><summary>${title}</summary><p>${text}</p></details>`).join("");
  }

  function renderListOrPending(items) {
    if (!items || items.length === 0) {
      return `<p class="pending-text">後日公開</p>`;
    }

    return `
      <ul class="detail-list">
        ${items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;
  }

  function renderAccess(venue) {
    const access = venue.access || {};
    const rows = [
      ["住所", venue.address],
      ["公共交通", access.public],
      ["車でのアクセス", access.car],
      ["駐車場", access.parking],
    ];

    return `
      <dl class="detail-dl">
        ${rows.map(([label, value]) => `<div><dt>${label}</dt><dd>${fallback(value)}</dd></div>`).join("")}
      </dl>
    `;
  }

  function renderVenueHero(venue) {
    const facts = [
      ["日時", venue.dateLabel],
      ["対象", venue.target],
      ["定員", venue.capacityLabel],
    ];

    return `
      ${renderVenueBanner(venue, "venue-hero__banner")}
      <div class="venue-hero__content">
        <h1 class="venue-hero__title">${venue.label}会場</h1>
        <p class="venue-hero__venue">${venue.venueName}</p>
        <div class="venue-hero__facts" aria-label="イベント概要">
          ${facts.map(([label, value]) => `
            <div class="venue-hero__fact">
              <span class="venue-hero__fact-label">${label}</span>
              <span class="venue-hero__fact-value">${fallback(value)}</span>
            </div>
          `).join("")}
        </div>
        <div class="venue-hero__actions">
          ${entryButton(venue, "button button--primary", "この会場に申し込む")}
        </div>
      </div>
      ${renderVenueShape(venue, "venue-hero__shape")}
    `;
  }

  function renderVenuePage() {
    if (!currentSlug) return;
    const venue = TMC_VENUES.find((item) => item.slug === currentSlug);
    if (!venue) return;

    document.documentElement.style.setProperty("--current-venue-color", venue.color);
    const hero = $(".venue-hero");
    if (hero) {
      hero.style.setProperty("--venue-color", venue.color);
      hero.innerHTML = renderVenueHero(venue);
    }
    $$(".js-venue-status").forEach((el) => (el.textContent = venue.statusLabel));

    const summary = $("#venueSummary");
    if (summary) {
      const rows = [
        ["日時", venue.dateTime || venue.dateLabel],
        ["会場名", venue.venueName],
        ["対象", venue.target],
        ["定員", venue.capacityLabel],
        ["状態", venue.statusLabel],
        ["参加費", venue.fee],
      ];
      summary.innerHTML = rows.map(([label, value]) => `<div class="info-row"><dt>${label}</dt><dd>${fallback(value)}</dd></div>`).join("");
    }

    const info = $("#venueInfo");
    if (info) {
      info.innerHTML = `
        <div class="detail-block">
          <h3>Venue Info</h3>
          ${renderListOrPending(venue.venueInfo)}
        </div>
        <div class="detail-block">
          <h3>Access</h3>
          ${renderAccess(venue)}
        </div>
      `;
    }

    const belongings = $("#venueBelongings");
    if (belongings) belongings.innerHTML = renderListOrPending(venue.belongings);

    const attention = $("#venueAttention");
    if (attention) attention.innerHTML = renderListOrPending(venue.attention);

    const cta = $("#venueEntry");
    if (cta) cta.innerHTML = entryButton(venue, "button button--primary", "この会場に申し込む");

    const sticky = $("#venueStickyEntry");
    if (sticky) sticky.innerHTML = entryButton(venue, "button button--primary button--compact sticky-cta__button sticky-cta__button--entry");

    const others = $("#otherVenues");
    if (others) {
      others.innerHTML = getOtherVenuesByDate(currentSlug).map((item) => {
        const currentClass = item.slug === currentSlug ? " is-current" : "";
        const content = item.banner
          ? `<span class="other-venues__banner"><img src="${venueAssetPath(item.banner)}" alt="${item.area.toUpperCase()}"></span>`
          : `<b>${item.label}</b>`;
        return `<a class="other-venues__link${currentClass}" href="${item.pageHref}" style="--venue-color: ${item.color}">${content}</a>`;
      }).join("");
    }
  }

  function setupShare() {
    const pageUrl = window.location.href;
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedText = encodeURIComponent(TMC_SHARE_TEXT);
    const x = $("#shareX");
    const line = $("#shareLine");
    const native = $("#shareNative");
    const copy = $("#copyUrl");
    const result = $("#copyResult");

    if (x) x.href = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    if (line) line.href = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`;
    if (native) {
      native.hidden = !navigator.share;
      native.addEventListener("click", () => navigator.share({ title: "TOMOSHIBI MAKERS CARAVAN", text: TMC_SHARE_TEXT, url: pageUrl }));
    }
    if (copy) {
      copy.addEventListener("click", async () => {
        await navigator.clipboard.writeText(pageUrl);
        if (result) result.textContent = "URLをコピーしました。";
      });
    }
  }

  function setupReveal() {
    const targets = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );
    targets.forEach((target) => observer.observe(target));
  }

  function initSmoothScroll() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      document.documentElement.classList.add("is-reduced-motion");
      return;
    }

    if (typeof Lenis === "undefined") {
      return;
    }

    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    $$('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        const href = anchor.getAttribute("href");

        if (!href || href === "#") return;

        const target = $(href);
        if (!target) return;

        event.preventDefault();

        lenis.scrollTo(target, {
          offset: 0,
          duration: 0.8,
        });
      });
    });

    window.tmcLenis = lenis;
  }

  renderDesktopChrome();
  renderTopSchedule();
  renderMapList();
  renderMapPins();
  renderProgram();
  renderAccordion("#attentionList", TMC_ATTENTION_ITEMS);
  renderAccordion("#faqList", TMC_FAQ_ITEMS);
  renderVenuePage();
  setupShare();
  setupReveal();
  initSmoothScroll();
})();
