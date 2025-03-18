# GovArchive.us Content + Replay UI

This repo contains content + UI for govarchive.us content subdomains.

- [src](src/) contains:
  - Loading screen UI
  - Replay banner UI
- [content](content/) contains:
  - bootstrap.js to bootstrap the UI + manifest of available collections
  - proxyui.js (built from src/)
  - index.html and 404.html to load from any URL.
  - sw.js imports the latest release of [wabac.js](https://github.com/webrecorder/wabac.js) service worker
 
### How it Works

Most of the work happens in wabac.js, which is configured in 'proxy' mode to proxy a single-site.

The site proxied is determined automatically based on the subdomain, mapping `example.govarchive.us` -> `example.gov`.

Loading `https://example.govachive.us/path/to/file.html` looks up  `https://example.gov/path/to/file.html`, allowing
original link structure of a site to be preserved.

Subdomains are also mapped by replacing `-` with `.`, eg. `sub-domain-example.govarchive.us` -> `sub.domain.example.gov`.

The wabac.js applies minimal link rewriting to ensure subdomain links also point to appropriate wildcard subdomain when possible.
