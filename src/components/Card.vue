<template>
  <div class="card">
    <p v-if="item.database_specific?.severity">Severity:
      <span :class="{
        'purple-text': item.database_specific.severity.toLowerCase() == 'critical',
        'red-text': item.database_specific.severity.toLowerCase() == 'high',
        'orange-text': item.database_specific.severity.toLowerCase() == 'moderate',
        'green-text': item.database_specific.severity.toLowerCase() == 'low',
        }"
        class="label"
      >
      {{ item.database_specific?.severity }}</span>
    </p><br>
    <p>Id: <span class="grey">{{ item.id }}</span></p>
    <p>Summary: <span class="grey">{{ item.summary }}</span></p><br>
    <p>Details <br><span class="grey">{{ item.details }}</span></p>
  </div>
</template>

<script setup>
//====================================
// Props
//====================================
const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
});

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