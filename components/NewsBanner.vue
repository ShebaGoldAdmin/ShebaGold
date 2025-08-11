<template>
  <div class="col-lg-10 d-flex align-items-center justify-content-between logo-wrapper"
    :class="{'flex-column flex-row-md': isColumnOnMobile}"
    :style="{'gap': isColumnOnMobile ? '2rem' : '0'}"
  >
    <div class="click-overlay" @click="handleLogoClick" v-if="!isColumnLayout"></div>

    <div class="news-logo left">
      <img src="/images/logo-text-gold.svg" alt="Sheba Gold Capital" />
    </div>
    <div class="news-logo-divider">
      <img src="/images/logo-divider.svg" alt="" />
    </div>
    <div class="news-logo right">
      <img src="/images/dominion-logo.svg" alt="Dominion" />
    </div>

    <div class="hearts-container">
      <HeartSvg
        :size="heartSize"
        class="heart" 
        v-for="n in HEART_COUNT"
        :key="n"
      />
    </div>
  </div>
</template>

<script setup>
import HeartSvg from '~/components/elements/HeartSvg.vue';
import { ref, computed, onMounted } from 'vue'
import { useScrollTrigger } from '~/composables/useScrollTrigger'

const { initializeScrollTriggers } = useScrollTrigger()
const { $gsap } = useNuxtApp()
const isAnimating = ref(false)

const props = defineProps({
  isColumnOnMobile: { type: Boolean, default: false },
  heartSize: { type: Number, default: 40 }
})

const isColumnLayout = computed(() => {
  if (typeof window === 'undefined') return false
  const isMobile = window.innerWidth < 992
  return isMobile && props.isColumnOnMobile
})

const HEART_COUNT = 6
const HEARTS = {
  startAt: 1.08,
  duration: 1.6,
  stagger: 0.22,
  fadeInRatio: 0.18
}

const handleLogoClick = () => {
  if (isAnimating.value || isColumnLayout.value) return
  isAnimating.value = true

  // Reset hearts to initial state before each run
  $gsap.set('.heart', { opacity: 0, x: 0, y: 0, scale: 0.5 })
  $gsap.set('.hearts-container', { opacity: 0 })

  const tl = $gsap.timeline({
    onComplete: () => { isAnimating.value = false }
  })

  // Logo animation
  tl.to('.news-logo-divider', { opacity: 0, duration: 0.4, ease: 'power2.out' })
    .to('.news-logo.left img',  { x: "24%", duration: 0.8, ease: 'power2.inOut' }, 0.2)
    .to('.news-logo.right img', { x: "-24%", duration: 0.8, ease: 'power2.inOut' }, 0.2)
    .to('.news-logo.left img',  { x: "27%", duration: 0.08 }, 1.0)
    .to('.news-logo.right img', { x: "-27%", duration: 0.08 }, 1.0)
    .to('.news-logo.left img',  { x: "24%", duration: 0.08 }, 1.08)
    .to('.news-logo.right img', { x: "-24%", duration: 0.08 }, 1.08)
    .to('.news-logo.left img',  { x: "27%", duration: 0.06 }, 1.15)
    .to('.news-logo.right img', { x: "-27%", duration: 0.06 }, 1.15)
    .to('.news-logo.left img',  { x: "24%", duration: 0.08 }, 1.21)
    .to('.news-logo.right img', { x: "-24%", duration: 0.08 }, 1.21)

  // Hearts animation
  const fadeInDur = HEARTS.duration * HEARTS.fadeInRatio
  const fadeOutDur = HEARTS.duration - fadeInDur

  tl.set('.hearts-container', { opacity: 1 }, HEARTS.startAt)

  // Movement
  tl.to('.heart', {
    y: -260,
    x: () => (Math.random() - 0.5) * 140,
    scale: () => 0.8 + Math.random() * 0.3,
    duration: HEARTS.duration,
    ease: 'power1.inOut',
    stagger: HEARTS.stagger
  }, HEARTS.startAt)

  // Fade in
  tl.to('.heart', {
    opacity: 0.9,
    duration: fadeInDur,
    ease: 'power1.out',
    stagger: HEARTS.stagger
  }, HEARTS.startAt)

  // Fade out
  tl.to('.heart', {
    opacity: 0,
    duration: fadeOutDur,
    ease: 'power1.in',
    stagger: HEARTS.stagger
  }, HEARTS.startAt + fadeInDur)

  // Hide container after last heart
  const lastHeartOffset = HEARTS.startAt + HEARTS.duration + HEARTS.stagger * (HEART_COUNT - 1)
  tl.set('.hearts-container', { opacity: 0 }, lastHeartOffset + 0.05)

  // Reset logos
  tl.to('.news-logo.left img', { x: 0, duration: 0.7, ease: 'power2.inOut' }, 2.0)
    .to('.news-logo.right img', { x: 0, duration: 0.7, ease: 'power2.inOut' }, 2.0)
    .to('.news-logo-divider', { opacity: 1, duration: 0.5, ease: 'power2.out' }, 2.6)
}

