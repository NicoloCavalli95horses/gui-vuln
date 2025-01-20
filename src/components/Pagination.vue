<template>
  <div class="pagination-main">
    <span class="box" :class="{ 'disabled': curr_page === 1 || disabled }" @click="emit('page', 1)">1</span>
    <span class="box" :class="{ 'disabled': curr_page === 1 || disabled }" @click="emit('page', curr_page - 1)">
      &lt;
    </span>
    <span class="current-page" :class="{ 'disabled': disabled }">{{ curr_page }}</span>
    <span class="box" :class="{ 'disabled': curr_page === tot_pages || disabled }" @click="emit('page', curr_page + 1)">
      &gt;
    </span>
    <span class="box" :class="{ 'disabled': disabled }" @click="emit('page', tot_pages)">{{ tot_pages }}</span>
  </div>
</template>

<script setup>
//==============================
// Props, emits
//==============================
import Btn from './Btn.vue';

//==============================
// Props, emits
//==============================
const props = defineProps({
  curr_page: Number,
  tot_pages: Number,
  disabled: Boolean,
});

const emit = defineEmits([
  'page'
]);

//==============================
// Consts
//==============================

//==============================
// Consts
//==============================
</script>


<style lang="scss" scoped>
.pagination-main {
  width: 100%;
  height: max-content;
  display: flex;
  align-items: center;
  text-align: center;

  .box {
    min-width: 33px;
    width: 46px;
    height: 46px;
    display: grid;
    place-content: center;
    border-radius: var(--radius-l);
    border: 1px solid var(--grey-44);
    margin: 0 2px;
    cursor: pointer;
  }

  .current-page {
    width: 66px;
  }
}
</style>