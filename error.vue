<template>
  <section>
    <VideoBackground/>
    <div class="error-block">
      <img src="/images/logo-text.svg" alt="" class="mb-32" />
      <h2>
        {{ error.statusCode === 404 ? 'Page Not Found' : 'An error occurred' }}
      </h2>
      <NuxtLink to="/">
        <ArrowButton class="mt-32"
          color="gold"
          arrowRotate="-90"
        />
      </NuxtLink>
    </div>
  </section>
  
</template>

<script setup>
import VideoBackground from '~/components/VideoBackground.vue';
defineProps({
  error: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
section{
  overflow: hidden;
  position: relative;
  height: 100dvh;
  z-index: 2;
}
.error-block{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  color: rgb(var(--color-white));
  transition: 500ms;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
