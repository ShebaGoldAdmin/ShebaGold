<template>
  <Head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;400;500&display=swap" rel="stylesheet">
  </Head>
  
  <transition
    name="page"
    mode="out-in"
    @before-enter="beforePageEnter"
    @after-enter="afterPageEnter"
  >
    <div :key="$route.fullPath" class="page-wrapper">
      <Header :buttonHidden="headerHidden"/>
      <NuxtPage @update:headerHidden="updateHeaderHidden"/>
      <Footer />
    </div>
  </transition>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { useRoute } from '#app'
import { useNuxtApp } from '#app'
import splitType from 'split-type'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Sheba Gold Capital` : 'Sheba Gold Capital';
  }
});

const { $gsap } = useNuxtApp()
const route = useRoute()
const headerHidden = ref(false)

const anim = {
  scale: { y: 20, scale: 0.8, opacity: 0, duration: 1,},
  right: { x: 60, opacity: 0, duration: 1 },
  bottom: { y: 60, opacity: 0, duration: 1, stagger: 0.15 },
  word: { x: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power4.out' },
  trigger: { start: 'top 100%', toggleActions: 'play pause resume reverse' },
  wordTrigger: { start: 'top 80%', toggleActions: 'play pause resume reverse' }
}

watch(
  () => route.fullPath,
  (newPath) => {
    if (newPath === '/') {
      headerHidden.value = true
    } else {
      headerHidden.value = false
    }
  },
  { immediate: true }
)

const updateHeaderHidden = (value) => {
  headerHidden.value = value
}

function initializeAnimations() {
  $gsap.utils.toArray('.scalable').forEach(item => 
    $gsap.from(item, {
      ...anim.scale,
      scrollTrigger: { trigger: item, ...anim.trigger }
    })
  )

  $gsap.utils.toArray('.from-right').forEach(item => 
    $gsap.from(item, {
      ...anim.right,
      scrollTrigger: { trigger: item, ...anim.trigger }
    })
  )

  $gsap.utils.toArray('.from-bottom').forEach(item => 
    $gsap.from(item, {
      ...anim.bottom,
      scrollTrigger: { trigger: item, ...anim.trigger }
    })
  )

  $gsap.utils.toArray('.word-split').forEach(item => {
    splitType.revert(item)
    const words = new splitType(item, { types: 'words' }).words
    $gsap.from(words, {
      ...anim.word,
      scrollTrigger: { trigger: item, ...anim.wordTrigger }
    })
  })
}

function beforePageEnter() {
  if ($gsap.core?.globals) {
    const { ScrollTrigger } = $gsap.core.globals()
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    ScrollTrigger.refresh()
  }
}

function afterPageEnter() {
  initializeAnimations()
  document.querySelector('.page-wrapper > main').style.opacity = 1
}

onMounted(() => {
  initializeAnimations()
  document.querySelector('.page-wrapper > main').style.opacity = 1
})
</script>

<style>
.page-wrapper > main {
  opacity: 0;
  transition: 600ms;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.6s;
}

.page-enter-from {
  opacity: 0;
}

.page-leave-to {
  opacity: 0;
}
</style>
