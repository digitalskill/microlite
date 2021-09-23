import Vue from "vue";
import VueI18n from "vue-i18n";

// Language Files
import en from "./locale/en";
// End Language Files

// Language Array
let languages = {
    "en": en,
}
// End Language Array

Vue.use(VueI18n);

import config from "./config"

// Import all pages and languages
try {
    let pages = require('../components/themes/' + config.setup().theme + '/data/sitepages');
    pages.pages().forEach(p => {
            try {
                // Load language pack
                let lang = require("./data/" + p.datapage);
                for (const [key, value] of Object.entries(lang.default.locale)) {
                    try {
                        if(!languages[key]) {
                            try {
                                // Load up file
                                let currentlang = require("./locale/" + key + ".js");
                                languages[key] = currentlang.default;
                            } catch (e) {
                                if(process.env.NODE_ENV == 'development') {
                                    console.log("No Language file for: " + key);
                                }
                                languages[key] = {"flag": key, "language": key, title: key}
                            }
                        }
                        languages[key][p.datapage] = value
                    } catch(e){
                        if(process.env.NODE_ENV == 'development') {
                            console.log("Cannot add lanugage", key)
                        }
                    }
                }

            } catch (e) {
                if(process.env.NODE_ENV == 'development'){
                    console.log("Error: Importing Language for '" + p.datapage + "'", e);
                }
            }
    });
}catch(e){
    if(process.env.NODE_ENV == 'development'){
        console.log("Import languages error", e);
    }
}

const messages = {};

for (const [key, value] of Object.entries(languages)) {
    messages[key] = value;
}

const i18n = new VueI18n({ locale: "en", messages });

export default i18n;