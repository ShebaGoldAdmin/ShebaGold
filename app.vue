<template>
  <Head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400..500&display=swap" rel="stylesheet">
  </Head>
  <main>
    <NuxtPage />
  </main>
  <Footer />
</template>

<script setup>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';

import { onMounted } from 'vue';
const { $gsap } = useNuxtApp();

onMounted(() => {
 $gsap.utils.toArray('p').forEach(item => {
    $gsap.from(item, {
      y: 20,
      scale: 0.8,
      opacity: 0,
      duration: 5,
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true,
      },
    });
  });
});
</script>
