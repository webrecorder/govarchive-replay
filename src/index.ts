import { addArchiveInit } from "./app";
import { GovArchiveBanner } from "./govarchivebanner";

if (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (navigator.serviceWorker?.controller || (self as any).__wbinfo) &&
  document.currentScript &&
  (document.currentScript as HTMLScriptElement).src.endsWith("banner=1")
) {
  GovArchiveBanner.addBanner("gov-archive-banner", GovArchiveBanner);
} else {
  addArchiveInit();
}
