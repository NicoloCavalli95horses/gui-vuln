<template>
  <div class="card">
    <p>Severity:
      <span v-if="severity" :class="{
        'purple-text': severity == 'critical',
        'red-text': severity == 'high',
        'orange-text': ['moderate', 'medium'].includes(severity),
        'green-text': severity == 'low',
        }"
        class="label"
      >
        {{ severity.toUpperCase() }}
      </span>
      <span v-else class="grey">unknown</span>
    </p><br>
    <p>Id: <span class="grey">{{ item.id }}</span></p>
    <p v-if="item.summary">Summary: <span class="grey" v-html="highlightWord(item.summary)"></span></p><br>
    <p v-if="item.details">Details <br><span class="grey"v-html="highlightWord(item.details)"></span></p>
  </div>
</template>

<script setup>
//====================================
// Import
//====================================
import { computed } from 'vue';

//====================================
// Props
//====================================
const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  custom_filter: String,
});

//====================================
// Const
//====================================
const severity = computed( () => props.item.database_specific?.severity?.toLowerCase() );


//====================================
// Functions
//====================================
function highlightWord(text) {
  const escapeHtml = (unsafeText) => {
    return unsafeText
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  if (props.custom_filter) {
    const escapedFilter = props.custom_filter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedFilter})`, "gi");
    return escapeHtml(text).replace(regex, '<span style="color: lightgreen; font-weight: bold;">$1</span>');
  } else {
    return escapeHtml(text);
  }
}


</script>


<style lang="scss" scoped>
.card {
  margin: 22px 0px;
  border: 2px solid #444;
  padding: 12px;
  border-radius: 8px;
}
.grey {
  color: #999;
}

</style>