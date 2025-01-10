<template>
  <Loading v-show="is_loading" />
  <div class="main">
    <div class="left">
      <h2>Summary or details search</h2>
      <div class="flex-center">
        <InputText v-model:text="temp_filter" type="search" :disabled="!out" placeholder="search in summary or details" />
        <Btn @click="filterData" class="l-12">Search</Btn>
      </div>

      <p class="t-12">{{ outFiltered?.length }} results found (tot. results: {{ out.length }})</p>
      <h2 class="t-24">Containing in the summary or details</h2>
      <section v-show="!is_loading">
        <table class="t-12">
          <thead>
            <tr>
              <th>Keywords</th>
              <th>Abs.</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cve in cveType" :key="cve.id">
              <td>{{ CVE_KEYWORDS[cve.id]?.join(", ")?.toString() }}</td>
              <td>{{ cve.size }}</td>
              <td>{{ (cve.size / outFiltered.length * 100).toFixed(2) }}%</td>
            </tr>
            <tr v-if="totMultiClassified > 0" class="orange-text">
              <td>Classified in more than one category</td>
              <td>{{ totMultiClassified }}</td>
              <td>{{ (totMultiClassified / outFiltered.length * 100).toFixed(2) }}%</td>
            </tr>
          </tbody>
        </table>
        <template v-if="severityCount.critical || severityCount.high || severityCount.moderate || severityCount.low">
          <h2 class="t-24">Severity</h2>
          <table class="t-12">
            <thead>
              <tr>
                <th>Severity</th>
                <th>Abs.</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(count, severity) in severityCount" :key="severity">
                <td>{{ severity }}</td>
                <td>{{ count || 0 }}</td>
                <td>{{ count ? ((count / outFiltered.length) * 100).toFixed(2) : 0 }}%</td>
              </tr>
            </tbody>
          </table>
        </template>
        <h2 class="t-24">Framework, language and library</h2>
        <table class="t-12">
          <thead>
            <tr>
              <th>Framework/language/software interface</th>
              <th>Abs.</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lang in langTypes" :key="lang.id">
              <td>{{ FRAMEWORK[lang.id]?.join(", ")?.toString() }}</td>
              <td>{{ lang.size }}</td>
              <td>{{ (lang.size / outFiltered.length * 100).toFixed(2) }}%</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
    <div class="right">
      <Card v-for="o in outFiltered" :key="o.id" :item="o" :filter="filter" />
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

import Btn       from './components/Btn.vue';
import Card      from './components/Card.vue';
import InputText from './components/InputText.vue';
import Loading   from './components/Loading.vue';

//====================================
// Consts
//====================================

const CVE_KEYWORDS = {
  // Each CVE is classified based on the presence of these keywords in summary or details
  crossSite: ['xss', 'cross-site', 'injection', 'csfr', 'xsrf'],
  denialOfService: ['dos', 'denial', 'service', 'redos', 'sanitize-html'],
  bufferOveflow: ['buffer', 'overflow'],
  openRedirect: ['open redirect', 'navigation'],
  prototypePollution: ['prototype pollution'],
  spoofing: ['spoofing'],
  crash: ['crash'],
  directoryTraversal: ['directory traversal'],
  remoteCodeExecution: ['code exececution', 'remote execution', 'command execution', 'remote command'],
  smuggling: ['smuggling'],
  contentSecurityPolicy: ['csp', 'content-security'],
  cachePoisoning: ['cache poisoning'],
  contextIsolationBypass: ['contextisolation', 'context isolation bypass', 'context bypass'],
  asarIntegrity: ['asar integrity'],
  fileRead: ['file read'],
  trojan: ['trojan', 'horse'],
  internalProcessCommunication: ['ipc', 'internal-process communication'],
  autoupdater: ['autoupdater'],
};

const FRAMEWORK = {
  vue: ['vue'],
  angular: ['angular'],
  react: ['react'],
  electron: ['electron'],
  three: ['three'],
  vanillaJS: ['canvas', 'html', 'eslint'],
  preact: ['preact'],
  svelte: ['svelte'],
  next: ['next.js'],
  i18next: ['i18next']
}

//====================================
// Consts
//====================================
const out           = ref( [] );
const temp_filter   = ref( undefined );
const severityCount = ref( {} );
const is_loading    = ref( false );
const filter        = ref( undefined );

const outFiltered        = computed( () => filter.value ? filterResults([filter.value]) : out.value);
const cveType            = computed( () => classifyCVEs(CVE_KEYWORDS));
const langTypes          = computed( () => classifyCVEs(FRAMEWORK));
const totMultiClassified = computed( () => cveType.value.reduce((acc, cve) => acc + cve.size, 0) - outFiltered.value.length);


//====================================
// Functions
//====================================
function containsWord(text, words = []) {
  return words.some(w => {
    const regex = new RegExp(`\\b${w}\\b`, 'i'); // word delimitation, case-insensitive
    return regex.test(text);
  })
}

function filterResults(arr) {
  return outFiltered.value.length ? outFiltered.value.filter(i => {
    const text = `${i.id || ''} ${i.summary || ''} ${i.details || ''}`.toLowerCase();
    return containsWord(text, arr);
  }) : [];
}

function countSeverity() {
  severityCount.value = {
    critical: 0,
    high: 0,
    moderate: 0,
    low: 0,
    unknown: 0
  };

  outFiltered.value.forEach(o => {
    let severity = o.database_specific?.severity?.toLowerCase();
    if (severity === 'medium') {
      severity = 'moderate';
    }

    if (severity) {
      severityCount.value[severity] += 1;
    } else {
      severityCount.value.unknown += 1;
    }
  });
}

function classifyCVEs(obj) {
  const ret = [];
  if (!Array.isArray(outFiltered.value) || outFiltered.value.length === 0) return ret;

  for (const [id, keywords] of Object.entries(obj)) {
    const matches = filterResults(keywords);
    const obj = { id, matches, size: matches?.length || 0 };
    ret.push(obj);
  }

  ret.sort((a, b) => b.size - a.size);
  return ret;
}

async function initData() {
  is_loading.value = true;
  const jsonData = await fetch('data.json');
  const { data } = await jsonData.json();
  out.value = data;
  countSeverity();
  is_loading.value = false;
}

function filterData() {
  temp_filter.value = temp_filter.value?.trim();
  filter.value = temp_filter.value;
}


//====================================
// Watcher
//====================================
watch(outFiltered, () => {
  if (!is_loading.value) {
    countSeverity();
  }
});


//====================================
// Life cycle
//====================================
initData();

</script>


<style scoped lang="scss">
.main {
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-gap: 20px;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  padding: 32px 20px;

  .left {
    height: 100%;
    overflow-y: scroll;
    padding: 0 12px;
  }

  .right {
    color: white;
    background-color: #333;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 20px;
  }
}
</style>
