let config = require("@/CMS/config");
let social_setup = require("@/CMS/social");
let image_files = require("@/CMS/images");

let site_pages = require("@/components/themes/clean/data/sitepages");
if(config.setup().theme == 'agency'){
    site_pages = require("@/components/themes/agency/data/sitepages");
}

export var images = image_files.images();
export var pages = site_pages.pages()
export var setup = config.setup()
export var social = social_setup.social()