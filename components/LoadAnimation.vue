<template>
  <div class="animation">
    <client-only>
      <Vue3Lottie
        :animationData="SplashAnimation"
        :width="animationWidth"
        :height="animationHeight"
        :loop="1"
        @on-complete="handleAnimationComplete"
      />
    </client-only>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import SplashAnimation from '~/assets/animations/data.json';

const emit = defineEmits(['onAnimationComplete']);

const animationWidth = ref('');
const animationHeight = ref('');

const updateAnimationSize = () => {
  const width = window.innerWidth;

  if (width >= 768) {
    animationWidth.value = 760;
    animationHeight.value = '58vh';
  } else {
    animationWidth.value = '90vw';
    animationHeight.value = 300;
  }
};

onMounted(() => {
  updateAnimationSize();
  window.addEventListener('resize', updateAnimationSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateAnimationSize);
});

const handleAnimationComplete = () => {
  emit('onAnimationComplete');
};
</script>

<style lang="scss" scoped>
.animation {
  @include center(horizontal);
  top: 0;
  @include respond-to(sm){
    top: 12dvh;
  }
}
</style>
