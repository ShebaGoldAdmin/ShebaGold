<template>
  <button class="arrow-button-wrapper" 
    :class="arrowButtonClass"
    :style="styleVariables"
  >
    <span class="arrow-button">
      <ArrowSvg :style="`transform: rotate(${arrowRotate}deg)`"/>
    </span>
    <span v-if="hasSlot" class="arrow-button-name">
      <slot></slot>
    </span>
  </button>
</template>

<script setup>
import { computed, useSlots } from 'vue';
import ArrowSvg from '~/components/elements/ArrowSvg.vue';

const props = defineProps({
  color: {
    type: String,
    default: 'dark',
  },
  arrowRotate: {
    type: String,
    default: '0',
  },
  paginationLeft: {
    type: Boolean,
    default: false,
  },
  paginationRight: {
    type: Boolean,
    default: false,
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

const slots = useSlots();
const hasSlot = computed(() => !!slots.default);

const arrowButtonClass = computed(() => {
  return {
    'pagination-left': props.paginationLeft,
    'pagination-right': props.paginationRight,
  };
});
</script>

<style lang="scss">
.arrow-button-wrapper{
  display: inline-flex;
  align-items: center;
  span{
    @include fsz(45px);
    font-family: var(--font-heading);
    color: var(--svg-stroke-color);
    @include respond-to(sm){
      @include fsz(30px);
    }
  }
  &:hover {
    .arrow-button{
      &:before{
        opacity: 1;
      }
    }
    path{
      stroke: var(--hover-svg-stroke-color);
    }
  }
}
.arrow-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  width: 80px;
  height: 80px;
  outline: 1px solid var(--border-color);
  outline-offset: -1px;
  > * {
    z-index: 4;
  }
  &:before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--hover-background-color);
    opacity: 0;
    transform: rotate(-90deg);
    transition: 300ms;
    z-index: 3;
  }
  &:after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
    z-index: 2;
  }
  path{
    stroke: var(--svg-stroke-color);
    transition: 200ms;
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

.arrow-button-name {
  margin-left: 40px;
  @include respond-to(sm) {
    margin-left: 16px;
  }
}

.pagination-left {
  @include respond-to(sm) {
    flex-direction: column;
    align-items: flex-start;
  }
  .arrow-button-name {
    @include respond-to(sm) {
      margin-left: 0;
      margin-top: 16px;
    }
  }
}

.pagination-right {
  flex-flow: row-reverse;
  @include respond-to(sm) {
    flex-direction: column;
    align-items: flex-end;
  }
  .arrow-button-name {
    margin-right: 40px;
    @include respond-to(sm) {
      margin-right: 0;
      margin-top: 16px;
    }
  }
}
</style>
