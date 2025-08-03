<template>
  <main id="home">
    <Splash scroll-link="#overview"/>
    <Overview id="overview"/>
    <GuidingPrinciples id="principles"/>
    <Leadership id="leadership"/>
    <SectionBackground>
      <div class="row">
        <div class="col-sm-9">
          <h2 class="mb-24">Our Portfolio</h2>
          <p class="lg scalable">Sheba Gold Capital is an esteemed investment firm specializing in the identification of lucrative real estate holdings nationwide, as well as businesses exhibiting significant growth potential.</p>
          <NuxtLink to="/portfolio">
            <ArrowButton class="mt-72 from-right"
              color="gold"
              arrowRotate="-90"
            />
          </NuxtLink>
        </div>
      </div>
    </SectionBackground>
  </main>
</template>

<script setup lang="js">
import { onMounted, onUnmounted } from 'vue';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Splash from '~/components/Splash.vue';
import GuidingPrinciples from '../components/GuidingPrinciples.vue';
import Leadership from '~/components/Leadership.vue';
import Overview from '~/components/Overview.vue';
import SectionBackground from '~/components/SectionBackground.vue';

const emit = defineEmits();

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
</script>
