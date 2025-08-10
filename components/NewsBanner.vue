<template>
  <div class="col-lg-10 d-flex align-items-center justify-content-between logo-wrapper"
        :class="{'flex-column flex-row-md': isColumnOnMobile}"
        :style="{'gap': isColumnOnMobile ? '2rem' : '0'}"
  >
    <div class="news-logo left">
      <img src="/images/logo-text-gold.svg" alt="Sheba Gold Capital" />
    </div>
    <div class="news-logo-divider">
      <img src="/images/logo-divider.svg" alt="" />
    </div>
    <div class="news-logo right">
      <img src="/images/dominion-logo.svg" alt="Dominion" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useScrollTrigger } from '~/composables/useScrollTrigger'

const { initializeScrollTriggers } = useScrollTrigger()

const props = defineProps({
  isColumnOnMobile: {
    type: Boolean,
    default: false,
  },
});

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
    
    tl.from('.news-logo.left img', {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      }, 0)
      .to('.news-logo.left img', {
        scale: 1.3,
        filter: 'brightness(2.5)',
        duration: 0.3,
        ease: 'power2.out',
      }, 0.15)
      .to('.news-logo.left img', {
        scale: 1,
        filter: 'brightness(1)',
        duration: 0.4,
        ease: 'power2.out',
      }, 0.3)
      .fromTo('.news-logo.left img',
        { [useVerticalAnimation ? 'y' : 'x']: useVerticalAnimation ? -60 : -60 },
        {
          [useVerticalAnimation ? 'y' : 'x']: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        }, 0.4)
      .from('.news-logo.right img', {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      }, 0)
      .to('.news-logo.right img', {
        scale: 1.3,
        filter: 'brightness(2.5)',
        duration: 0.3,
        ease: 'power2.out',
      }, 0.15)
      .to('.news-logo.right img', {
        scale: 1,
        filter: 'brightness(1)',
        duration: 0.4,
        ease: 'power2.out',
      }, 0.3)
      .fromTo('.news-logo.right img',
        { [useVerticalAnimation ? 'y' : 'x']: useVerticalAnimation ? 60 : 60 },
        {
          [useVerticalAnimation ? 'y' : 'x']: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        }, 0.4)
      .from('.news-logo-divider img', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, 0.5)
  })
})
</script>

<style lang="scss" scoped>
.news-logo {
  pointer-events: none;
  user-select: none;
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
  user-select: none;
  img {
    height: 84px;
    display: block;
    max-width: 100%;
    @include respond-to(sm) {
      height: 40px;
    }
  }
}
</style>