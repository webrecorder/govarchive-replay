import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

import { tsToDate, dateTimeFormatter } from "replaywebpage/utils";
import rwpIcon from "@webrecorder/hickory/icons/brand/replaywebpage-icon-solid.svg";
import refreshIcon from "bootstrap-icons/icons/arrow-clockwise.svg";
import chevronDown from "bootstrap-icons/icons/chevron-down.svg";
import { unsafeSVG } from "replaywebpage";

declare let self: Window & {
  __wbinfo?: {
    url: string;
    timestamp: string;
    collName?: string;
    collUrl?: string;
  };
};

export class WBBanner extends LitElement {
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

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      }
      :host {
        position: fixed;
        left: 0;
        top: 0;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        z-index: 1000000000;
      }
      .banner {
        width: 100%;
        background: linear-gradient(0deg, #3a5f09 0%, #4d7c0f 100%);
        font-family: system-ui, sans-serif;
        font-weight: 500;
        padding: 0.25rem 1rem 0.25rem 1rem;
        display: flex;
        gap: 1rem;
        align-content: center;
        border-bottom: solid;
        border-color: #a39d8f;
        border-width: 1px;
      }
      .refresh-button {
        color: white;
        background-color: transparent;
        border: 0px;
        margin-left: auto;
        cursor: pointer;
      }
      .banner-top-line {
        display: flex;
        justify-items: space-between;
      }
      .banner-text-container {
        display: flex;
        gap: 0.25rem;
        color: white;
        font-size: 0.75rem;
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
        gap: 0.5rem;
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
        padding: 0.75rem 1rem 0.75rem 1rem;
        width: 100%;
        position: absolute;
        left: 0;
        top: 37.5px;
        display: flex;
        justify-content: center;
        border-bottom: solid;
        border-color: #a39d8f;
        border-width: 1px;
      }
      .details-container {
        width: 100%;
        max-width: 960px;
        display: flex;
        gap: 2rem;
      }
      @media screen and (max-width: 700px) {
        .details-container {
          flex-direction: column;
          gap: 0;
        }
      }
      .details-textsection {
        width: 100%;
        font-size: 0.9rem;
        && a {
          color: #035b71;
        }
        && a:hover {
          text-underline-offset: 0.2rem;
        }
        && p {
          line-height: 1.2rem;
        }
      }
      svg {
        width: 100%;
        height: 100%;
      }
      .icon {
        display: inline-block;
      }
    `;
  }

  protected firstUpdated(): void {
    if (this.timestamp) {
      this.date = tsToDate(this.timestamp) as Date;
    }
  }

  render() {
    const dateStr = this.date ? dateTimeFormatter.format(this.date) : "";

    return html`
      <header class="banner">
        <a
          href="https://webrecorder.net/replaywebpage"
          target="_blank"
          title="ReplayWeb.page"
        >
          <span
            class="icon"
            style="color: white; width: 1rem; height: 1rem;"
            aria-label="ReplayWeb.page Logo"
            role="img"
          >
            ${unsafeSVG(rwpIcon)}
          </span>
        </a>
        <details class="banner-text-container">
          <summary class="banner-text" title="Archive Details">
            You are viewing an archived version of this page from ${dateStr}
            <span class="icon chevron" style="width: 1rem; height: 1rem;"
              >${unsafeSVG(chevronDown)}</span
            >
          </summary>
          ${this.renderExpanded()}
        </details>
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
      </header>
    `;
  }

  renderExpanded() {
    return html` <div class="details-flexcontainer">
      <div class="details-container">
        <div class="details-textsection">
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

    window.location.reload();

    return false;
  }

  static addBanner(
    tagName = "rwp-web-archive-banner",
    bannerCls: typeof WBBanner,
  ) {
    // only show banner in top frame
    if (self.top !== top) {
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

    const html = document.querySelector("html");
    if (html) {
      html.style.marginTop = "37.5px";
    }

    document.addEventListener("DOMContentLoaded", () => {
      document.body.appendChild(banner);
      setInterval(() => {
        if (!document.querySelector(tagName)) {
          document.body.appendChild(banner);
        }
      }, 1000);
    });
  }
}

function addAnalytics() {
  const script = document.createElement("script");
  script.src = "https://p.webrecorder.net/js/script.outbound-links.js";
  script.defer = true;
  script.dataset.domain = "govarchive.us";
  document.head.appendChild(script);
}
