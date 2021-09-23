import {pages, setup, images} from "@/CMS/setup";

export default {
    props:['pageid'],
    data(){
        return {
            editingpage:false,
            pageserror: false,
            pagedata: {name: '', path: '/'},
            pagecmsdata: {},
            updated: false,
            canedit: process.env.NODE_ENV == "development" ? true : false,
            langadd: '',
            onpage:'',
        }
    },
    methods:{
        removeSlide(col, num){
            this.editingpage = false;
            col.sliders.splice(num,1);
            this.editingpage = true;
        },
        addSlide(col){
            this.editingpage = false;
            if(!col.sliders){
                col.sliders = [];
            }
            col.sliders.push({image:'',html:''});
            this.editingpage = true;
        },
        addImage(event){
            event.preventDefault();
            let address = this.canedit ? location.protocol + "//" + location.hostname + ":9002" : "/app/";
            let form = event.target;
            let finalForm = new FormData(form);
            finalForm.append('area', 'image');
            finalForm.append('data', JSON.stringify({'image': 'doing image', 'area': 'image', 'page': ''}));
            this.$http.post(address, finalForm, {emulateJSON:true}).then(resp => {
                return resp.json();
            }).then((json) => {
                if(json.success) {
                    this.updated = true;
                    form.reset();
                } else {
                    this.pageserror = true;
                }
            }, () => {
                console.log("Node Service is not responding");
            })
        },
        addcolumn(row){
            let rand = Math.round(Math.random() * 1000)
            this.cmsdata.rows[row].cols.push({
                "classes": "",
                "size": "",
                "image": "",
                "content": "col" + (this.cmsdata.rows.length + 1) + 'c' + (this.cmsdata.rows[row].cols.length + 1) + '' + rand
            })
        },
        deletecolumn(row,col){
            this.cmsdata.rows[row].cols.splice(col,1);
        },
        addrow(){
            let rand = Math.round(Math.random() * 1000);
            let rowlen = this.cmsdata.rows ? this.cmsdata.rows.length + 1 : 0;
            let rowname = "col" + (rowlen + 1) + 'c' + 1 + '' + rand;

            let template = {
                "name": "",
                "classes": "",
                "cols": [{
                    "content": rowname,
                    "classes": "",
                    "size": "",
                    "image": "",
                }]
            }
            if(!this.cmsdata.rows) {
                this.cmsdata["rows"] = []
            }
            this.cmsdata.rows.push(template)
        },
        deleterow(i){
          this.cmsdata.rows.splice(i,1);
        },
        addLanguage(){
            if(this.langadd.trim() != '' && !this.cmsdata["locale"][this.langadd]) {
                this.cmsdata["locale"][this.langadd] = {};
                this.updatePageCMS();
            }
        },
        updatePageCMS(){
            if (process.env.NODE_ENV === 'development') {
                let data_json = {};
                data_json.area = 'data'
                data_json.data = this.cmsdata;
                data_json.page = this.pagedata.datapage;

                let address = this.canedit ? location.protocol + "//" + location.hostname + ":9002" : "/app/";
                this.$http.post(address,
                    {data: JSON.stringify(data_json)},
                    {emulateJSON: true}).then(resp => {
                    return resp.json()
                }).then(json => {
                    if(json.success) {
                        this.updated = true;
                    }else{
                        this.pageserror = true;
                    }
                }, () => {
                })
            }
        },
        onEditorChange({html}, lang, d, colcount) {
            this.cmsdata.locale[lang][this.cmsdata.rows[d]['cols'][colcount].content] = html.replace("ql-","");
        },
        updatePageSettings(){
            if (process.env.NODE_ENV === 'development') {
                let data_json = {};
                data_json.area = "sitepages";
                data_json.data = [...pages]; // Clone

                data_json.data.forEach(p => {
                    p.component = p.usecomponent;
                    p.path = ("/" + p.path).replace("//","/");

                    p.onpage.forEach(op => {
                        if(op.page == ""){
                           p.hash = "";
                        }
                    });

                    if(p.hash == ""){
                        p.pagepath = p.path;
                    }
                });

                data_json.page = '';
                data_json.theme = setup.theme;

                let address = this.canedit ? location.protocol + "//" + location.hostname + ":9002" : "/app/";

                this.$http.post(address,
                    {data: JSON.stringify(data_json)},
                    {emulateJSON: true}).then(resp => {
                    return resp.json()
                }).then(json => {
                    if (json.success) {
                        let port = location.port == 80 || location.port == 443 ? '' : ":" + location.port;
                        window.location = location.protocol + "//" + location.hostname + port + "/" + this.id
                    } else {
                        this.pageserror = true;
                    }
                }, () => {
                });
            }
        },
    },
    computed:{
        id() {
            return this.pagedata.name;
        },
        getAllpages(){
            return pages;
        },
        getAllImages(){
            return images
        },
        getAllComponents(){
            let theme = require("@/components/themes/" + setup.theme + "/data/components");
            return theme;
        }
    },
    created(){
        if (this.pageid) {
            pages.forEach(p => {
                if (p.name == this.pageid) {
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
    }
}