<template>
  <div class="main">
    <div class="inputs">
      <InputText v-model:text="custom_filter" placeholder="search in summary or details" />
      <p class="t-12">Tot. results: {{ out.length }}, filtered: {{ outFiltered?.length }}</p>
      <table class="t-24">
        <thead>
          <tr>
            <th>Containing in the summary or details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cve, i) in cveType" :key="cve">
            <td>{{ CVE_KEYWORDS[cve.id]?.join(", ")?.toString() }}</td>
            <td>{{ cve.size }}</td>
          </tr>
          <td class="orange-text">Classified in more than one category</td>
          <td class="orange-text">{{ cveType.reduce((acc, cve) => acc + cve.size, null) - out.length }}</td>
        </tbody>
      </table>
      <table class="t-48">
        <thead>
          <tr>
            <th>Severity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Critical</td>
            <td>{{ tot.critical }}</td>
          </tr>
          <tr>
            <td>High</td>
            <td>{{ tot.high }}</td>
          </tr>
          <tr>
            <td>Moderate</td>
            <td>{{ tot.moderate }}</td>
          </tr>
          <tr>
            <td>Low</td>
            <td>{{ tot.low }}</td>
          </tr>
          <tr>
            <td></td>
            <td>{{ Object.values(tot).length ? Object.values(tot).reduce((acc, i) => acc + i) : null }}</td>
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
  directoryTraversal: ['directory traversal'], // to study
  remoteCodeExecution: ['code exec', 'remote exec', 'command exec', 'remote comm'],
  smuggling: ['smuggling'],
  contentSecurityPolicy: ['csp', 'content-security'],
  cachePoisoning: ['cache poisoning'], // to study
  bluetooth: ['bluetooth'],
  contextIsolationBypass: ['contextisolation', 'context isolation bypass', 'context bypass'],
  asarIntegrity: ['asar integrity'],
  fileRead: ['file read'],
  trojan: ['trojan', 'horse'],
  internalProcessCommunication: ['ipc', 'internal-process communication'],
  autoupdater: ['autoupdater']
}


//====================================
// Consts
//====================================
const out = ref([]);
const custom_filter = ref(undefined);
const tot = ref({});

const outFiltered = computed( () => custom_filter.value ? filterResults([custom_filter.value]) : out.value);
const cveType = computed(() => {
  const ret = [];
  if (!out.value) return ret;

  for (const [id, keywords] of Object.entries(CVE_KEYWORDS)) {
    const matches = filterResults(keywords);
    const obj = { id, matches, size: matches?.length || 0 };
    ret.push(obj);
  }

  ret.sort((a, b) => b.size - a.size);
  return ret;
});



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
    if (Number.isInteger(tot.value[ severity ])) {
      tot.value[ severity ] = tot.value[ severity ] + 1;
    } else {
      tot.value[ severity ] = 1;
    }
  });
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
  grid-gap: 10px;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
}

.inputs {
  padding: 20px;

}

.output {
  color: white;
  padding: 20px;
  background-color: #333;
  height: 100%;
  overflow-y: scroll;
  font-size: 14px;

  pre {
    white-space: break-spaces;
  }
}
</style>
