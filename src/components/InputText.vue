<template>
  <input
    v-if="['text', 'password', 'search'].includes(type)"
    :disabled="disabled"
    :type="type"
    :autocomplete="autocomplete"
    :value="text"
    :required="is_required"
    :placeholder="placeholder"
    @input="$emit('update:text', $event.target.value)"
  />

  <textarea
    v-else-if="type == 'textarea'"
    :disabled="disabled"
    :autocomplete="autocomplete"
    :value="text"
    :required="is_required"
    :placeholder="placeholder"
    @input="$emit('update:text', $event.target.value)"
  />
</template>

<script setup>
// ==============================
// Props
// ==============================
const props = defineProps({
  text: String,
  type: {
    type: String,
    default: 'text',
  },
  autocomplete: {
    type: String,
    default: 'none'
  },
  placeholder: String,
  is_required: Boolean,
  disabled: Boolean,
});

const emit = defineEmits([
  "update:text",
]);

</script>

<style lang="scss" scoped>
input,
textarea {
  box-sizing: border-box;
  width: 100%;
  border-radius: 1.2rem;
  outline: none;
  border: 0.2rem solid var(--input-border);
  caret-color: var(--primary);
  font-size: 1.8rem;
  &:focus {
    border: 0.2rem solid var(--primary);
  }
  &::placeholder {
    filter: grayscale(60%);
    opacity: 0.7;
  }
  &.error {
    border: 2px solid var(--error-color);
    &::placeholder {
      color: var(--error-color);
    }
  }
}

input {
  padding: 0 1.2rem;
  height: 3.5rem;
}

textarea {
  height: 10rem;
  padding: 1rem 1.2rem;
  resize: none;
  &::placeholder {
    filter: grayscale(60%);
    opacity: 0.7;
  }
  @media screen and (min-width: 600px) { // from 600px up
    height: 20rem;
  }
}
</style>