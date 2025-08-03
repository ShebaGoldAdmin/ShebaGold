<template>
  <section class="portfolio-home">
    <div class="portfolio-home__img">
      <NuxtImg
        format="avif"
        quality="90"
        src="/images/portfolio-home.png"
      />
    </div>
    <div class="container">
      <div class="portfolio-home__inner">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script setup>
import {onMounted} from 'vue';

const { $gsap } = useNuxtApp();

onMounted(() => {
  const portfolioImg = document.querySelector('.portfolio-home__img img');

  $gsap.fromTo(
    portfolioImg,
    { x: 300, scale: 1 },
    {
      x: 0,
      scale: 1.2,
      scrollTrigger: {
        trigger: portfolioImg,
        start: 'top bottom',
        end: '+=3000',
        scrub: true,
      },
    }
  );
});
</script>

<style lang="scss">
.portfolio-home{
  padding: 280px 0 188px;
  background: rgb(var(--color-dark));
  position: relative;
  h2{
    background: linear-gradient(82deg, #EACEA9 9.24%, #D7A25B 46.1%, #FDEED5 67.08%, #CDA36C 99.7%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  h3{
    color: rgb(var(--color-white));
  }
  p{
    color: rgba(var(--color-white),0.6);
  }
  @include respond-to(sm){
    padding: 80px 0 500px;
  }
  &__inner{
    max-width: 724px;
    position: relative;
    z-index: 4;
  }
  &__img{
    position: absolute;
    height: 100%;
    width: 80%;
    right: 0;
    top: 0;
    overflow: hidden;
    @include respond-to(sm){
      width: 200%;
      height: 50%;
      top: auto;
      bottom: 0;
    }
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      isolation: isolate;
    }
    &:before{
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: rgba(139, 103, 56, 1);
      mix-blend-mode: hue;
      z-index: 2;
    }
    &:after{
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 3;
      background: linear-gradient(90deg, rgb(var(--color-dark)) 31.36%, rgba(var(--color-dark), 0) 70%);
      @include respond-to(sm){
        background: linear-gradient(180deg, rgb(var(--color-dark)) 0%, rgba(var(--color-dark), 0) 50%);
      }
    }
  }
}

@media screen and (-webkit-min-device-pixel-ratio:0) {
  _::-webkit-full-page-media, _:future, :root .portfolio-home__img::before {
    display: none;
  }
}
</style>