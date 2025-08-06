<template>
  <section class="overview">
    <div class="overview-heading">
      <div class="overview-heading__top">
        <div class="content">Legacy Rises</div>
      </div>
      <div class="overview-heading__bottom">
        <div class="content">Culture</div>
      </div>
    </div>
    <div class="container container--sm">
      <img class="mb-32" src="public/images/logo-single.svg" alt="Sheba Gold Capital" /> 
      <h2 class="word-split mb-24 mb-64-sm">Where Legacy Meets Vision</h2>
      <p class="lg scalable">Sheba Gold Capital is an esteemed investment firm that identifies and supports family-owned healthcare businesses in reaching their full growth potential.</p>
      <p class="lg scalable">We are not your typical private equity firm. At Sheba Gold Capital, we appreciate the history of the businesses we invest in, the talent of their people, and the relationships that have been built with customers. Our focus is to bring new energy, investment and vision to previously untapped opportunities, building upon proven businesses and accelerating momentum for the long-term.</p>
      <p class="lg scalable">Sheba Gold Capital is an esteemed investment firm that identifies and supports family-owned healthcare businesses in reaching their full growth potential.</p>
    </div>
    <div class="overview-items">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10 text-center">
            <h4 class="word-split mb-40">This is who we are and how we operate - with integrity, collaboration, accountability and adaptability. It’s by standing on these pillars that Sheba Gold Capital has built success.</h4>
          </div>
        </div>
        <OverviewItem 
          v-for="item in overviewItems" 
          :key="item.id" 
          :item="item"
        />
        <Blockquote>Sheba Gold Capital was born from a desire to invest in healthcare businesses we believe in so they can achieve their full potential – ultimately, ensuring healthcare providers have access to the resources they need for the benefit of the broader world.</Blockquote>
        <hr>
      </div>
    </div>
  </section>
</template>

<script setup lang="js">
import { onMounted, onUnmounted } from 'vue';
const { $gsap } = useNuxtApp();
import ScrollTrigger from 'gsap/ScrollTrigger';

import OverviewItem from '~/components/OverviewItem.vue';
import Blockquote from '~/components/elements/Blockquote.vue';

import overviewData from '~/data/overview-items.json';
const overviewItems = overviewData;

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

  $gsap.fromTo('.overview-heading__top .content', 
    { y: -300, opacity: 1 },
    {
      scrollTrigger: {
        trigger: '.overview',
        start: 'top 90%',
        end: 'top -20%',
        scrub: true,
      },
      keyframes: [
        { y: 0, opacity: 1, duration: 0.4 },
        { y: -20, opacity: 0.05, duration: 0.2 }
      ]
    }
  );

  $gsap.to('.overview', {
    backgroundColor: 'rgb(255,255,255)',
    scrollTrigger: {
      trigger: '.overview-items',
      start: 'top 60%',
      end: 'top top',
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

  $gsap.fromTo('.overview-heading__bottom .content',
    { opacity: 0 },
    {
      scrollTrigger: {
        trigger: '.overview-items',
        start: 'top 45%',
        end: 'top top',
        scrub: true,
      },
      keyframes: [
        { opacity: 1, duration: 0.2 },
        { opacity: 1, duration: 0.3 },
        { opacity: 0.05, duration: 0.5 }
      ]
    }
  );

  ScrollTrigger.create({
    trigger: '.overview-items',
    start: 'top 60%',
    end: 'top 60%',
    onEnter: () => {
      $gsap.set('.overview-heading__top', { opacity: 0 });
      $gsap.set('.overview-heading__bottom', { opacity: 1 });
    },
    onLeaveBack: () => {
      $gsap.set('.overview-heading__top', { opacity: 1 });
      $gsap.set('.overview-heading__bottom', { opacity: 0 });
    }
  });

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());
  });
});
</script>

<style lang="scss" scoped>
.overview {
  background: rgb(var(--color-dark));
  padding: 520px 0 310px;
  text-align: center;
  color: rgb(var(--color-white));
  position: relative;
  @include respond-to(sm) {
    padding: 360px 0 160px;
  }
  p {
    opacity: 0.6;
    max-width: 926px;
    margin: 0 auto;
    + p {
      margin-top: 16px;
    }
  }
}

.overview-heading {
  font-family: var(--font-heading);
  font-size: min(19.7vw, 300px);
  white-space: nowrap;
  letter-spacing: 5%;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  line-height: 0;
  &__top,
  &__bottom {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  &__top {
    opacity: 1;
  }
  &__bottom {
    opacity: 0;
    color: rgb(var(--color-dark));
  }
}

.overview-items {
  padding-top: 440px;
  color: rgb(var(--color-navy-blue));
}
</style>