function loadsetup(){
    return {
        sitemap: function (pages) {
            let sitemap = [];
            pages.forEach(p => {
                sitemap.push({
                    path: p.path,
                    lastmod: new Date().toISOString().slice(0, 10),
                    priority: 0.8,
                    changefreq: p.seo_change_frequency
                });
            });
            return sitemap
        },
        prerenderpages: function (pages) {
            let prerenderpages = [];
            pages.forEach(p => {
                prerenderpages.push(p.path);
            });
            return prerenderpages
        }
    }
}

module.exports = loadsetup();