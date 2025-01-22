<template>
  <div class="main">
    <div class="left">
      <h2>Summary or details search</h2>
      <div class="flex-center">
        <InputText
          v-model:text="temp_filter"
          type="search"
          :disabled="!category_sel"
          placeholder="search in summary or details"
          @keydown.enter="searchData"
        />
        <Btn @click="searchData" class="l-12">Search</Btn>
      </div>
      <p class="t-12">{{ out.totalCount }} results found (tot. results: {{ cve.total }})</p>

      <section class="scrollable-content">
        <h2 class="t-24">Categories</h2>
        <div v-if="cve.categories" class="categories-wrapper">
          <div
            v-for="category in cve.categories"
            :key="category.id"
            :class="{'active': category_sel === category.name}"
            class="label"
            :title="`The CVEs in this category contains at least one of the following keywords: ${CVE_KEYWORDS[category.name]}`"
            @click="onChangeCategory(category.name)"
          >
            {{ formatCamelCase(category.name) }}
            <div>
              <span>({{ category.length }})</span>&nbsp;
              <span>{{ (category.length / cve.total * 100).toFixed(2) }}%</span>

            </div>
        </div>
        </div>
        <p v-else>Loading...</p>
      </section>

    </div>
    <div class="right" ref="right_ref">
      <div class="controls">
        <Pagination :curr_page="curr_page" :tot_pages="totPages" :disabled="!out.totalCount" @page="onNewPage" />
        <div class="grow-1" />
        <Btn :def="false" :disabled="!out.totalCount" @click="onPageDownload(out.documents)">Download page ({{ out.documents?.length }})</Btn>
        <Btn :def="false" :disabled="!out.totalCount" @click="onDownloadAll">Download all ({{ out.totalCount }})</Btn>
      </div>
      <div class="log-box" v-if="out_loading"><p>Loading...</p></div>
      <div class="log-box" v-else-if="!out.totalCount"><p>Select a category</p></div>
      <template v-else>
        <Card v-for="(o, i) in out.documents" :key="`${o.id}-${i}`" :item="o" :filter="filter" />
      </template>
    </div>
  </div>
</template>

<script setup>
//====================================
// Import
//====================================
import {
  ref,
  watch,
  computed,
} from 'vue';
import {
  apiGetCVE,
  apiGetCVEsInfo,
} from '../utils/api.mjs';
import {
  CVE_KEYWORDS,
} from '../utils/keywords.mjs';

import router from '../router/index.js';

import Btn        from '../components/Btn.vue';
import Card       from '../components/Card.vue';
import InputText  from '../components/InputText.vue';
import Pagination from '../components/Pagination.vue';

//====================================
// Consts
//====================================
const cve          = ref({});
const category_sel = ref(undefined);
const out          = ref({});
const out_loading  = ref(false);
const temp_filter  = ref(undefined);
const filter       = ref(undefined);
const right_ref    = ref(undefined);
const curr_page    = ref(1);

const routeQuery   = computed( () => router.currentRoute?.value?.query);
const totPages     = computed( () => out.value.totalCount ? Math.floor(out.value.totalCount / 100) : 0 );

//====================================
// Functions
//====================================
async function initData() {
  cve.value = await apiGetCVEsInfo();
}

async function searchData() {
  out.value = {};
  out_loading.value = true;
  temp_filter.value = temp_filter.value?.trim();
  filter.value = temp_filter.value;

  out.value = await apiGetCVE( {name: category_sel.value, page: curr_page.value, filter: filter.value} );
  router.push( { path: '/', query: {category: category_sel.value, page: curr_page.value, ...(filter.value ? {filter: filter.value} : {})} } );

  if (right_ref.value) {
    right_ref.value.scrollTo( {top: 0, behavior: 'smooth'} );
  }
  out_loading.value = false;
}

function formatCamelCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
}

function onPageDownload(data) {
  const filename = `${category_sel.value || 'data'}.json`;
  saveAsFile( {filename, data} );
}

function saveAsFile( {filename, data} ) {
  const blob = new Blob( [JSON.stringify(data)], {type: 'application/json'} );
  const link = document.createElement("a");
  link.download = filename;
  link.href = window.URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

async function onNewPage( pag ) {
  curr_page.value = pag;
  out_loading.value = true;
  out.value = await apiGetCVE( {name: category_sel.value, page: curr_page.value, filter: filter.value} );
  router.push( {path: '/', query: {category: category_sel.value, page: curr_page.value, ...(filter.value ? {filter: filter.value} : {})} } );
  out_loading.value = false;
}

async function onDownloadAll() {
  const data = await apiGetCVE( {name: category_sel.value, getAll: true, filter: filter.value} );
  onPageDownload(data); 
}

function onChangeCategory(name) {
  category_sel.value = (category_sel.value == name) ? undefined : name;
  curr_page.value = 1;
}

//====================================
// Watcher
//====================================
watch(category_sel, async (category) => {
  if ( category ) {
    router.push({
      path: '/',
      query: {
        category,
        page: curr_page.value,
        ...(filter.value ? {filter: filter.value} : {})
      }
    });
  } else {
    out.value = {};
  }
});

watch( routeQuery, async (newRoute) => {
  const { category, page } = newRoute;
  curr_page.value = parseInt(page) > 0 ? parseInt(page) : 1;
  filter.value = newRoute.filter;
  temp_filter.value = newRoute.filter;
  if ( category ) {
    category_sel.value = category;
    out_loading.value = true;
    out.value = await apiGetCVE( {name: category, page: curr_page.value, filter: filter.value} );
    out_loading.value = false;
  } else {
    out.value = {};
  }
}, {immediate: true});




//====================================
// Life cycle
//====================================
initData();

</script>


<style scoped lang="scss">
.main {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 20px;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  padding: 32px 20px;

  .left {
    height: 100%;
    padding: 0 12px;
    position: relative;

    .categories-wrapper {
      display: flex;
      flex-direction: column;
      .label {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    .scrollable-content {
      position: absolute;
      width: 100%;
      height: 90%;
      overflow-y: scroll;
    }
  }

  .right {
    color: white;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 20px;
    .controls {
      position: sticky;
      top: -30px;
      display: flex;
      padding: 10px 22px;
      background-color: var(--grey-22);
    }
    .log-box {
      display: grid;
      place-content: center;
      height: 60vh;
    }
  }
}
</style>
