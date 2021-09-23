function sitepages() {
    return {
        pages: function () {
            //--
            return [{
                "name": "home",
                "component": "home",
                "usecomponent": "home",
                "path": "/",
                "innav": {"show": false, "order": 0},
                "infooter": {"show": false, "order": 0},
                "sidenav": {"show": true, "order": 0},
                "onpage": [{
                    "page": "",
                    "order": 0
                }],
                "seo_change_frequency": "monthly",
                "props": false,
                "datapage": "home",
                "hash": "",
                "pagepath": "/"
            }, {
                "name": "portfolio",
                "component": "portfolio",
                "usecomponent": "portfolio",
                "innav": {"show": true, "order": 2},
                "infooter": {"show": false, "order": 2},
                "sidenav": {"show": true, "order": 2},
                "onpage": [{
                    "page": "home",
                    "order": 2
                }],
                "path": "/portfolio",
                "seo_change_frequency": "monthly",
                "props": false,
                "datapage": "portfolio",
                "hash": "portfolio",
                "order": 2,
                "pagepath": "/"
            }, {
                "name": "about",
                "component": "about",
                "usecomponent": "about",
                "path": "/about",
                "innav": {"show": true, "order": 3},
                "infooter": {"show": false, "order": 3},
                "sidenav": {"show": true, "order": 3},
                "onpage": [{
                    "page": "",
                    "order": 3
                }],
                "seo_change_frequency": "monthly",
                "props": false,
                "datapage": "about",
                "hash": "",
                "order": 3,
                "pagepath": "/about"
            }, {
                "name": "team",
                "component": "team",
                "usecomponent": "team",
                "path": "/team",
                "innav": {"show": true, "order": 4},
                "infooter": {"show": false, "order": 4},
                "sidenav": {"show": true, "order": 4},
                "onpage": [{
                    "page": "",
                    "order": 4
                }],
                "seo_change_frequency": "monthly",
                "props": false,
                "datapage": "team",
                "hash": "",
                "order": 4,
                "pagepath": "/team"
            }, {
                "name": "terms",
                "component": "page",
                "usecomponent": "page",
                "innav": {"show": false, "order": 4}, "infooter": {
                    "show": "false",
                    "order": 1
                }, "sidenav": {
                    "show": "false",
                    "order": 4
                }, "onpage": [{
                    "page": "",
                    "order": 4
                }], "path": "/terms",
                "seo_change_frequency": "monthly",
                "props": false, "datapage": "terms",
                "hash": "",
                "pagepath": "/terms"
            }, {
                "name": "privacy",
                "component": "page",
                "usecomponent": "page",
                "innav": {
                    "show": "false",
                    "order": 7
                }, "infooter": {
                    "show": "false",
                    "order": 5
                }, "sidenav": {"show": false, "order": 5}, "onpage": [{
                    "page": "",
                    "order": 7
                }], "path": "/privacy",
                "seo_change_frequency": "monthly",
                "props": false, "datapage": "privacy",
                "pagepath": "/privacy",
                "hash": ""
            }, {
                "name": "contact",
                "component": "contact",
                "usecomponent": "contact",
                "path": "/contact",
                "innav": {"show": true, "order": 6}, "infooter": {
                    "show": "true",
                    "order": 6
                }, "sidenav": {"show": true, "order": 6}, "onpage": [{
                    "page": "home",
                    "order": 6
                }], "seo_change_frequency": "monthly",
                "props": false, "datapage": "contact",
                "hash": "contact",
                "order": 6, "pagepath": "/"
            }]
//--
        },
    }
}

module.exports = sitepages();