import { unsafeCSS } from "lit";
import themeCSS from "./global.css";
export default unsafeCSS(themeCSS.replace(/:root/g, ".root"));
