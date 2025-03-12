import { addArchiveInit } from "./app";
import { GovArchiveBanner } from "./govarchivebanner";

if (
  navigator.serviceWorker.controller &&
  document.currentScript &&
  (document.currentScript as HTMLScriptElement).src.endsWith("banner=1")
) {
  GovArchiveBanner.addBanner("gov-archive-banner", GovArchiveBanner);
} else {
  addArchiveInit();
}
