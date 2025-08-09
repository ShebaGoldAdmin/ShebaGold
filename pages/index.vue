<template>
  <main id="home">
    <Splash/>
    <FloatingBanner class="d-none d-flex-md"/>
    <Overview id="overview"/>
    <GuidingPrinciples id="principles"/>
    <Team id="team"/>
    <NewsHome/>
  </main>
</template>

<script setup lang="js">
import { onMounted, onUnmounted } from 'vue';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Splash from '~/components/Splash.vue';
import FloatingBanner from '~/components/elements/FloatingBanner.vue';
import GuidingPrinciples from '../components/GuidingPrinciples.vue';
import Team from '~/components/Team.vue';
import NewsHome from '~/components/NewsHome.vue';
import Overview from '~/components/Overview.vue';

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
