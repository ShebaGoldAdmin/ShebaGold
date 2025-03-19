<template>
  <main id="home">
    <Splash/>
    <Overview id="overview"/>
    <GuidingPrincipals id="principals"/>
    <Leadership id="leadership"/>
    <PortfolioHome/>
  </main>
</template>

<script setup lang="js">
import { onMounted, onUnmounted } from 'vue';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Splash from '~/components/Splash.vue';
import GuidingPrincipals from '../components/GuidingPrincipals.vue';
import Leadership from '~/components/Leadership.vue';
import PortfolioHome from '~/components/PortfolioHome.vue';
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
