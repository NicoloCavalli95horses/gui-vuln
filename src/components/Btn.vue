<template>
    <button
      :data-cy="`btn-${name}`"
      :name="name"
      :type="type"
      :disabled="disabled ? true : false"
      :class="{
        'disabled': disabled,
        'default': def,
        'round': round,
        'down': mouse.down,
        'icon' : icon
      }"
      @click="onClick"
      @mouseup="mouse.down = false"
      @mousedown="mouse.down = true"
      @mouseleave="onMouseleave"
    >
      <slot />
      <slot name="icon" />
    </button>
  </template>
  
  <script setup>
  // ==============================
  // Import
  // ==============================
  import { reactive } from "vue";
  
  // ==============================
  // Props
  // ==============================
  defineProps({
    name: {
      // used to identify the <button> in the DOM
      type: String,
      default: () => "id-" + Math.random().toString(16).slice(2),
    },
    type: {
      // type of <button> (reset, button, submit)
      type: String,
      default: () => "button",
    },
    def: {
      // default appearence of <button>
      type: Boolean,
      default: true,
    },
    disabled: {
      // used to trigger the disabled attribute and to style the <button> accordingly
      type: Boolean,
      default: false,
    },
    round: {
      // no text <button> with icon
      type: Boolean,
      default: false,
    },
    icon: Boolean,
  });
  
  const emit = defineEmits(["click", "cancel"]);
  
  // ==============================
  // Consts
  // ==============================
  const mouse = reactive({
    down: false,
  });
  
  // ==============================
  // Functions
  // ==============================
  function onClick(e) {
    emit("click", e);
  }
  
  function onMouseleave(e) {
    if (mouse.down) {
      emit("cancel", e);
      mouse.down = false;
    }
  }
  
  /**
   *
   * https://www.w3schools.com/tags/tag_button.asp
   *
   * ATTRIBUTE     VALUES
   * autofocus	    autofocus  (accepted: autofocus, autofocus="true", autofocus="false")
   * Specifies that a button should automatically get focus when the page loads
   *
   *
   *
   * disabled	      disabled  (accepted: disabled, disabled="true", disabled="false")
   * Specifies that a button should be disabled
   *
   *
   *
   * form	          form_id
   * Specifies which form the button belongs to
   *
   *
   *
   * formaction	    URL
   * Specifies where to send the form-data when a form is submitted. Only for type="submit"
   *
   *
   *
   * formenctype    application/x-www-form-urlencoded
   *                multipart/form-data
   *                text/plain
   * Specifies how form-data should be encoded before sending it to a server. Only for type="submit"
   *
   *
   *
   * formmethod	    get
   *                post
   * Specifies how to send the form-data (which HTTP method to use). Only for type="submit"
   *
   *
   *
   * formnovalidate	formnovalidate
   * Specifies that the form-data should not be validated on submission. Only for type="submit"
   *
   * formtarget	    _blank
   *                _self
   *                _parent
   *                _top
   *                framename
   * Specifies where to display the response after submitting the form. Only for type="submit"
   *
   *
   *
   * popovertarget	element_id
   * Specifies a which popover element to invoke
   *
   *
   *
   * popovertargetaction	hide
   *                      show
   *                      toggle
   * Specifies what happens to the popover element when the button is clicked
   *
   *
   *
   * name	               name
   * Specifies a name for the button
   *
   *
   *
   * type	              button
   *                    reset
   *                    submit
   * Specifies the type of button
   *
   *
   *
   * value	            text
   * Specifies an initial value for the button
   */
  </script>
  
  <style lang="scss" scoped>
  button {
    width: max-content;
    text-decoration: none;
    border: none;
    padding: 1.8rem 2.8rem;
    border-radius: var(--radius-xl);
    letter-spacing: 0.4rem;
    cursor: pointer;
    transition-duration: var(--transition-medium);
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    user-select: none;
    color: var(--font-light);
    &.icon {
      padding: 0.5rem;
      border: 1px solid var(--grey-33);
    }
  
    &:hover {
      transition-duration: var(--transition-medium);
      filter: brightness(150%);
    }
    &.disabled {
      opacity: 0.5;
      touch-action: none;
      pointer-events: none;
      &:hover {
        filter: none;
      }
    }
    &.default {
      background-color: var(--primary);
    }
    &.round {
      padding: 1.2rem;
      border-radius: 50%;
    }
  
    &.down {
      transform: scale(0.9);
    }
  }
  </style>