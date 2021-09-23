<template>
  <div class="microlite-editor text-center" v-if="canedit">
    <b-modal size="xs" v-model="updated" hide-footer id="modal-updated" :title="$t('updated')">
      <h5 v-text="$t('pageupdated')"></h5>
    </b-modal>
    <button class="btn btn-secondary text-uppercase w-50 mt-3 mb-2" v-text="$t('editpage')"
            @click.prevent="editingpage = true"></button>
    <b-sidebar class="editpage-sidebar text-left" width="700px" backdrop
               v-model="editingpage" right shadow :title="$t('editpagecontent')">
      <div class="pl-2 pr-2 pb-2">
        <b-card no-body class="mb-1" v-for="(val,lang) in cmsdata.locale" :key="'locale' + id + lang">
          <b-card-header header-tag="header" class="p-1 no-border" role="tab">
            <b-button block v-b-toggle="'locale' + id + lang" variant="primary">{{ lang }}</b-button>
          </b-card-header>
          <b-collapse :id="'locale' + id + lang" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <form @submit.prevent="updatePageCMS()">
                <div class="input-group">
                  <label v-text="$t('menu')" class="mr-2 pt-1 w-25"></label>
                  <input type="text" class="form-control" :placeholder="$t('menu')"
                         v-model="cmsdata.locale[lang].menu">
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <div :id="id + lang +'cmsmenutip'">
                        <b-icon icon="question"></b-icon>
                      </div>
                      <b-tooltip :target="id + lang + 'cmsmenutip'">
                        <span v-text="$t('cmsmenuhelp')"></span>
                      </b-tooltip>
                    </div>
                  </div>
                </div>

                <div class="input-group">
                  <label v-text="$t('sectionclasses')" class="mr-2 pt-1 w-25"></label>
                  <input type="text" class="form-control" :placeholder="$t('menu')"
                         v-model="cmsdata.classes">
                  <div class="input-group-append">
                    <div class="input-group-text">
                      <div :id="id + lang +'sectionmenuclassestip'">
                        <b-icon icon="question"></b-icon>
                      </div>
                      <b-tooltip :target="id + lang + 'sectionmenuclassestip'">
                        <span v-text="$t('sectionmenuclasseshelp')"></span>
                      </b-tooltip>
                    </div>
                  </div>
                </div>

                <div :key="'locale' + id + 'cmsdata' + lang + d + 'btn'" class="mt-1 mb-1"
                     v-for="(p,d,i) in cmsdata.rows">
                      <b-button block v-b-toggle="'locale' + id + 'cmsdata' + lang + d"
                                variant="secondary" class="text-left">
                        <span v-text="$t('editrow', {count:d + 1})" class="mr-2"></span>
                        <b-icon class='float-right' icon="pencil"></b-icon>
                      </b-button>
                  <b-collapse :id="'locale' + id + 'cmsdata' + lang + d" accordion="cms-accordion" role="tabpanel"
                              class="bg-dark rounded mt-1 p-2">
                    <div class="input-group text-white">
                      <label v-text="$t('rowname')" class="mr-2 pt-1 w-25"></label>
                      <input type="text" class="form-control" :placeholder="$t('rowname')"
                             v-model="cmsdata.rows[d].name">
                      <div class="input-group-append">
                        <div class="input-group-text">
                          <div :id="id + lang + i + 'rowname'">
                            <b-icon icon="question"></b-icon>
                          </div>
                          <b-tooltip :target="id + lang + i + 'rowname'">
                            <span v-text="$t('rownamehelp')"></span>
                          </b-tooltip>
                        </div>
                      </div>
                    </div>
                    <div class="input-group text-white">
                      <label v-text="$t('rowclasses')" class="mr-2 pt-1 w-25"></label>
                      <input type="text" class="form-control" :placeholder="$t('rowclasses')"
                             v-model="cmsdata.rows[d].classes">
                      <div class="input-group-append">
                        <div class="input-group-text">
                          <div :id="id + lang + i + 'rowname'">
                            <b-icon icon="question"></b-icon>
                          </div>
                          <b-tooltip :target="id + lang + i + 'rowname'">
                            <span v-text="$t('rowclasseshelp')"></span>
                          </b-tooltip>
                        </div>
                      </div>
                    </div>
                    <div class="mt-2 p-2 rounded bg-light mb-2" v-for="(col, colcount) in p.cols"
                         :key="id + lang + 'row' + colcount">
                      <div class="input-group">
                        <label v-text="$t('colclasses')" class="mr-2 pt-1 w-25"></label>
                        <input type="text" class="form-control" :placeholder="$t('colclasses')"
                               v-model="cmsdata.rows[d]['cols'][colcount].classes">
                        <div class="input-group-append">
                          <div class="input-group-text">
                            <div :id="id + lang + i + colcount + 'colname'">
                              <b-icon icon="question"></b-icon>
                            </div>
                            <b-tooltip :target="id + lang + i + colcount + 'colname'">
                              <span v-text="$t('colclasseshelp')"></span>
                            </b-tooltip>
                          </div>
                        </div>
                      </div>
                      <div class="input-group">
                        <label v-text="$t('colsize')" class="mr-2 pt-1 w-25"></label>
                        <input type="text" class="form-control" :placeholder="$t('colsize')"
                               v-model="cmsdata.rows[d]['cols'][colcount].size">
                        <div class="input-group-append">
                          <div class="input-group-text">
                            <div :id="id + lang + i + colcount + 'colsize'">
                              <b-icon icon="question"></b-icon>
                            </div>
                            <b-tooltip :target="id + lang + i + colcount + 'colsize'">
                              <span v-text="$t('colsizehelp')"></span>
                            </b-tooltip>
                          </div>
                        </div>
                      </div>

                      <div class="clearfix mt-2 mb-2">
                        <select class="form-control" v-model="col.image">
                            <option value='' v-text="$t('selectimage')"></option>
                            <option :value="image" :key="'image' + lang + d + '' + colcount + '' + i"
                                    v-for="(image,i) in getAllImages">{{image.split('/').pop()}}</option>
                        </select>

                        <form ref="imageform" method="post" enctype="multipart/form-data"
                              @submit.prevent="addImage($event)" class="mt-2 mb-2 p-2 bg-dark text-white">
                        <input type="file" name="image" accept="image/*"  class="w-100" required>
                          <button type="submit" class="btn btn-primary mt-2 w-100">Upload New File</button>
                        </form>

                        <quill-editor
                            v-model="cmsdata.locale[lang][cmsdata.rows[d]['cols'][colcount].content]"></quill-editor>
                      </div>

                      <h6 class="mt-3 text-uppercase btn btn-info w-100" v-b-toggle="'sliders' + d + '' + colcount">Slider Content</h6>

                      <b-collapse :id="'sliders' + d + '' + colcount">
                        <div class="mb-3 bg-white" :key="'slider' + i" v-for="(slilderimage,i) in col.sliders">
                          <div class="input-group">
                            <select class="form-control" v-model="col.sliders[i].image">
                              <option value='' v-text="$t('selectimage')"></option>
                              <option :value="image" :key="'image' + lang + d + '' + colcount + '' + i"
                                      v-for="(image,i) in getAllImages">{{image.split('/').pop()}}</option>
                            </select>
                            <div class="input-group-append"><div @click.prevent="removeSlide(col, i)" class="btn btn-danger">Delete Slide</div></div>
                          </div>
                          <quill-editor v-model="col.sliders[i].html"></quill-editor>
                        </div>
                        <div class="w-100 mb-3">
                          <div class="btn btn-primary w-100" @click.prevent="addSlide(col)">Add Slide</div>
                        </div>
                      </b-collapse>

                      <button class="btn btn-danger form-control text-left"
                              @click.prevent="deletecolumn(d, colcount)">
                        <span v-text="$t('deletecolumn')" class="mr-2"></span>
                        <b-icon icon="dash-circle" class="float-right h-100"></b-icon>
                      </button>
                    </div>

                    <button class="btn btn-info form-control text-left"
                            @click.prevent="addcolumn(d)">
                      <span v-text="$t('addcolumn')" class="mr-2"></span>
                      <b-icon icon="plus-circle" class="float-right h-100"></b-icon>
                    </button>
                    <button class="btn btn-danger form-control text-left mt-2"
                            @click.prevent="deleterow(d)">
                      <span v-text="$t('deleterow')" class="mr-2"></span>
                      <b-icon icon="dash-circle" class="float-right h-100"></b-icon>
                    </button>
                  </b-collapse>

                </div>
                <button class="btn btn-info form-control mb-2 text-left" @click.prevent="addrow()">
                  <span v-text="$t('addrow')" class="mr-2"></span>
                  <b-icon icon="plus-circle" class="float-right h-100"></b-icon>
                </button>

                <button class="btn btn-primary w-100 text-left" type="submit">
                  <span v-text="$t('save')" class="mr-2"></span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                       class="text-dark h-100 bi bi-save float-right" viewBox="0 0 16 16">
                    <path
                        d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                  </svg>
                </button>
              </form>
            </b-card-body>
          </b-collapse>
        </b-card>

        <div class="input-group input-group-sm">
          <input v-model="langadd" class="form-control" :placeholder="$t('addLanguage')">
          <button class="btn btn-primary form-control" v-text="$t('addLanguage')" @click.prevent="addLanguage()"></button>
        </div>

      </div>
    </b-sidebar>
  </div>
</template>

<script>
import microlitemixin from "@/components/microlite/microlitemixin";

export default {
  name: "pagesettings",
  mixins: [microlitemixin]
}
</script>