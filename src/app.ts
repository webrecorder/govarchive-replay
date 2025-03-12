import {
  html,
  css,
  LitElement,
  type TemplateResult,
  type CSSResultGroup,
} from "lit";
import { rwpLogoAnimated, serviceWorkerActivated, SWManager, wrapCss } from "replaywebpage/utils";
import { property } from "lit/decorators.js";

export class ProxyInitApp extends LitElement {
  @property({ type: String })
  errorMessage?: TemplateResult<1> | string;

  static get styles(): CSSResultGroup {
    return wrapCss(ProxyInitApp.appStyles);
  }

  static get appStyles(): CSSResultGroup {
    return css`
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
      }

      .error {
        white-space: pre-wrap;
        margin-bottom: 2em;
      }

      section.container {
        margin: auto;
      }
    `;
  }

  async initProxyApp(
    waczFile: string,
    startingOrigin: string,
    proxyTs: string,
    bannerScript: string,
  ) {
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
      appName: "Replay",
    });

    try {
      await swmanager.register();
    } catch (e) {
      this.errorMessage = swmanager.renderErrorReport();
    }

    await serviceWorkerActivated();

    const p = new Promise<void>((resolve) => {
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data.msg_type === "collAdded") {
          resolve();
        }
      });
    });

    navigator.serviceWorker.controller!.postMessage(msg);

    await Promise.race([p, new Promise<void>(resolve => setTimeout(resolve, 30000))]);

    window.location.reload();
  }

  render() {
    if (this.errorMessage) {
      return this.errorMessage;
    }

    return html`
      <section class="container is-align-content-center">
        <div class="is-justify-content-center is-flex">
          <fa-icon
            size="5rem"
            style="margin-bottom: 1rem;"
            .svg=${rwpLogoAnimated}
            aria-label="ReplayWeb.page Logo"
            role="img"
          ></fa-icon>
        </div>
        <div class="level">
          <div class="level-item has-text-centered">
            <div>Loading web archive...</div>
          </div>
        </div>
      </section>
    `;
  }
}

export function addArchiveInit() {
  customElements.define("web-archive", ProxyInitApp);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (self as any).initWebArchive = async ({archiveSourceUrl, proxyOrigin, proxyTs = "", bannerScript = "./proxyui.js", collName, collUrl} : {
    archiveSourceUrl: string,
    proxyOrigin: string,
    proxyTs?: string,
    bannerScript?: string,
    collName?: string,
    collUrl?: string
  }
  ) => {
    const elem = document.createElement("web-archive") as ProxyInitApp;
    document.body.appendChild(elem);

    if (collName) {
      self.localStorage.setItem("__wb_collName", collName);
    }
    if (collUrl) {
      self.localStorage.setItem("__wb_collUrl", collUrl);
    }

    return elem.initProxyApp(archiveSourceUrl, proxyOrigin, proxyTs, bannerScript);
  };
}
