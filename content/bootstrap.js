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
    proxyTs: "20241116",
    collName: "Global Change Research Program",
    collUrl:
      "https://app.browsertrix.com/explore/usgov-archive/collections/global-change-research-program",
  },

  "climate.gov": {
    archiveSourceUrl:
      "https://app.browsertrix.com/api/orgs/75f05fd9-ffe0-447d-be70-66d1e4bc4b6d/collections/5f4ac934-3f79-433b-83af-409c5a854029/public/replay.json",
    proxyOrigin: "https://www.climate.gov",
    collName: "Climate.gov + Dashboards",
    collUrl:
      "https://app.browsertrix.com/explore/usgov-archive/collections/climate-gov-dashboard",
  },

  "fema.gov": {
    archiveSourceUrl:
      "https://app.browsertrix.com/api/orgs/75f05fd9-ffe0-447d-be70-66d1e4bc4b6d/collections/da8be36a-a031-4294-bdfe-62b5b7cf015b/public/replay.json",
    proxyOrigin: "https://www.fema.gov",
    collName: "FEMA",
    collUrl:
      "https://app.browsertrix.com/explore/usgov-archive/collections/fema",
  },

  "ed.gov": {
    archiveSourceUrl:
      "https://app.browsertrix.com/api/orgs/75f05fd9-ffe0-447d-be70-66d1e4bc4b6d/collections/094fc656-f4f9-4b0d-8d9f-56d96d8aea98/public/replay.json",
    proxyOrigin: "https://www.ed.gov",
    collName: "Department of Education",
    collUrl:
      "https://app.browsertrix.com/explore/usgov-archive/collections/department-of-education",
  },

  "imls.gov": {
    archiveSourceUrl:
      "https://app.browsertrix.com/api/orgs/75f05fd9-ffe0-447d-be70-66d1e4bc4b6d/collections/1614e425-a3f5-4155-98fe-38099651c680/public/replay.json",
    proxyOrigin: "https://www.imls.gov",
    collName: "IMLS",
    collUrl:
      "https://app.browsertrix.com/explore/usgov-archive/collections/imls",
  },
};

let origHost = "";

function matchCollection() {
  if (!window.location.host.endsWith(".govarchive.us")) {
    return;
  }
  const hostParts = window.location.host.split(".")[0].split("-");
  origHost = hostParts.join(".") + ".gov";

  for (let i = 0; i < hostParts.length; i++) {
    const name = hostParts.slice(i).join(".") + ".gov";
    if (collections[name]) {
      const data = collections[name];
      // if not an exact match, override proxyOrigin
      if (name !== origHost) {
        data.proxyOrigin = "https://" + origHost;
      }
      data.bannerScript = "https://static.govarchive.us/proxyui.js";
      data.proxyTLD = ".gov";
      data.localTLD = ".govarchive.us";
      return data;
    }
  }
}

const coll = matchCollection();

window.initWebArchive(coll, origHost);
