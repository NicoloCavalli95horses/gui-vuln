<template>
  <div class="main">
    <div class="inputs">
      <InputText v-model:text="custom_filter" placeholder="search in summary or details" />
      <p class="t-12">{{ outFiltered?.length }} results found (tot. results: {{ out.length }})</p>
      <h2 class="t-24">Containing in the summary or details</h2>
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
            <td>{{ (out.length*cve.size/100).toFixed(2) }}%</td>
          </tr>
          <tr class="orange-text">
            <td>Classified in more than one category</td>
            <td>{{ totMultiClassified }}</td>
            <td>{{ (out.length*totMultiClassified/100).toFixed(2) }}%</td>
          </tr>
        </tbody>
      </table>
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
          <tr>
            <td>Critical</td>
            <td>{{ severityCount.critical }}</td>
            <td>{{ (out.length*severityCount.critical/100).toFixed(2) }}%</td>
          </tr>
          <tr>
            <td>High</td>
            <td>{{ severityCount.high }}</td>
            <td>{{ (out.length*severityCount.high/100).toFixed(2) }}%</td>
          </tr>
          <tr>
            <td>Moderate</td>
            <td>{{ severityCount.moderate }}</td>
            <td>{{ (out.length*severityCount.moderate/100).toFixed(2) }}%</td>
          </tr>
          <tr>
            <td>Low</td>
            <td>{{ severityCount.low }}</td>
            <td>{{ (out.length*severityCount.low/100).toFixed(2) }}%</td>
          </tr>
        </tbody>
      </table>
      <h2 class="t-24">Framework, language and library</h2>
      <table class="t-12">
        <thead>
          <tr>
            <th>Framework/language</th>
            <th>Abs.</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lang in langTypes" :key="lang.id">
            <td>{{ FRAMEWORK[lang.id]?.join(", ")?.toString() }}</td>
            <td>{{ lang.size }}</td>
            <td>{{ (out.length*lang.size/100).toFixed(2) }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="output">
      <Card v-for="o in outFiltered" :key="o.id" :item="o" />
    </div>
  </div>
</template>

<script setup>
//====================================
// Import
//====================================
import {
  ref,
  computed,
  onMounted,
} from 'vue';

import Card from './components/Card.vue';
import InputText from './components/InputText.vue';

//====================================
// Consts
//====================================

const CVE_KEYWORDS = {
  // Each CVE is classified based on the presence of these keywords in summary or details
  crossSite: ['xss', 'cross-site', 'injection'],
  denialOfService: ['dos', 'denial', 'service', 'redos', 'sanitize-html'],
  bufferOveflow: ['buffer', 'overflow'],
  openRedirect: ['open redirect', 'navigation'],
  prototypePollution: ['prototype pollution'],
  spoofing: ['spoofing'],
  crash: ['crash'],
  directoryTraversal: ['directory traversal'],
  remoteCodeExecution: ['code exec', 'remote exec', 'command exec', 'remote comm'],
  smuggling: ['smuggling'],
  contentSecurityPolicy: ['csp', 'content-security'],
  cachePoisoning: ['cache poisoning'],
  bluetooth: ['bluetooth'],
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
  vanillaJS: ['canvas', 'html'],
  preact: ['preact'],
  svelte: ['svelte'],
  next: ['next.js'],
  i18next: ['i18next']
}


//====================================
// Consts
//====================================
const out = ref([]);
const custom_filter = ref(undefined);
const severityCount = ref({});

const outFiltered = computed( () => custom_filter.value ? filterResults([custom_filter.value]) : out.value);
const cveType     = computed( () => classifyCVEs(CVE_KEYWORDS));
const langTypes   = computed( () => classifyCVEs(FRAMEWORK));
const totMultiClassified = computed( () => cveType.value.reduce((acc, cve) => acc + cve.size, null) - out.value.length)


//====================================
// Functions
//====================================
function filterResults( arr ) {
  return out.value.length ? out.value.filter(i => {
    const text = `${i.summary || ''} ${i.details || ''}`.toLowerCase(); // merge texts
    return arr.some(keyword => text.includes(keyword));
  }) : [];
}

function countSeverity() {
  out.value.forEach(o => {
    const severity =  o.database_specific?.severity?.toLowerCase();
    if (Number.isInteger(severityCount.value[ severity ])) {
      severityCount.value[ severity ] = severityCount.value[ severity ] + 1;
    } else {
      severityCount.value[ severity ] = 1;
    }
  });
}

function classifyCVEs( obj ) {
  const ret = [];
  if (!out.value) return ret;

  for (const [id, keywords] of Object.entries(obj)) {
    const matches = filterResults(keywords);
    const obj = { id, matches, size: matches?.length || 0 };
    ret.push(obj);
  }

  ret.sort((a, b) => b.size - a.size);
  return ret;
}


//====================================
// Life cycle
//====================================
onMounted(async () => {
  const data = await fetch('/data.json');
  out.value = await data.json();
  countSeverity();
});

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
  .inputs {
    height: 100%;
    overflow-y: scroll;
    padding: 0 12px;
  }

  .output {
    color: white;
    background-color: #333;
    height: 100%;
    overflow-y: scroll;
    padding: 20px;
  }
}
</style>
