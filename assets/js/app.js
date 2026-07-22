(function () {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const fallback = (value) => value || "後日公開";
  const currentSlug = document.body.dataset.venue || "";
  const isCampaignPage = document.body.dataset.page === "campaign";
  const isSubPage = Boolean(currentSlug) || isCampaignPage;
  const rootHref = isSubPage ? "../" : "./";

  function assetPath(path) {
    return `${rootHref}${path}`;
  }

  function venueAssetPath(path) {
    if (!path) return "";
    return assetPath(path.replace(/^\/+/, ""));
  }

  function renderMobileChrome() {
    const header = $(".site-header");
    if (!header) return;

    const topPrefix = isSubPage ? "../" : "";
    const campaignHref = isCampaignPage
      ? "./"
      : currentSlug
        ? "../campaign/"
        : "./campaign/";
    const campaignCurrent = isCampaignPage ? ' class="is-current" aria-current="page"' : "";
    const mobileVenueLinks = getVenuesByDate().map((venue) => {
      const isCancelled = venue.status === VENUE_STATUS.CANCELLED;
      const classes = [venue.slug === currentSlug ? "is-current" : "", isCancelled ? "is-cancelled" : ""].filter(Boolean).join(" ");
      const classAttribute = classes ? ` class="${classes}"` : "";
      const status = isCancelled ? "<small>CANCELLED</small>" : "";
      return `<a href="${isSubPage ? venue.pageHref : venue.href}"${classAttribute}>${venue.area.toUpperCase()} <span>${venue.date.replaceAll("-", ".")}</span>${status}</a>`;
    }).join("");

    header.innerHTML = `
      <a href="${rootHref}" class="site-header__logo" aria-label="TOMOSHIBI MAKERS CARAVAN トップへ">
        <img src="${assetPath("assets/images/tmc_yoko.svg")}" alt="TOMOSHIBI MAKERS CARAVAN">
      </a>
      <button
        type="button"
        class="site-header__menu-button"
        aria-expanded="false"
        aria-controls="mobile-navigation"
        aria-label="メニューを開く"
      >
        <span></span>
        <span></span>
      </button>
    `;

    let mobileNav = $("#mobile-navigation");
    if (!mobileNav) {
      header.insertAdjacentHTML(
        "afterend",
        '<nav class="mobile-nav" id="mobile-navigation" aria-label="サイト内ナビゲーション"></nav>',
      );
      mobileNav = $("#mobile-navigation");
    }

    mobileNav.innerHTML = `
      <a href="${topPrefix}#top">TOP</a>
      <a href="${topPrefix}#about">ABOUT</a>
      <a href="${topPrefix}#schedule">SCHEDULE</a>
      <a href="${topPrefix}#map">MAP</a>
      <a href="${topPrefix}#program">PROGRAM</a>
      <a href="${topPrefix}#parents">PARENTS</a>
      <a href="${topPrefix}#attention">ATTENTION</a>
      <a href="${topPrefix}#faq">FAQ</a>
      <a href="${topPrefix}#organizer">ORGANIZER</a>
      <a href="${campaignHref}"${campaignCurrent}>CAMPAIGN</a>
      <div class="mobile-nav__venues" aria-label="会場一覧">
        ${mobileVenueLinks}
      </div>
    `;

    const menuButton = $(".site-header__menu-button", header);
    const setMenuState = (isOpen) => {
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
      mobileNav.classList.toggle("is-open", isOpen);
      document.body.classList.toggle("is-mobile-nav-open", isOpen);

      if (window.tmcLenis) {
        if (isOpen) window.tmcLenis.stop();
        else window.tmcLenis.start();
      }
    };

    menuButton.addEventListener("click", () => {
      setMenuState(menuButton.getAttribute("aria-expanded") !== "true");
    });
    $$("a", mobileNav).forEach((link) => link.addEventListener("click", () => setMenuState(false)));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        setMenuState(false);
        menuButton.focus();
      }
    });
    window.matchMedia("(min-width: 960px)").addEventListener("change", (event) => {
      if (event.matches) setMenuState(false);
    });
  }

  function renderDesktopChrome() {
    if ($(".desktop-chrome")) return;
    const topSectionLinks = [
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
    const pagePrefix = isSubPage ? "../" : "";
    const venueLinks = getVenuesByDate().map((venue) => {
      const href = isSubPage ? venue.pageHref : venue.href;
      const isCancelled = venue.status === VENUE_STATUS.CANCELLED;
      const classes = [venue.slug === currentSlug ? "is-current" : "", isCancelled ? "is-cancelled" : ""].filter(Boolean).join(" ");
      const classAttribute = classes ? ` class="${classes}"` : "";
      const dateText = venue.date.replaceAll("-", ".");
      const status = isCancelled ? "<small>CANCELLED</small>" : "";
      return `<a href="${href}"${classAttribute} style="--venue-color: var(--tmc-${venue.slug});">${venue.area.toUpperCase()} <span>${dateText}</span>${status}</a>`;
    }).join("");
    const navLinks = topSectionLinks.map(([label, hash]) => `<a href="${pagePrefix}${hash}">${label}</a>`).join("");
    const campaignHref = isCampaignPage ? "./" : currentSlug ? "../campaign/" : "./campaign/";
    const campaignClass = isCampaignPage ? "desktop-nav__campaign is-current" : "desktop-nav__campaign";
    const campaignAria = isCampaignPage ? ' aria-current="page"' : "";
    const campaignLink = `<a href="${campaignHref}" class="${campaignClass}"${campaignAria}>CAMPAIGN</a>`;

    document.body.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="desktop-chrome desktop-chrome--left">
          <a href="${rootHref}" class="desktop-brand" aria-label="TOMOSHIBI MAKERS CARAVAN トップへ">
            <img src="${assetPath("assets/images/tmc_yoko.svg")}" alt="">
          </a>
        </div>

        <div class="desktop-chrome desktop-chrome--right">
          <nav class="desktop-nav" aria-label="サイト内ナビゲーション">
            ${navLinks}
            ${campaignLink}
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
    if (venue.status === VENUE_STATUS.CANCELLED) {
      return `<span class="${className} sticky-cta__button--disabled" aria-disabled="true">開催中止</span>`;
    }
    if (venue.peatixUrl) {
      return `<a class="${className}" href="${venue.peatixUrl}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    }
    return `<span class="${className} is-disabled" aria-disabled="true">申込準備中</span>`;
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

    const renderCard = (venue) => {
      const isCancelled = venue.status === VENUE_STATUS.CANCELLED;
      const actions = isCancelled
        ? `<a class="button button--secondary button--compact" href="${venue.noticeUrl}" target="_blank" rel="noopener noreferrer">開催中止について</a>`
        : `
            <a class="button button--secondary button--compact" href="${venue.href}">詳細を見る</a>
            ${entryButton(venue, "button button--primary button--compact")}
          `;
      return `
        <article class="venue-card${isCancelled ? " is-cancelled" : ""} reveal" style="--venue-color: ${venue.color}">
          ${renderVenueShape(venue, "venue-card__shape")}
          ${renderVenueBanner(venue)}
          <div class="venue-card__content">
            ${isCancelled ? '<span class="venue-card__cancelled-label">開催中止</span>' : ""}
            <h3>${venue.label}会場</h3>
            <p class="venue-card__venue">${venue.venueShortName || venue.venueName}</p>
            <dl class="mini-meta">
              <div><dt>日時</dt><dd>${fallback(venue.dateLabel)}</dd></div>
              <div><dt>対象</dt><dd>${fallback(venue.target)}</dd></div>
              <div><dt>定員</dt><dd>${fallback(venue.capacityLabel)}</dd></div>
              <div><dt>状態</dt><dd>${venue.statusLabel}</dd></div>
            </dl>
          </div>
          <div class="venue-card__actions">
            ${actions}
          </div>
        </article>
      `;
    };

    const activeCards = getActiveVenuesByDate().map(renderCard).join("");
    const cancelledCards = getCancelledVenuesByDate().map(renderCard).join("");
    container.innerHTML = `
      <section class="venue-group" aria-labelledby="active-venues-title">
        <h3 class="venue-group__title" id="active-venues-title">開催会場</h3>
        <div class="venue-group__list">${activeCards}</div>
      </section>
      <section class="venue-group venue-group--cancelled" aria-labelledby="cancelled-venues-title">
        <h3 class="venue-group__title" id="cancelled-venues-title">開催中止となった会場</h3>
        <div class="venue-group__list">${cancelledCards}</div>
      </section>
    `;
  }

  function renderCampaignVenues() {
    const container = $("#campaignVenueList");
    if (!container) return;

    const campaignVenues = getCampaignVenuesByDate();
    container.innerHTML = campaignVenues.map((venue) => `
      <article class="campaign-venue reveal" style="--venue-color: ${venue.color}">
        ${renderVenueBanner(venue, "campaign-venue__banner")}
        <div class="campaign-venue__body">
          <time class="campaign-venue__date" datetime="${venue.date}">${venue.date.replaceAll("-", ".")}</time>
          <h3 class="campaign-venue__name">${venue.venueName}</h3>
          ${entryButton(venue, "button button--primary campaign-venue__button", "この会場に申し込む")}
        </div>
      </article>
    `).join("");
  }

  function formatDateForMapList(dateString) {
    const [yyyy, mm, dd] = dateString.split("-");
    return `${yyyy}.${mm}.${dd}`;
  }

  function renderMapList() {
    const mapList = $("[data-map-list]");
    if (!mapList) return;
    mapList.innerHTML = getVenuesByDate().map(
      (venue) => {
        const isCancelled = venue.status === VENUE_STATUS.CANCELLED;
        return `
        <a
          href="${venue.href}"
          class="map-list__item${isCancelled ? " is-cancelled" : ""}"
          style="--venue-color: ${venue.color};"
          aria-label="${venue.label}会場${isCancelled ? "・開催中止" : ""}"
        >
          <span class="map-list__dot"></span>
          <span class="map-list__name">${venue.label}</span>
          <span class="map-list__date">${formatDateForMapList(venue.date)}</span>
          <span class="map-list__status">${venue.statusLabel}</span>
          <span class="map-list__arrow" aria-hidden="true">↗</span>
        </a>
      `;
      },
    ).join("");
  }

  function renderMapPins() {
    const map = $("#caravanMap");
    if (!map) return;
    map.insertAdjacentHTML(
      "beforeend",
      getVenuesByDate().map(
        (venue) => {
          const isCancelled = venue.status === VENUE_STATUS.CANCELLED;
          return `
          <a
            href="${venue.href}"
            class="caravan-map__pin${isCancelled ? " is-cancelled" : ""}"
            style="--x: ${venue.mapX}; --y: ${venue.mapY}; --venue-color: ${venue.color};"
            aria-label="${venue.label}会場${isCancelled ? "・開催中止" : "の詳細を見る"}"
          >
            <span class="caravan-map__dot"></span>
            <span class="caravan-map__label">${venue.label}${isCancelled ? "・中止" : ""}</span>
          </a>
        `;
        },
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
        ${venue.status === VENUE_STATUS.CANCELLED ? "" : `
          <div class="venue-hero__actions">
            ${entryButton(venue, "button button--primary", "この会場に申し込む")}
          </div>
        `}
      </div>
      ${renderVenueShape(venue, "venue-hero__shape")}
    `;
  }

  function renderVenueCancellationNotice(venue) {
    if (venue.status !== VENUE_STATUS.CANCELLED) return "";
    return `
      <section class="venue-cancelled-notice" aria-labelledby="cancelled-title">
        <p class="venue-cancelled-notice__label">CANCELLED</p>
        <h2 id="cancelled-title">この会場は開催中止となりました</h2>
        <p>参加をご検討いただいていた皆さまには、心よりお詫び申し上げます。詳細はNPO法人燈からのお知らせをご確認ください。</p>
        <a href="${venue.noticeUrl}" target="_blank" rel="noopener noreferrer">開催中止について詳しく見る</a>
      </section>
    `;
  }

  function renderVenuePage() {
    if (!currentSlug) return;
    const venue = TMC_VENUES.find((item) => item.slug === currentSlug);
    if (!venue) return;
    const isCancelled = venue.status === VENUE_STATUS.CANCELLED;

    document.documentElement.style.setProperty("--current-venue-color", venue.color);
    document.body.classList.toggle("is-cancelled-venue", isCancelled);
    const hero = $(".venue-hero");
    if (hero) {
      hero.style.setProperty("--venue-color", venue.color);
      hero.innerHTML = renderVenueHero(venue);
      if (isCancelled && !$(".venue-cancelled-notice")) {
        hero.insertAdjacentHTML("afterend", renderVenueCancellationNotice(venue));
      }
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
    if (cta) {
      cta.innerHTML = isCancelled
        ? `<p class="venue-entry-cancelled">この会場の申込受付は行っていません。</p><a class="button button--secondary" href="${venue.noticeUrl}" target="_blank" rel="noopener noreferrer">開催中止について詳しく見る</a>`
        : entryButton(venue, "button button--primary", "この会場に申し込む");
    }

    const sticky = $("#venueStickyEntry");
    if (sticky) {
      sticky.innerHTML = isCancelled
        ? '<span class="sticky-cta__button sticky-cta__button--disabled" aria-disabled="true">開催中止</span>'
        : entryButton(venue, "button button--primary button--compact sticky-cta__button sticky-cta__button--entry");
    }

    const others = $("#otherVenues");
    if (others) {
      const renderOtherLink = (item) => {
        const cancelledClass = item.status === VENUE_STATUS.CANCELLED ? " is-cancelled" : "";
        const content = item.banner
          ? `<span class="other-venues__banner"><img src="${venueAssetPath(item.banner)}" alt="${item.area.toUpperCase()}"></span>`
          : `<b>${item.label}</b>`;
        const status = item.status === VENUE_STATUS.CANCELLED ? "<small>開催中止</small>" : "";
        return `<a class="other-venues__link${cancelledClass}" href="${item.pageHref}" style="--venue-color: ${item.color}">${content}${status}</a>`;
      };
      const otherVenues = getOtherVenuesByDate(currentSlug);
      const activeLinks = otherVenues.filter((item) => item.status === VENUE_STATUS.OPEN).map(renderOtherLink).join("");
      const cancelledLinks = otherVenues.filter((item) => item.status === VENUE_STATUS.CANCELLED).map(renderOtherLink).join("");
      others.innerHTML = `
        ${activeLinks ? `<div class="other-venues__group"><h3>開催会場</h3>${activeLinks}</div>` : ""}
        ${cancelledLinks ? `<div class="other-venues__group other-venues__group--cancelled"><h3>開催中止となった会場</h3>${cancelledLinks}</div>` : ""}
      `;
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

  renderMobileChrome();
  renderDesktopChrome();
  renderTopSchedule();
  renderCampaignVenues();
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
