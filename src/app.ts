import { html, css, LitElement, type CSSResultGroup } from "lit";
import { serviceWorkerActivated, SWManager } from "replaywebpage/utils";
import rwpLogoAnimated from "@webrecorder/hickory/icons/brand/replaywebpage-icon-color-animated.svg";
import rwpLogo from "@webrecorder/hickory/icons/brand/replaywebpage-icon-color.svg";
import { property } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import theme from "./theme";

declare let self: Window & {
  initWebArchive: ({
    archiveSourceUrl,
    proxyOrigin,
    proxyTs,
    bannerScript,
    collName,
    collUrl,
  }: {
    archiveSourceUrl: string;
    proxyOrigin: string;
    proxyTs?: string;
    bannerScript?: string;
    collName?: string;
    collUrl?: string;
  }) => Promise<void>;
};

export class ProxyInitApp extends LitElement {
  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: "closed",
  };

  @property({ type: String })
  errorMessage?: string;

  @property({ type: String })
  collName = "";

  @property({ type: String })
  collUrl = "";

  static get styles(): CSSResultGroup {
    return [
      theme,
      css`
        :host {
          position: fixed;
          left: 0px;
          top: 0px;
          bottom: 0px;
          right: 0px;
          display: flex;
          height: 300px;
          min-width: 0px;
          flex-direction: column;
          font-size: 16px;
        }

        .error {
          white-space: pre-wrap;
          margin-bottom: 2em;
        }

        section.container {
          margin: auto;
        }
      `,
    ];
  }

  async initProxyApp(
    waczFile: string,
    startingOrigin: string,
    proxyTs: string,
    bannerScript: string,
    collName?: string,
    collUrl?: string,
  ) {
    this.collName = collName || "";
    this.collUrl = collUrl || "";

    const baseUrl = new URL(window.location.href);
    baseUrl.hash = "";

    const bannerURL = new URL(bannerScript, baseUrl);
    bannerURL.search = "banner=1";

    const msg = {
      msg_type: "addColl",
      name: "proxyreplay",
      type: "wacz",
      file: { sourceUrl: waczFile },
      skipExisting: false,
      extraConfig: {
        isLive: false,
        baseUrl: baseUrl.href,
        baseUrlHashReplay: true,
        proxyOrigin: new URL(startingOrigin).origin,
        proxyTs: proxyTs,
        proxyBannerUrl: bannerURL.href,
      },
    };

    const swName = "sw.js?root=proxyreplay&proxyOriginMode=1";

    const swmanager = new SWManager({
      name: swName,
      scope: "/",
      requireSubdomainIframe: false,
      appName: "GovArchive",
    });

    try {
      await swmanager.register();
    } catch (_e) {
      this.errorMessage = swmanager.errorMsg || "";
      return;
    }

    await serviceWorkerActivated();

    const p = new Promise<void>((resolve) => {
      navigator.serviceWorker.addEventListener(
        "message",
        (
          event: MessageEvent<{
            msg_type: string;
          }>,
        ) => {
          if (event.data.msg_type === "collAdded") {
            resolve();
          }
        },
      );
    });

    navigator.serviceWorker.controller!.postMessage(msg);

    await Promise.race([
      p,
      new Promise<void>((resolve) => setTimeout(resolve, 30000)),
    ]);

    window.location.reload();
  }

  render() {
    return html`
      <section
        class="grid min-h-full m-4 gap-4 place-content-center place-items-center"
      >
        ${this.errorMessage
          ? html`
              <div
                aria-label="ReplayWeb.page Logo"
                role="img"
                class="*:size-full size-6 inline-block"
              >
                ${unsafeSVG(rwpLogo)}
              </div>
              <p class="text-red-400">${this.errorMessage}</p>
            `
          : html` <div
                aria-label="ReplayWeb.page Logo"
                role="img"
                class="*:size-full size-20 inline-block"
              >
                ${unsafeSVG(rwpLogoAnimated)}
              </div>
              <p>Loading <strong>${this.collName}</strong> Web Archive...</p>`}
        <a class="mt-8 text-blue-500" href="${this.collUrl}" target="_blank"
          >(View Full Collection on Browsertrix)</a
        >
      </section>
    `;
  }
}

export function addArchiveInit() {
  customElements.define("web-archive", ProxyInitApp);

  self.initWebArchive = async ({
    archiveSourceUrl,
    proxyOrigin,
    proxyTs = "",
    bannerScript = "./proxyui.js",
    collName,
    collUrl,
  }: {
    archiveSourceUrl: string;
    proxyOrigin: string;
    proxyTs?: string;
    bannerScript?: string;
    collName?: string;
    collUrl?: string;
  }) => {
    const elem = document.createElement("web-archive") as ProxyInitApp;
    document.body.appendChild(elem);

    if (collName) {
      self.localStorage.setItem("__wb_collName", collName);
    }
    if (collUrl) {
      self.localStorage.setItem("__wb_collUrl", collUrl);
    }

    return elem.initProxyApp(
      archiveSourceUrl,
      proxyOrigin,
      proxyTs,
      bannerScript,
      collName,
      collUrl,
    );
  };
}
