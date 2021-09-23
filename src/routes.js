/*
import {pages, setup} from "@/CMS/setup";

pages.forEach( p => {
    p.component = () => import("@/components/themes/" + setup.theme + "/" + p.usecomponent);
})

export const routes = [
  {name: "Default", path: "*", redirect: "/"},
].concat(pages)

 */

import {pages, setup} from "@/CMS/setup";

let theme = require("@/components/themes/" + setup.theme + "/data/components");

pages.forEach( p => {
    p.component = theme[p.component] ? theme[p.component]: theme.page;
})

export const routes = [
    {name: "Default", path: "*", redirect: "/"},
].concat(pages)


