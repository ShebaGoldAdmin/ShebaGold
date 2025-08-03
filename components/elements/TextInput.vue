<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    class="text-input"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps({
  modelValue: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
.text-input {
  height: 80px;
  width: 100%;
  background: transparent;
  border: 1px rgba(var(--color-white), 0.3) solid;
  color: rgba(var(--color-gold), 1);
  @include fsz(20px);
  font-family: var(--font-body);
  padding: 0 16px;
  transition: 200ms;
  &:focus {
    border-color: rgba(var(--color-gold), 1);
  }
  &::placeholder {
    color: rgba(var(--color-gold), 0.6);
  }
  @include respond-to(sm) {
    height: 64px;
  }
}
</style>