onMounted(async () => {
  await initializeScrollTriggers(($gsap) => {
    const isMobile = window.innerWidth < 992
    const useVerticalAnimation = isMobile && props.isColumnOnMobile
    const tl = $gsap.timeline({
      scrollTrigger: {
        trigger: '.logo-wrapper',
        start: 'top 70%',
        end: 'top -50%',
        toggleActions: "play none none reverse",
      },
    })

    tl.from('.news-logo.left img', { opacity: 0, duration: 0.3 })
      .to('.news-logo.left img', { scale: 1.3, filter: 'brightness(2.5)', duration: 0.3 }, 0.15)
      .to('.news-logo.left img', { scale: 1, filter: 'brightness(1)', duration: 0.4 }, 0.3)
      .fromTo('.news-logo.left img',
        { [useVerticalAnimation ? 'y' : 'x']: -60 },
        { [useVerticalAnimation ? 'y' : 'x']: 0, duration: 1.2 },
        0.4)
      .from('.news-logo.right img', { opacity: 0, duration: 0.3 }, 0)
      .to('.news-logo.right img', { scale: 1.3, filter: 'brightness(2.5)', duration: 0.3 }, 0.15)
      .to('.news-logo.right img', { scale: 1, filter: 'brightness(1)', duration: 0.4 }, 0.3)
      .fromTo('.news-logo.right img',
        { [useVerticalAnimation ? 'y' : 'x']: 60 },
        { [useVerticalAnimation ? 'y' : 'x']: 0, duration: 1.2 },
        0.4)
      .from('.news-logo-divider img', { opacity: 0, duration: 0.8 }, 0.5)
  })
})
</script>

<style lang="scss" scoped>
.logo-wrapper {
  position: relative;
}

.click-overlay {
  position: absolute;
  top: 0; 
  left: 0;
  width: 100%; 
  height: 100%;
  z-index: 5;
  cursor: pointer;
  user-select: none;
}

.news-logo {
  pointer-events: none;
  img {
    height: 224px;
    display: block;
    max-width: 100%;
    @include respond-to(lg) {
      height: 190px;
    }
    @include respond-to(sm) {
      height: 160px;
    }
  }
  &.right{
    img{
      height: 170px;
      @include respond-to(lg) {
        height: 130px;
      }
      @include respond-to(sm) {
        height: 110px;
      }
    }
  }
}

.news-logo-divider {
  pointer-events: none;
  margin: 0 8px;
  img {
    height: 84px;
    display: block;
    max-width: 100%;
    @include respond-to(sm) {
      height: 40px;
    }
  }
}

.hearts-container {
  position: absolute;
  top: 10%; 
  left: 46%;
  transform: translate(-50%, -50%);
  opacity: 0;
  pointer-events: none;
  z-index: 10;
  width: 200px; 
  height: 200px;

  .heart {
    position: absolute;
    left: 50%; 
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    pointer-events: none;
  }
}
</style>
