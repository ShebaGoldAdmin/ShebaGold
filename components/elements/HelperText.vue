<template>
  <div>[ <slot></slot> ]</div>
</template>

<style lang="scss" scoped>
div{
  @include fsz(13px);
  color: rgb(var(--color-gold));
  font-weight: var(--weight-medium);
  text-transform: uppercase;
}
</style>