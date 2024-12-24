<template>
  <div>
    <section>
      <video class="fullscreen d-none d-flex-md" src="/assets/videos/sheba-video.mp4" playsinline autoplay muted loop disablePictureInPicture controlsList="nodownload"></video>
      <div class="splash-inner" :class="{'loaded': isAnimationComplete}">
        <div class="splash-button-wrap">
          <ArrowButton color="gold" 
            @click="$scrollToAnchor('#overview')"
          />
        </div>
        <LoadAnimation @onAnimationComplete="handleAnimationComplete"/>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoadAnimation from '~/components/LoadAnimation.vue';

const isAnimationComplete = ref(false);

const handleAnimationComplete = () => {
  isAnimationComplete.value = true;
};
</script>

<style lang="scss" scoped>
section{
  overflow: hidden;
  position: relative;
  height: 100dvh;
}
.splash-inner{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgb(var(--color-black));
  transition: 500ms;
  &.loaded{
    background: rgba(var(--color-black), 0.5);
    .splash-button-wrap{
      top: 70%;
      opacity: 1;
      pointer-events: auto;
      @include respond-to(sm){
        top: calc(30dvh + 200px);
        transform: translate(-50%, 0);
      }
    }
  }
  .splash-button-wrap{
    @include center(both);
    top: 75%;
    opacity: 0;
    pointer-events: none;
    transition: 500ms;
    @include respond-to(sm){
      top: calc(30dvh + 220px);
      transform: translate(-50%, 0);
    }
  }
}
video.fullscreen {
  position: absolute;
  z-index: 0;
  object-fit: cover;
  width:130%;
  height:100%;
  top: 0;
  left: 0;
  pointer-events: none;
  &::-webkit-media-controls {
     display:none !important;
  }
}
</style>
