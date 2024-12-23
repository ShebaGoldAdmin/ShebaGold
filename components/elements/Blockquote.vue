<template>
  <blockquote>
    <img src="/images/blockquote.svg" alt="">
    <h3><slot/></h3>
  </blockquote>
</template>

<script setup lang="js">
import { onMounted } from 'vue';
const { $gsap } = useNuxtApp();
import splitType from 'split-type';

onMounted(() => {
  $gsap.from('blockquote img', {
    y: 50,
    scale: 0.7,
    opacity: 0.3,
    duration: 5,
    scrollTrigger: {
      trigger: 'blockquote img',
      start: 'top 80%',
      end: 'top 20%',
      scrub: true,
    },
  });

  const ourText = new splitType('blockquote h3', { types: 'words' });
  const words = ourText.words;

  $gsap.from(words, { 
    y: -20,
    opacity: 0,
    stagger: 0.4,
    duration: 2,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: 'blockquote h3',
      start: 'top 90%',
      end: 'bottom 20%',
      scrub: true,
    },
  });
});
</script>

<style lang="scss" scoped>
blockquote{
  padding: 130px 120px 110px 372px;
  max-width: calc(100% - 216px);
  margin: -1px auto;
  position: relative;
  background:
    linear-gradient(to right, rgb(var(--color-gold)) 1px, transparent 1px) 0 0,
    linear-gradient(to right, rgb(var(--color-gold)) 1px, transparent 1px) 0 100%,
    linear-gradient(to left, rgb(var(--color-gold)) 1px, transparent 1px) 100% 0,
    linear-gradient(to left, rgb(var(--color-gold)) 1px, transparent 1px) 100% 100%,
    linear-gradient(to bottom, rgb(var(--color-gold)) 1px, transparent 1px) 0 0,
    linear-gradient(to bottom, rgb(var(--color-gold)) 1px, transparent 1px) 100% 0,
    linear-gradient(to top, rgb(var(--color-gold)) 1px, transparent 1px) 0 100%,
    linear-gradient(to top, rgb(var(--color-gold)) 1px, transparent 1px) 100% 100%;

  background-repeat: no-repeat;
  background-size: 20px 20px;
  img{
    position: absolute;
    top: 68px;
    left: 120px;
    @include respond-to(md){
      left: 64px;
    }
    @include respond-to(sm){
      width: 56px;
      height: 56px;
      left: 0;
      top: 40px;
    }
  }
  @include respond-to(lg){
    max-width: 100%;
  }
  @include respond-to(md){
    padding-left: 240px;
    padding-right: 80px;
  }
  @include respond-to(sm){
    background: none;
    padding: 90px 16px 40px 72px;
  }
}
</style>