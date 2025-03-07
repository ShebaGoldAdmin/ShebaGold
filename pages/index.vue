<template>
  <main id="home">
    <Splash/>
    <section class="overview" id="overview">
      <div class="overview-heading">
        <div>Overview</div>
      </div>
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
  $gsap.to('.overview-heading', {
    scrollTrigger: {
      trigger: '.overview',
      start: 'top 50%',
      end: 'bottom top',
      scrub: true,
      pin: '.overview-heading',
      pinSpacing: true,
    }
  });

  $gsap.from('.overview-heading div', {
    y: -300,
    scrollTrigger: {
      trigger: '.overview',
      start: 'top 90%',
      end: 'top 20%',
      scrub: true
    }
  });

  $gsap.from('.overview-heading div', {
    opacity: 1,
    scrollTrigger: {
      trigger: '.overview',
      start: 'top 30%',
      end: 'top top',
      scrub: true
    }
  });

  $gsap.to('.overview-heading div', {
    color: 'rgb(0,0,0)',
    scrollTrigger: {
      trigger: '.overview-items',
      start: 'top 60%',
      end: 'top center',
      scrub: true
    }
  });

  $gsap.to('.overview', {
    backgroundColor: 'rgb(255,255,255)',
    scrollTrigger: {
      trigger: '.overview-items',
      start: 'top 60%',
      end: 'top center',
      scrub: true
    }
  });

  $gsap.to('.overview .container', {
    y: -50,
    scrollTrigger: {
      trigger: '.overview-items',
      start: 'top 70%',
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
  padding: 400px 0 310px;
  text-align: center;
  color: rgb(var(--color-white));
  position: relative;
  @include respond-to(sm){
    padding: 280px 0 160px;
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
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  line-height: 0;
  div{
    opacity: 0.05;
  }
  @include respond-to(sm){
    @include fsz(100px);
    letter-spacing: 6.5px;
  }
}
.overview-items{
  padding-top: 200px;
  color: rgb(var(--color-navy-blue));
}
</style>
