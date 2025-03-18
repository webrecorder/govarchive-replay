import { html, css, LitElement } from "lit";
import { property, queryAsync, state } from "lit/decorators.js";

import { tsToDate, dateTimeFormatter } from "replaywebpage/utils";
import rwpIcon from "@webrecorder/hickory/icons/brand/replaywebpage-icon-solid.svg";
import refreshIcon from "bootstrap-icons/icons/arrow-clockwise.svg";
import chevronDown from "bootstrap-icons/icons/chevron-down.svg";
import xIcon from "bootstrap-icons/icons/x-lg.svg";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import theme from "./theme";

declare let self: Window & {
  __wbinfo?: {
    url: string;
    timestamp: string;
    collName?: string;
    collUrl?: string;
  };
};

export class WBBanner extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: "closed",
  };

  @state()
  date: Date | null = null;

  @property({ type: String })
  timestamp = "";

  @property({ type: String })
  origin = "";

  @property({ type: String })
  collName = "";

  @property({ type: String })
  collUrl = "";

  @queryAsync("header.banner")
  banner: Promise<HTMLElement> | undefined;

  @state()
  offset = 28;

  readonly #observer = new ResizeObserver((entries) => {
    this.offset = entries[0].borderBoxSize[0].blockSize;
    const html = document.querySelector("html");
    if (html) {
      html.style.marginTop = `${this.offset}px`;
    }
  });

  connectedCallback(): void {
    super.connectedCallback();
    // if (this.shadowRoot) {
    //   this.shadowRoot.adoptedStyleSheets = [
    //     ...this.shadowRoot.adoptedStyleSheets,
    //     theme,
    //   ];
    // }
    void this.banner?.then((banner) => {
      this.#observer.observe(banner, { box: "border-box" });
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#observer.disconnect();
  }

  static get styles() {
    return [
      theme,
      css`
        :host {
          position: fixed;
          left: 0;
          top: 0;
          margin: 0;
          padding: 0;
          width: 100%;
          height: auto !important;
          z-index: 1000000000;
        }
        .banner {
          width: 100%;
          background: linear-gradient(0deg, #3a5f09 0%, #4d7c0f 100%);
          font-weight: 500;
          padding: calc(1 * var(--spacing)) calc(3 * var(--spacing))
            calc(1 * var(--spacing)) calc(4 * var(--spacing));
          display: flex;
          gap: calc(4 * var(--spacing));
          align-content: center;
          border: none;
          border-bottom: solid;
          border-color: #a39d8f;
          border-bottom-width: 1px;
          font-family: var(
            --default-font-family,
            ui-sans-serif,
            system-ui,
            sans-serif,
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Segoe UI Symbol",
            "Noto Color Emoji"
          );
        }
        .refresh-button {
          color: white;
          background-color: transparent;
          border: 0px;
          cursor: pointer;
          margin-right: calc(3 * var(--spacing));
        }
        .x-button {
          color: white;
          background-color: transparent;
          border: 0px;
          cursor: pointer;
        }
        .controls {
          margin-left: auto;
          display: flex;
          flex-direction: row;
        }
        .banner-top-line {
          display: flex;
          justify-items: space-between;
        }
        .banner-text-container {
          display: flex;
          gap: calc(1 * var(--spacing));
          color: white;
          font-size: calc(3 * var(--spacing));
          & summary {
            cursor: pointer;
          }
          && summary {
            list-style: none;
          }
          && summary::-webkit-details-marker {
            display: none;
          }
        }
        .banner-text {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5em;
          .chevron {
            transition: 150ms ease transform;
          }
        }
        details[open] .chevron {
          transform: rotate(-180deg);
        }
        .details-flexcontainer {
          background-color: #fefcf7;
          color: black;
          font-weight: 400;
          padding: calc(3 * var(--spacing)) calc(4 * var(--spacing));
          width: 100%;
          position: absolute;
          left: 0;
          display: flex;
          justify-content: center;
          border: none;
          border-bottom: solid;
          border-bottom-color: #a39d8f;
          border-bottom-width: 1px;
        }
        .details-container {
          width: 100%;
          max-width: 960px;
          display: flex;
          gap: calc(8 * var(--spacing));
        }
        @media screen and (max-width: 700px) {
          .details-container {
            flex-direction: column;
            gap: 0;
          }
        }
        .details-textsection {
          width: 100%;
          font-size: calc(3.6 * var(--spacing));
          && a {
            color: #035b71;
          }
          && p {
            line-height: calc(4.8 * var(--spacing));
          }
        }
        svg {
          width: 100%;
          height: 100%;
        }
        .icon {
          display: inline-block;
        }
      `,
    ];
  }

  protected firstUpdated(): void {
    if (this.timestamp) {
      this.date = tsToDate(this.timestamp) as Date;
    }
  }

  render() {
    const dateStr = this.date ? dateTimeFormatter.format(this.date) : "";

    return html`
      <header class="banner root">
        <a
          href="https://webrecorder.net/replaywebpage"
          target="_blank"
          title="ReplayWeb.page"
        >
          <span
            class="icon size-4"
            style="color: white;"
            aria-label="ReplayWeb.page Logo"
            role="img"
          >
            ${unsafeSVG(rwpIcon)}
          </span>
        </a>
        <details class="banner-text-container">
          <summary class="banner-text" title="Archive Details">
            You are viewing an archived version of this page from ${dateStr}
            <span class="icon chevron size-4">${unsafeSVG(chevronDown)}</span>
          </summary>
          ${this.renderExpanded()}
        </details>
        <div class="controls">
          <button
            class="refresh-button narrow is-borderless"
            id="refresh"
            @click="${this.fullReload}"
            title="Full Reload"
            aria-label="Full Reload"
          >
            <span class="icon is-small">
              <span
                style="width: 1.1em; height: 1.1em;"
                class="has-text-grey"
                aria-hidden="true"
              >
                ${unsafeSVG(refreshIcon)}
              </span>
            </span>
          </button>
          <button
            class="x-button narrow is-borderless"
            id="close"
            @click="${this.closeBanner}"
            title="Close Banner"
            aria-label="Close Banner"
          >
            <span class="icon is-small">
              <span
                style="width: 1.1em; height: 1.1em;"
                class="has-text-grey"
                aria-hidden="true"
              >
                ${unsafeSVG(xIcon)}
              </span>
            </span>
          </button>
        </div>
      </header>
    `;
  }

  renderExpanded() {
    return html` <div
      class="details-flexcontainer"
      style=${`top: ${this.offset}px`}
    >
      <div class="details-container">
        <div class="details-textsection prose">
          <div>
            <p>
              This page is a single-domain mirror of the original site from
              <i>${this.origin}</i>
            </p>
            ${this.collUrl
              ? html` <p>
                  <strong
                    ><a href="${this.collUrl}" target="_blank"
                      >View the full ${this.collName} Collection</a
                    ></strong
                  >
                </p>`
              : ``}
          </div>
        </div>
      </div>
    </div>`;
  }

  async fullReload() {
    const resp = await fetch("https://wab.ac/api/c/proxyreplay?reload=1", {
      method: "DELETE",
    });

    if (resp.status !== 200) {
      return false;
    }

    if (navigator.serviceWorker.controller) {
      const reg = await navigator.serviceWorker.getRegistration();
      await reg?.unregister();
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    window.location.reload();

    return false;
  }

  closeBanner() {
    this.style.display = "none";
  }

  static addBanner(
    tagName = "rwp-web-archive-banner",
    bannerCls: typeof WBBanner,
  ) {
    // only show banner in top frame
    if (self.top !== self) {
      return;
    }

    addAnalytics();

    customElements.define(tagName, bannerCls);

    const banner = document.createElement(tagName) as WBBanner;

    if (self.__wbinfo) {
      const wbinfo = self.__wbinfo;
      banner.timestamp = wbinfo.timestamp || "";
      banner.origin = new URL(wbinfo.url).origin;
      banner.collName =
        wbinfo.collName || localStorage.getItem("__wb_collName") || "";
      banner.collUrl =
        wbinfo.collUrl || localStorage.getItem("__wb_collUrl") || "";
    }

    const setupBanner = () => {
      document.body.prepend(banner);
      const html = document.querySelector("html");
      if (html) {
        html.style.marginTop = "37.5px";
      }
    };

    document.addEventListener("readystatechange", () => {
      if (document.querySelector(tagName)) {
        return;
      }
      setupBanner();
      setInterval(() => {
        if (!document.querySelector(tagName)) {
          setupBanner();
        }
      }, 1000);
    });
  }
}

function addAnalytics() {
  const script = document.createElement("script");
  script.src =
    "https://wab.ac/proxy/https://p.webrecorder.net/js/script.outbound-links.js";
  script.defer = true;
  script.dataset.domain = "govarchive.us";
  document.head.appendChild(script);
}
