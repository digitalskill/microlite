let loadsetup = require('./src/CMS/loadsetup');
let config = require('./src/CMS/config');
const path = require('path');
let PrerenderSpaPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer
const SitemapPlugin = require('sitemap-webpack-plugin').default;

let site_pages = require('./src/components/themes/clean/data/sitepages');
if(config.setup().theme == 'agency'){
    site_pages = require('./src/components/themes/agency/data/sitepages');
}

const sitemap = loadsetup.sitemap(site_pages.pages());

const productionPlugins =  [
    new SitemapPlugin({
        base:config.setup().website,
        paths:sitemap,
        options:{
        filename: 'sitemap.xml',
        lastmod: true,
        changefreq: 'monthly',
        priority: 0.8
    }}),
    new PrerenderSpaPlugin({
        staticDir:path.join(__dirname, './dist'),
        routes:loadsetup.prerenderpages(site_pages.pages()),
        renderer: new Renderer({
            renderAfterDocumentEvent: 'render-event'
        })
    }),
];

module.exports = {
    productionSourceMap: false,
    integrity: true,
    publicPath: process.env.APP_ROOT,
    pwa: {
        name: config.setup().sitename,
        themeColor: "#00D7CF",
        appleMobileWebAppCapable: "yes",
        appleMobileWebAppStatusBarStyle: "black",
        workboxPluginMode: 'InjectManifest',
        //workboxPluginMode: 'GenerateSW',
        manifestPath: 'manifest.webmanifest',
        workboxOptions: {
            swSrc: "src/service-worker.js",
            // Uncomment below to make the PWA act more like a web page
            exclude: [/-\w{8}.\w{8}\.js$/,/manifest\.webmanifest$/, /^.*fonts\/.*$/, /^.*static\/.*$/, /^.*app\/.*$/, /\.svg$/, /\.png$/, /^.*webFonts\/.*$/,/\.jpg$/,/\.txt$/,/\.xml$/]
        },
        manifestOptions: {
            background_color: config.setup().background_color,
            short_name: config.setup().site_shortname,
            orientation: 'portrait',
            start_url: "./index.html",
            display: "standalone",
            icons: [
                {
                    src: './img/icons/favicon-32x32.png',
                    sizes: '32x32',
                    type: 'image/png'
                },
                {
                    src: './img/icons/favicon-16x16.png',
                    sizes: '16x16',
                    type: 'image/png'
                },
                {
                    src: './img/icons/safari-pinned-tab.svg',
                    sizes: '942x942',
                    type: 'image/svg+xml'
                },
                {
                    src: './img/icons/android-chrome-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: "any maskable"
                },
                {
                    src: './img/icons/android-chrome-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: "any maskable"
                },
                {
                    src: './img/icons/apple-touch-icon.png',
                    sizes: '180x180',
                    type: 'image/png',
                },
                {
                    src: './img/icons/mstile-70x70.png',
                    sizes: '70x70',
                    type: 'image/png',
                    purpose: "any maskable"
                },
                {
                    src: './img/icons/mstile-144x144.png',
                    sizes: '144x144',
                    type: 'image/png',
                    purpose: "any maskable"
                },
                {
                    src: './img/icons/mstile-150x150.png',
                    sizes: '150x150',
                    type: 'image/png',
                    purpose: "any maskable"
                },
                {
                    src: './img/icons/mstile-310x150.png',
                    sizes: '310x150',
                    type: 'image/png',
                    purpose: "any maskable"
                },
                {
                    src: './img/icons/mstile-310x310.png',
                    sizes: '310x310',
                    type: 'image/png',
                    purpose: "any maskable"
                },
            ]
        },

    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(...productionPlugins);
        }
    }
};
