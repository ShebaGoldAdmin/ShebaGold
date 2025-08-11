<template>
  <section class="news-home">
    <div class="news-home__img">
      <NuxtImg
        format="avif"
        quality="90"
        src="/images/portfolio-home.png"
      />
    </div>
    <div class="container">
      <div class="news-home__inner">
        <h2 class="word-split">News</h2>
        <div class="row">
          <NewsBanner :heartSize="20"/>
        </div>
        <p class="lg scalable">Sheba Gold Capital Signs Definitive Agreement to Acquire Dominion's Products & Healthcare Services Business.</p>
        <p class="lg scalable">The investment builds on Dominion’s legacy as a trusted partner to healthcare providers, expanding their access to critical products and services and strengthening their ability to deliver exceptional patient care for years to come.</p>
        <NuxtLink to="/news">
          <ArrowButton class="mt-72 from-right"
            color="gold"
            arrowRotate="-90"
          />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import NewsBanner from '~/components/NewsBanner.vue';
import {onMounted} from 'vue';
import ArrowButton from "~/components/elements/ArrowButton.vue";
import { useScrollTrigger } from '~/composables/useScrollTrigger'

const { initializeScrollTriggers } = useScrollTrigger()

onMounted(async () => {
  await initializeScrollTriggers(($gsap) => {
    const newsImg = document.querySelector('.news-home__img img');

    $gsap.fromTo(
      newsImg,
      { x: 300, scale: 1 },
      {
        x: 0,
        scale: 1.2,
        scrollTrigger: {
          trigger: newsImg,
          start: 'top bottom',
          end: '+=3000',
          scrub: true,
        },
      }
    );
  });
});
</script>

<style lang="scss" scoped>
.news-home{
  padding: 280px 0 188px;
  background: rgb(var(--color-dark));
  position: relative;
  h2{
    @include goldGradientText;
    :deep(.word) {
      @include goldGradientText;
    }
  }
  h3{
    color: rgb(var(--color-white));
  }
  p{
    color: rgba(var(--color-white),0.6);
  }
  @include paragraphSpacing;
  @include respond-to(sm){
    padding: 80px 0 500px;
  }
  &__inner{
    max-width: 572px;
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
  _::-webkit-full-page-media, _:future, :root .news-home__img::before {
    display: none;
  }
}
</style>