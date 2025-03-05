<template>
  <main id="home">
    <Splash/>
    <section class="overview" id="overview">
      <div class="overview-heading">Overview</div>
      <div class="container container--sm">
        <img class="mb-32" src="public/images/logo-single.svg" alt="Sheba Gold Capital" /> 
        <h2 class="word-split mb-24 mb-64-sm">Leading the Way in Strategic Investment<br> and Sustainable Growth</h2>
        <p class="lg scalable">Sheba Gold Capital is an esteemed investment firm specializing in the identification of lucrative real estate holdings nationwide, as well as businesses exhibiting significant growth potential.</p>   
      </div>
      <div class="overview-items">
        <div class="container">
          <OverviewItem 
            v-for="item in overviewItems" 
            :key="item.id" 
            :item="item"
          />
          <Blockquote>We invite you to join us on our journey towards unparalleled success.</Blockquote>
          <hr>
        </div>
      </div>
    </section>

    <GuidingPrincipals id="principals"/>
    <Leadership id="leadership"/>
    <PortfolioHome/>
  </main>
</template>

<script setup lang="js">
import { onMounted, onUnmounted } from 'vue';
const { $gsap } = useNuxtApp();
import ScrollTrigger from 'gsap/ScrollTrigger'

import Splash from '~/components/Splash.vue';
import OverviewItem from '~/components/OverviewItem.vue';
import Blockquote from '~/components/elements/Blockquote.vue';
import GuidingPrincipals from '../components/GuidingPrincipals.vue';
import Leadership from '~/components/Leadership.vue';
import PortfolioHome from '~/components/PortfolioHome.vue';

import overviewData from '~/data/overview-items.json';

const emit = defineEmits();
const overviewItems = overviewData;

onMounted(() => {
  const trigger = ScrollTrigger.create({
    start: "top -99%",
    end: "bottom -100%",
    onEnter: () => emit('update:headerHidden', false),
    onLeaveBack: () => emit('update:headerHidden', true),
  })

  onUnmounted(() => {
    trigger.kill()
  })
})

onMounted(() => {
  const tl = $gsap.timeline({
    scrollTrigger: {
      trigger: '.overview',
      start: 'top 20%',
      end: 'bottom top',
      scrub: true,
      pin: '.overview-heading',
      pinSpacing: true,
    }
  });

  tl.from('.overview-heading', {
    opacity: 0,
    duration: 0.1,
  })

  .to('.overview-heading', {
    opacity: 0.05,
    duration: 0.2,
  })
  .to('.overview-heading', {
    opacity: 0.5,
    duration: 0.9
  });

  $gsap.matchMedia().add("(min-width: 768px)", () => {
    $gsap.to('.overview-heading', {
      scale: 1.1,
      duration: 0.2,
      scrollTrigger: {
        trigger: '.overview',
        start: 'top 80%',
        end: 'bottom top',
        scrub: true,
      }
    });
  });

  $gsap.to('.overview-heading', {
    color: 'rgb(230, 230, 230)',
    scrollTrigger: {
      trigger: '.overview-items',
      start: 'top bottom',
      end: 'top center',
      scrub: true
    }
  });

  $gsap.to('.overview', {
    backgroundColor: 'rgb(255,255,255)',
    scrollTrigger: {
      trigger: '.overview-items',
      start: 'top bottom',
      end: 'top center',
      scrub: true
    }
  });

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());
  });
});
</script>


<style lang="scss" scoped>
.overview{
  background: rgb(var(--color-dark));
  padding: 1000px 0 310px;
  text-align: center;
  color: rgb(var(--color-white));
  position: relative;
  @include respond-to(sm){
    padding: 1000px 0 160px;
  }
  p{
    opacity: 0.6;
    max-width: 926px;
    margin: 0 auto;
  }
}
.overview-heading{
  font-family: var(--font-heading);
  @include fsz(348px);
  letter-spacing: 17px;
  color: rgb(var(--color-gray));
  top: 0;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  @include respond-to(sm){
    @include fsz(100px);
    letter-spacing: 6.5px;
    bottom: 20px;
  }
}
.overview-items{
  margin-top: 700px;
  padding-top: 400px;
  color: rgb(var(--color-navy-blue));
  @include respond-to(sm){
    padding-top: 100px;
  }
}
</style>
