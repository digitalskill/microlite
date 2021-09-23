import {pages, social} from "@/CMS/setup";

export default {
    computed:{
      getPages(){
          return pages;
      }
    },
    methods:{
        getSocialLinks(link){
            return social[link] ? social[link] : false
        },
    }
}