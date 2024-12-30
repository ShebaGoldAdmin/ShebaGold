<template>
  <div class="team-img">
    <NuxtImg ref="leaderImg"
      format="avif"
      quality="90"
      :src="src"
    />
    <LogoSvg class="team-img__logo"/>
  </div>
</template>

<script setup>
import LogoSvg from './LogoSvg.vue';

defineProps({
  src: {
    type: String,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.team-img{
  overflow: hidden;
  background: rgb(var(--color-gray-team));
  position: relative;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  img{
    width: 100%;
    transform-origin: left;
    display: block;
    position: relative;
    z-index: 2;
    aspect-ratio: 1/1.22;
    object-fit: cover;
    object-position: center 20%;
  }
  &__logo{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: -40px;
  }
}
</style>