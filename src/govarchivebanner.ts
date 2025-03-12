import { html } from "lit";
import { WBBanner } from "./banner";

// GovArchiveBanner
export class GovArchiveBanner extends WBBanner {
  renderExpanded() {
    return html` <div class="details-flexcontainer">
      <div class="details-container">
        <div class="details-textsection">
          <div>
            <p>
              <strong
                >This web archive was created by
                <a href="https://webrecorder.net" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style="height: 0.75rem; width: auto; margin-left: 0.2rem; vertical-align: middle;"
                    viewBox="0 0 1142 96"
                  >
                    <title>Webrecorder</title>
                    <path
                      d="M29.438 24.438C22.474 29.935 18 38.449 18 48c0 16.557 13.443 30 30 30h26c16.557 0 30-13.443 30-30v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7c0 26.492-21.508 48-48 48H48C21.508 96 0 74.492 0 48c0-14.517 6.458-27.539 16.657-36.343l-9.95-9.95A1.002 1.002 0 0 1 7.414 0H40a1 1 0 0 1 1 1v32.586a1.002 1.002 0 0 1-1.707.707z"
                      fill="#088eaf"
                    />
                    <path
                      d="M144.562 71.562C151.526 66.065 156 57.551 156 48c0-16.557-13.443-30-30-30h-26c-16.557 0-30 13.443-30 30v7a2 2 0 0 1-2 2H54a2 2 0 0 1-2-2v-7c0-26.492 21.508-48 48-48h26c26.492 0 48 21.508 48 48 0 14.517-6.458 27.539-16.657 36.343l9.95 9.95a1.002 1.002 0 0 1-.707 1.707H134a1 1 0 0 1-1-1V62.414a1.002 1.002 0 0 1 1.707-.707z"
                      fill="#4d7c0f"
                    />
                    <path
                      d="M240.497 94.685h-16.175L212.355 6.97V1.315h20.646l6.822 53.477L254.7 16.044h8.548l14.645 38.009 7.053-52.738h20.384V6.97l-11.836 87.715h-16.57l-17.753-43.003-.329-1.055-.329 1.055zm138.387 0h-57.731V1.315h57.731v18.674h-36.559v20.515h33.535v14.86h-33.535v20.647h36.559zm63.438 0h-45.239V1.315h45.633q11.836 0 18.148 5.918 6.313 5.786 6.313 15.912 0 8.416-5.392 14.992-2.975 3.719-7.296 6.596 5.51 2.372 9.005 6.423 5.787 6.707 5.787 17.096 0 12.23-6.839 19.332-6.837 7.101-20.12 7.101m-24.066-40.11v23.672h19.989q4.734 0 7.102-2.894 2.498-3.024 2.498-8.679 0-5.786-2.498-8.943-2-2.63-5.429-3.156zm0-37.348v24.198h21.324a20.7 20.7 0 0 0 4.32-5.524 16.46 16.46 0 0 0 1.973-7.89q0-4.866-2.499-7.759-2.367-3.025-6.575-3.025zm89.927 46.291v31.167h-21.172V1.315h41.687q14.334 0 21.699 7.101 7.496 7.102 7.496 19.726 0 10.653-5.655 18.674-3.677 5.254-9.57 10.041l15.882 32.831v4.997h-20.778l-16.537-31.167zm0-45.502v30.378h19.843a19.7 19.7 0 0 0 5.933-6.838q2.63-4.734 2.63-10.783 0-6.181-2.893-9.469-2.762-3.288-8.022-3.288zm125.974 76.669h-57.732V1.315h57.732v18.674h-36.559v20.515h33.534v14.86h-33.534v20.647h36.559zM688.783 96q-13.151 0-22.225-4.734-9.074-4.866-13.94-15.518T647.753 48t4.997-27.748 14.203-15.386Q676.158 0 689.046 0q5.26 0 9.994.526 4.734.527 8.811 1.71l-2.893 18.016q-6.18-1.315-13.545-1.315-7.496 0-12.493 3.025-4.866 3.024-7.496 9.468-2.499 6.312-2.499 16.57t2.499 16.701q2.499 6.444 7.364 9.469 4.866 2.893 11.967 2.893 7.496 0 14.598-1.447l2.893 18.148a67 67 0 0 1-9.337 1.71q-4.735.526-10.126.526m69.046 0q-12.361 0-20.778-4.734-8.285-4.734-12.625-15.255-4.34-10.52-4.34-27.88 0-17.49 4.34-28.011 4.34-10.652 12.625-15.386Q745.467 0 757.829 0t20.515 4.734q8.285 4.734 12.625 15.386 4.471 10.521 4.471 28.011 0 17.228-4.34 27.748-4.34 10.521-12.756 15.387Q770.059 96 757.829 96m0-16.833q5.26 0 8.811-2.499 3.55-2.63 5.523-9.337 2.104-6.837 2.104-19.2 0-12.23-2.104-19.068-1.972-6.97-5.523-9.6-3.55-2.762-8.811-2.63-5.523.131-9.206 2.761-3.55 2.5-5.523 9.337-1.84 6.839-1.841 19.2 0 12.363 1.973 19.2 1.972 6.839 5.523 9.337 3.682 2.499 9.074 2.499m75.392-15.649v31.167h-21.172V1.315h41.687q14.334 0 21.699 7.101 7.496 7.102 7.496 19.726 0 10.653-5.655 18.674-3.677 5.254-9.57 10.041l15.882 32.831v4.997H862.81l-16.537-31.167zm0-45.502v30.378h19.843a19.7 19.7 0 0 0 5.933-6.838q2.63-4.734 2.63-10.783 0-6.181-2.893-9.469-2.763-3.288-8.022-3.288zm101.513 76.669h-33.271V1.315h33.797q11.968 0 20.253 4.997 8.416 4.866 12.756 15.387 4.471 10.389 4.471 26.827 0 16.044-4.471 26.301-4.34 10.258-12.756 15.124-8.416 4.734-20.779 4.734m-12.098-76.537v59.704h11.704q5.785 0 9.6-3.288 3.813-3.287 5.655-9.731 1.84-6.576 1.841-16.307 0-14.992-4.208-22.619-4.209-7.76-12.888-7.759zM1047.2 94.685h-57.735V1.315h57.735v18.674h-36.56v20.515h33.53v14.86h-33.53v20.647h36.56zm39.37-31.167v31.167h-21.18V1.315h41.69c9.56 0 16.79 2.367 21.7 7.101q7.5 7.102 7.5 19.726c0 7.102-1.89 13.326-5.66 18.674q-3.675 5.254-9.57 10.041l15.88 32.831v4.997h-20.77l-16.54-31.167zm0-45.502v30.378h19.84a19.65 19.65 0 0 0 5.93-6.838c1.76-3.156 2.63-6.751 2.63-10.783 0-4.121-.96-7.277-2.89-9.469-1.84-2.192-4.51-3.288-8.02-3.288z"
                      fill="black"
                    />
                  </svg> </a
              ></strong>
            </p>
            <p>
              This page is a single-domain mirror of the original site from
              <i>${this.origin}</i>
            </p>
            <p>
              It is part of our effort to archive United States Government
              websites as part of
              <a target="_blank" href="https://eotarchive.org/"
                >End-of-Term Archive.</a
              >
            </p>
            <p>
              <strong
                ><a href="${this.collUrl}" target="_blank"
                  >View the full ${this.collName} Collection on Browsertrix</a
                ></strong
              >
            </p>
          </div>
        </div>
        <div class="details-textsection">
          <div>
            <p>
              <strong
                >These pages were archived using
                <a href="https://webrecorder.net/browsertrix" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style=" height: 1.2rem; width: auto; margin-left: 0.2rem; vertical-align: middle;"
                    viewBox="0 0 649 96"
                  >
                    <title>Browsertrix</title>
                    <path
                      d="M143.843 74.937h-26.832v-55.38h27.066q7.02 0 10.764 3.51 3.744 3.432 3.744 9.438 0 4.992-3.198 8.892-1.765 2.206-4.328 3.912 3.268 1.407 5.342 3.81 3.432 3.978 3.432 10.14 0 7.254-4.056 11.466t-11.934 4.212m-14.274-45.942v14.352h12.647a12.3 12.3 0 0 0 2.563-3.276 9.76 9.76 0 0 0 1.17-4.68q0-2.886-1.482-4.602-1.404-1.794-3.9-1.794zm0 22.152v14.04h11.856q2.808 0 4.212-1.716 1.482-1.794 1.482-5.148 0-3.432-1.482-5.304-1.186-1.56-3.22-1.872zm53.339 5.304v18.486H170.35v-55.38h24.726q8.502 0 12.87 4.212 4.446 4.212 4.446 11.7 0 6.318-3.354 11.076-2.182 3.115-5.677 5.955l9.421 19.473v2.964h-12.324l-9.809-18.486zm0-26.988v18.018h11.769a11.7 11.7 0 0 0 3.519-4.056q1.56-2.808 1.56-6.396 0-3.666-1.716-5.616-1.638-1.95-4.758-1.95zm105.941 45.474h-9.594l-7.098-52.026v-3.354h12.246l4.046 31.719 8.824-22.983h5.07l8.686 22.545 4.184-31.281h12.09v3.354l-7.02 52.026h-9.828l-10.53-25.506-.195-.626-.195.626zm127.878 0h-34.242v-55.38h34.242v11.076h-21.684v12.168h19.89v8.814h-19.89v12.246h21.684zm23.352-18.486v18.486h-12.558v-55.38h24.726q8.502 0 12.87 4.212 4.446 4.212 4.446 11.7 0 6.318-3.354 11.076-2.182 3.115-5.677 5.955l9.421 19.473v2.964h-12.324l-9.809-18.486zm0-26.988v18.018h11.769a11.7 11.7 0 0 0 3.519-4.056q1.56-2.808 1.56-6.396 0-3.666-1.716-5.616-1.638-1.95-4.758-1.95zm50.538 1.482h-13.728V19.557h39.858v11.388h-13.572v43.992h-12.558zm48.351 25.506v18.486H526.41v-55.38h24.726q8.502 0 12.87 4.212 4.446 4.212 4.446 11.7 0 6.318-3.354 11.076-2.182 3.115-5.677 5.955l9.421 19.473v2.964h-12.324l-9.809-18.486zm0-26.988v18.018h11.769a11.7 11.7 0 0 0 3.519-4.056q1.56-2.808 1.56-6.396 0-3.666-1.716-5.616-1.638-1.95-4.758-1.95zm83.544 27.507-9.49 17.967h-11.778v-3.354l15.192-24.905-14.334-23.767v-3.354h12.324l10.531 17.233 9.359-17.233h11.622v3.354l-14.773 24.485 14.773 24.187v3.354h-12.402zM243.039 75.717q-7.332 0-12.324-2.808-4.914-2.808-7.488-9.048t-2.574-16.536q0-10.374 2.574-16.614 2.574-6.318 7.488-9.126 4.992-2.808 12.324-2.808t12.168 2.808q4.915 2.808 7.489 9.126 2.65 6.24 2.651 16.614 0 10.218-2.574 16.458-2.572 6.24-7.566 9.126-4.913 2.808-12.168 2.808m0-9.984q3.12 0 5.226-1.482 2.106-1.56 3.276-5.538 1.248-4.056 1.248-11.388 0-7.254-1.248-11.31-1.17-4.134-3.276-5.694-2.106-1.638-5.226-1.56-3.276.078-5.46 1.638-2.106 1.482-3.276 5.538-1.092 4.056-1.092 11.388t1.17 11.388 3.276 5.538q2.184 1.482 5.382 1.482m108.157 9.984q-4.602 0-8.892-.624a63 63 0 0 1-8.268-1.638l2.106-9.36a78 78 0 0 0 6.942 1.404q3.588.468 6.942.468 5.382 0 7.644-1.482 2.34-1.56 2.34-4.602a5 5 0 0 0-.468-2.106q-.468-1.014-1.482-1.872-.936-.858-2.34-1.638-.078-.078-.156-.078h-.156L344.8 48.183a5 5 0 0 0-.546-.312 2 2 0 0 0-.468-.234q-4.524-2.574-7.098-5.616-2.574-3.12-2.574-8.112 0-4.602 2.496-7.956 2.574-3.432 7.41-5.304 4.914-1.872 11.778-1.872 3.978 0 7.956.468 4.056.468 7.722 1.404l-2.106 9.36a60 60 0 0 0-6.24-1.092q-3.12-.39-5.928-.39-3.354 0-5.694.624-2.262.546-3.432 1.872-1.092 1.248-1.092 3.12 0 1.638.702 2.73.78 1.014 2.574 2.028.078 0 .078.078.078.078.156.078l11.232 5.85q3.744 1.794 6.162 4.056 2.418 2.184 3.666 4.992 1.326 2.73 1.326 6.162 0 7.488-5.616 11.544t-16.068 4.056m228.248-.78v-55.38h12.558v55.38z"
                      fill="black"
                    />
                    <path
                      d="M81.399 51.084a1 1 0 0 0 0 1.832C85.283 54.615 88 58.493 88 63s-2.717 8.385-6.601 10.084a1 1 0 0 0 0 1.832C85.283 76.615 88 80.493 88 85c0 6.071-4.929 11-11 11-4.507 0-8.385-2.717-10.084-6.601a1 1 0 0 0-1.832 0C63.385 93.283 59.507 96 55 96s-8.385-2.717-10.084-6.601a1 1 0 0 0-1.832 0C41.385 93.283 37.507 96 33 96s-8.385-2.717-10.084-6.601a1 1 0 0 0-1.832 0C19.385 93.283 15.507 96 11 96 4.929 96 0 91.071 0 85c0-4.507 2.717-8.385 6.601-10.084a1 1 0 0 0 0-1.832C2.717 71.385 0 67.507 0 63s2.717-8.385 6.601-10.084a1 1 0 0 0 0-1.832C2.717 49.385 0 45.507 0 41c0-6.071 4.929-11 11-11 4.507 0 8.385 2.717 10.084 6.601a1 1 0 0 0 1.832 0C24.615 32.717 28.493 30 33 30s8.385 2.717 10.084 6.601a1 1 0 0 0 1.832 0C46.615 32.717 50.493 30 55 30s8.385 2.717 10.084 6.601a1 1 0 0 0 1.832 0C68.615 32.717 72.493 30 77 30c6.071 0 11 4.929 11 11 0 4.507-2.717 8.385-6.601 10.084m-58.483-5.685a1 1 0 0 0-1.832 0 11.06 11.06 0 0 1-5.685 5.685 1 1 0 0 0 0 1.832 11.06 11.06 0 0 1 5.685 5.685 1 1 0 0 0 1.832 0 11.06 11.06 0 0 1 5.685-5.685 1 1 0 0 0 0-1.832 11.06 11.06 0 0 1-5.685-5.685m44 22a1 1 0 0 0-1.832 0 11.06 11.06 0 0 1-5.685 5.685 1 1 0 0 0 0 1.832 11.06 11.06 0 0 1 5.685 5.685 1 1 0 0 0 1.832 0 11.06 11.06 0 0 1 5.685-5.685 1 1 0 0 0 0-1.832 11.06 11.06 0 0 1-5.685-5.685m0-22a1 1 0 0 0-1.832 0 11.06 11.06 0 0 1-5.685 5.685 1 1 0 0 0 0 1.832 11.06 11.06 0 0 1 5.685 5.685 1 1 0 0 0 1.832 0 11.06 11.06 0 0 1 5.685-5.685 1 1 0 0 0 0-1.832 11.06 11.06 0 0 1-5.685-5.685m-22 0a1 1 0 0 0-1.832 0 11.06 11.06 0 0 1-5.685 5.685 1 1 0 0 0 0 1.832 11.06 11.06 0 0 1 5.685 5.685 1 1 0 0 0 1.832 0 11.06 11.06 0 0 1 5.685-5.685 1 1 0 0 0 0-1.832 11.06 11.06 0 0 1-5.685-5.685m-22 22a1 1 0 0 0-1.832 0 11.06 11.06 0 0 1-5.685 5.685 1 1 0 0 0 0 1.832 11.06 11.06 0 0 1 5.685 5.685 1 1 0 0 0 1.832 0 11.06 11.06 0 0 1 5.685-5.685 1 1 0 0 0 0-1.832 11.06 11.06 0 0 1-5.685-5.685m22 0a1 1 0 0 0-1.832 0 11.06 11.06 0 0 1-5.685 5.685 1 1 0 0 0 0 1.832 11.06 11.06 0 0 1 5.685 5.685 1 1 0 0 0 1.832 0 11.06 11.06 0 0 1 5.685-5.685 1 1 0 0 0 0-1.832 11.06 11.06 0 0 1-5.685-5.685"
                      fill="#4d7c0f"
                    />
                    <path
                      d="M66.916 15.399a1 1 0 0 0-1.832 0C63.385 19.283 59.507 22 55 22s-8.385-2.717-10.084-6.601a1 1 0 0 0-1.832 0C41.385 19.283 37.507 22 33 22s-8.385-2.717-10.084-6.601a1 1 0 0 0-1.832 0C19.385 19.283 15.507 22 11 22 4.929 22 0 17.071 0 11S4.929 0 11 0c4.507 0 8.385 2.717 10.084 6.601a1 1 0 0 0 1.832 0C24.615 2.717 28.493 0 33 0s8.385 2.717 10.084 6.601a1 1 0 0 0 1.832 0C46.615 2.717 50.493 0 55 0s8.385 2.717 10.084 6.601a1 1 0 0 0 1.832 0C68.615 2.717 72.493 0 77 0c6.071 0 11 4.929 11 11s-4.929 11-11 11c-4.507 0-8.385-2.717-10.084-6.601"
                      fill="#088eaf"
                    />
                  </svg> </a
              ></strong>
            </p>
            <p>
              Browsertrix is Webrecorder's state-of-the-art web archiving
              platform that enables you to archive, curate, and replay web
              content, even if the original site is changed or goes offline.
              <a
                href="https://webrecorder.net/browsertrix/#get-started"
                target="_blank"
                >Sign up for a free trial today</a
              >
              and start creating your own archives of sites you care about!
            </p>
          </div>
        </div>
      </div>
    </div>`;
  }
}
