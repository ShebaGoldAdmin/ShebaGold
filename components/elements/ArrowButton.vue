<template>
  <a class="arrow-button" :style="styleVariables">
    <ArrowSvg />
  </a>
</template>

<script setup>
import { computed } from 'vue';
import ArrowSvg from '~/components/elements/ArrowSvg.vue';

const props = defineProps({
  color: {
    type: String,
    default: 'dark',
  },
});

const styleVariables = computed(() => {
  const styles = {};

  if (props.color === 'gold') {
    styles['--border-color'] = 'rgba(var(--color-white), 0.2)';
    styles['--hover-background-color'] =
      'linear-gradient(338deg, #EACEA9 -36.88%, #D7A25B 27.57%, #FDEED5 64.27%, #CDA36C 121.31%)';
    styles['--svg-stroke-color'] = 'rgb(var(--color-gold))';
    styles['--hover-svg-stroke-color'] = 'rgb(var(--color-dark))';
  }

  if (props.color === 'dark') {
    styles['--border-color'] = 'rgb(var(--color-gray))';
    styles['--hover-background-color'] = 'rgb(var(--color-navy-blue))';
    styles['--svg-stroke-color'] = 'rgb(var(--color-navy-blue))';
    styles['--hover-svg-stroke-color'] = 'rgb(var(--color-white))';
  }

  return styles;
});
</script>

<style lang="scss">
.arrow-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  width: 80px;
  height: 80px;
  border: 1px solid var(--border-color);
  background:
    linear-gradient(to right, var(--svg-stroke-color) 1px, transparent 1px) 0 0,
    linear-gradient(to right, var(--svg-stroke-color) 1px, transparent 1px) 0 100%,
    linear-gradient(to left, var(--svg-stroke-color) 1px, transparent 1px) 100% 0,
    linear-gradient(to left, var(--svg-stroke-color) 1px, transparent 1px) 100% 100%,
    linear-gradient(to bottom, var(--svg-stroke-color) 1px, transparent 1px) 0 0,
    linear-gradient(to bottom, var(--svg-stroke-color) 1px, transparent 1px) 100% 0,
    linear-gradient(to top, var(--svg-stroke-color) 1px, transparent 1px) 0 100%,
    linear-gradient(to top, var(--svg-stroke-color) 1px, transparent 1px) 100% 100%;
  background-repeat: no-repeat;
  background-size: 8px 8px;
  &:before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--hover-background-color);
    opacity: 0;
    z-index: -1;
    transform: rotate(-90deg);
    transition: 300ms;
  }
  path{
    stroke: var(--svg-stroke-color);
    transition: 200ms;
  }
  &:hover {
    &:before{
      opacity: 1;
    }
    path{
      stroke: var(--hover-svg-stroke-color);
    }
  }
  @include respond-to(sm){
    width: 56px;
    height: 56px;
    svg{
      width: 20px;
      height: 20px;
    }
  }
}
</style>
