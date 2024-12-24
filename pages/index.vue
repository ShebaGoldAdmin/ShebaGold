<template>
  <main>
    <Splash/>
    <section class="overview" id="overview">
      <div class="container container--sm">
        <img class="mb-32" src="public/images/logo-single.svg" alt="Sheba Gold Capital" /> 
        <h2 class="word-split mb-24 mb-64-sm">Leading the Way in Strategic Investment<br> and Sustainable Growth</h2>
        <p class="lg scalable">Sheba Gold Capital is an esteemed investment firm specializing in the identification of lucrative real estate holdings nationwide, as well ass businesses exhibiting significant growth potential.</p>   
      </div>
      <div class="overview-heading">Overview</div>
    </section>

    <section class="pt-32 pt-120-sm pb-32 pb-192-sm overview-items">
      <div class="container">
        <OverviewItem 
          v-for="item in overviewItems" 
          :key="item.id" 
          :item="item"
        />
        <Blockquote>We invite you to join us on our journey towards unparalleled success.</Blockquote>
        <hr>
      </div>
    </section>

    <GuidingPrincipals/>
    <Leadership/>
    <PortfolioHome/>
  </main>
</template>

<script setup lang="js">
import { onMounted } from 'vue';
const { $gsap } = useNuxtApp();
import splitType from 'split-type';

import Splash from '~/components/Splash.vue';
import OverviewItem from '~/components/OverviewItem.vue';
import Blockquote from '~/components/elements/Blockquote.vue';
import GuidingPrincipals from '../components/GuidingPrincipals.vue';
import Leadership from '~/components/Leadership.vue';
import PortfolioHome from '~/components/PortfolioHome.vue';

import overviewData from '~/data/overview-items.json';

const overviewItems = overviewData;

onMounted(() => {
 $gsap.utils.toArray('.overview-item').forEach(item => {
    $gsap.from(item, {
      y: -100,
      opacity: 0.3,
      duration: 5,
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true,
      },
    });
  });

  $gsap.utils.toArray('.word-split').forEach(item => {
    const ourText = new splitType(item, { types: 'words' });
    const words = ourText.words;

    $gsap.from(words, { 
      x: 30,
      opacity: 0,
      stagger: 0.4,
      duration: 2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: words,
        start: 'top 90%',
        end: 'bottom 60%',
        scrub: true,
      },
    });
  });


  $gsap.fromTo(
    '.overview-heading',
    { x: -400 },
    {
      x: 600,
      scrollTrigger: {
        trigger: '.overview-heading',
        start: 'top bottom',
        end: '+=3000',
        scrub: true,
      },
    }
  );
});
</script>


<style lang="scss" scoped>
.overview{
  background: rgb(var(--color-dark));
  padding: 186px 0 310px;
  text-align: center;
  color: rgb(var(--color-white));
  position: relative;
  @include respond-to(sm){
    padding: 88px 0 160px;
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
  color: rgba(var(--color-light-gray),0.05);
  bottom: 100px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  @include respond-to(sm){
    @include fsz(130px);
    letter-spacing: 6.5px;
    bottom: 20px;
  }
}
</style>