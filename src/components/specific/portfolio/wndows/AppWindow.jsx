import React from "react";
import WinIframe from "../../../global/custiframe";
import AppDetail from "./AppDetail";
import { useLang } from "../lang";

/**
 * Smart window for an external app.
 *  - app.embed === true  → live iframe (only for domains that allow framing)
 *  - otherwise           → rich AppDetail card inviting to open in a new tab
 * Apps flagged `syncLang` (e.g. the CV) inherit the OS's current language
 * via a `?lang=` query parameter.
 */
function AppWindow({ app }) {
  const { lang } = useLang();
  if (app.embed && app.url) {
    let source = app.url;
    if (app.syncLang) {
      source += (source.includes("?") ? "&" : "?") + "lang=" + lang;
    }
    return <WinIframe props={{ source }} />;
  }
  return <AppDetail app={app} />;
}

export default AppWindow;

export const appWindow = (app) => <AppWindow app={app} />;
