import {pages, setup} from "@/CMS/setup";
import Pagesettings from "@/components/microlite/pagesettings";
import Editpage from "@/components/microlite/editpage";
import VueScrollTo from "vue-scrollto";

export default {
    components: {Editpage, Pagesettings},
    metaInfo() {
        return {
            title: setup.sitename + " | " + setup.sitetagline,
            meta: [
                {
                    name: 'description',
                    content: this.pagedata.sitedescription ? this.pagedata.sitedescription : setup.sitedescription
                },
                {
                    property: 'og:title',
                    content: this.pagedata.title ? this.pagedata.title : setup.sitename + " | " + setup.sitetagline
                },
                {property: 'og:site_name', content: setup.sitename},
                {property: 'og:type', content: "Website"},
                {property: 'og:url', content: setup.website + this.pagedata.path},
                {property: 'og:image', content: setup.website + "/img/fb_image.jpg"},
                {name: 'robots', content: "index,follow"},
                {itemprop: 'name', content: setup.sitename + " | " + setup.sitetagline},
                {
                    itemprop: 'description',
                    content: this.pagedata.sitedescription ? this.pagedata.sitedescription : setup.sitedescription
                },
                {itemprop: 'image', content: setup.website + "/img/fb_image.jpg"},
                {name: 'twitter:card', content: setup.sitename},
                {name: 'twitter:site', content: setup.website + this.pagedata.path},
                {name: 'twitter:title', content: setup.sitename + " | " + setup.sitetagline,},
                {
                    name: 'twitter:description',
                    content: this.pagedata.sitedescription ? this.pagedata.sitedescription : setup.sitedescription
                },
                {name: 'twitter:creator', content: setup.twitter_creator},
                {name: 'twitter:image:src', content: setup.website + "/img/fb_image.jpg"},
            ]
        }
    },
    data() {
        return {
            loadedpage: '',
            pagedata: {name: '', path: '/'},
            cmsdata: {
                classes:'',
                rows:[]
            }
        }
    },
    computed: {
        id() {
            return this.pagedata.name || '';
        },
        canedit() {
            return process.env.NODE_ENV === "development" ? true : false
        },
    },
    methods: {
        updateCMSData(area, event){
            this.cmsdata[area] = event.target.value;
        },
        getFormState(form){
            let forms = this.$store.getters.getFormState;
            let showForm = true;
            forms.forEach( f => {
               if(f.form === form && f.state === "success"){
                   showForm = false
               }
            });
            return showForm
        },
        sendEmail(event) {
            let formData = new FormData(event.target);
            let form = event.target.id
            let data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value
            }
            data['area'] = 'message';
            data['page'] = '';

            let address = this.canedit ? window.location.protocol + "//" + window.location.hostname + ":9002" : "/app/mail";
            this.$http.post(address, {
                data: JSON.stringify(data)},
                {emulateJSON: true}).then(res => {
                return res.json()
            }).then(json => {
                if(json.success){
                    let payload = {form, state: 'success', data};
                    this.$store.dispatch("formSend", payload);
                }
            }, () => {
            })
        },
        getPageData(area) {
            return this.cmsdata[area] || []
        },
        getLanguageItem(area) {
            if(area !== undefined && area !== "undefined") {
                return this.$t(this.pagedata.datapage + "." + area)
            }
        },
        updateContent() {
            if (process.env.NODE_ENV === 'development') {
                let data_json = {};
                data_json.area = "This"
                data_json.message = "Hello"
                let address = this.canedit ? window.location.protocol + "//" + window.location.hostname + ":9002" : "/app/";
                this.$http.post(address,
                    {data: JSON.stringify(data_json)},
                    {emulateJSON: true}).then(resp => {
                    return resp.json()
                }).then(json => {
                    console.log(json)
                }, () => {
                })
            }
        }
    },
    created() {
        this.loadedpage = this.page || this.$route.name;
        if (this.loadedpage) {
            pages.forEach(p => {
                if (p.name == this.loadedpage) {
                    this.pagedata = p;
                }
            });
        }

        try {
            if (this.id != '') {
                this.cmsdata = require("@/CMS/data/" + this.pagedata.datapage).default;
            }
        } catch (e) {
            if (process.env.NODE_ENV == 'development') {
                console.log("Page Data not found for " + this.id, e)
            }
        }

        this.$nextTick(() => {
            if (!!window.MSInputMethodContext && !!document.documentMode) {
                // IS IE - not Edge - No Paralax
            } else {
                if(this.$route.fullPath.indexOf("#") == -1) {
                    if(document.querySelector('.rellaxv')) {
                        this.$rellax('.rellaxv', {vertical: true});
                    }
                }
            }
        });

        if(this.$route.hash == "#" + this.id){
            this.$nextTick(()=>{
                if(document.querySelector(this.$route.hash)) {
                    VueScrollTo.scrollTo(this.$route.hash);
                }
            })
        }
    }
}