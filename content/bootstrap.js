const collections = {
  "cdc.gov": {
    archiveSourceUrl:
      "https://app.browsertrix.com/api/orgs/75f05fd9-ffe0-447d-be70-66d1e4bc4b6d/collections/001c4dac-72b9-4a07-bb14-fa7bcf2d06f1/public/replay.json",
    proxyOrigin: "https://www.cdc.gov",
    proxyTs: "20250125223246000",
    collName: "CDC",
    collUrl:
      "https://app.browsertrix.com/explore/usgov-archive/collections/cdc",
  },

  "epa.gov": {
    archiveSourceUrl:
      "https://app.browsertrix.com/api/orgs/75f05fd9-ffe0-447d-be70-66d1e4bc4b6d/collections/bdfcbb36-84ac-487e-98fb-f43fb2c70398/public/replay.json",
    proxyOrigin: "https://www.epa.gov",
    collName: "EPA",
    collUrl:
      "https://app.browsertrix.com/explore/usgov-archive/collections/epa",
  },

  "usaid.gov": {
    archiveSourceUrl:
      "https://app.browsertrix.com/api/orgs/75f05fd9-ffe0-447d-be70-66d1e4bc4b6d/collections/5fe4a3d6-2215-40f2-b357-4046045cdba6/public/replay.json",
    proxyOrigin: "https://www.usaid.gov",
    collName: "USAID",
    collUrl:
      "https://app.browsertrix.com/explore/usgov-archive/collections/usaid",
  },

  "sealevel.globalchange.gov": {
    archiveSourceUrl:
      "https://app.browsertrix.com/api/orgs/75f05fd9-ffe0-447d-be70-66d1e4bc4b6d/collections/52ca9d0e-2ab9-4839-abd8-037d7299fa4f/public/replay.json",
    proxyOrigin: "https://sealevel.globalchange.gov",
    collName: "U.S. Sea Level Change",
    collUrl:
      "https://app.browsertrix.com/explore/usgov-archive/collections/sea-level-change",
  },

  "globalchange.gov": {
    archiveSourceUrl:
      "https://app.browsertrix.com/api/orgs/75f05fd9-ffe0-447d-be70-66d1e4bc4b6d/collections/29db8c5a-7e2c-400a-a239-d0da78a340f5/public/replay.json",
    proxyOrigin: "https://globalchange.gov",
    collName: "Global Change Research Program",
    collUrl:
      "https://app.browsertrix.com/explore/usgov-archive/collections/u-s-global-change-research-program",
  },
};

function matchCollection() {
  if (!window.location.host.endsWith(".govarchive.us")) {
    return;
  }
  const hostParts = window.location.host.split(".")[0].split("-");
  const origin = hostParts.join(".") + ".gov";

  for (let i = 0; i < hostParts.length; i++) {
    const name = hostParts.slice(i).join(".") + ".gov";
    if (collections[name]) {
      const data = collections[name];
      // if not an exact match, override proxyOrigin
      if (name !== origin) {
        data.proxyOrigin = "https://" + origin;
      }
      data.bannerScript = "https://static.govarchive.us/proxyui.js";
      data.proxyTLD = ".gov";
      data.localTLD = ".govarchive.us";
      return data;
    }
  }
}

const coll = matchCollection();

window.initWebArchive(coll, origin);
