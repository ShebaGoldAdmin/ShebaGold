<template>
  <div class="floating-banner-wrapper">
    <div
      class="floating-banner"
      ref="banner"
    >
      <div class="mobile-bell-container" @click="toggleMobileBanner">
        <BellSvg />
      </div>
      
      <RouterLink to="/news" 
        class="banner-content"
        :class="{ 'mobile-show': showMobileBanner }"
      >
        <p class="lg">Sheba Gold Capital Signs Agreement to Acquire Dominion P&HS Division</p>
        <button>
          <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5.08508L18.2766 5.08508" stroke="white" stroke-width="1.5" stroke-miterlimit="10"/>
            <path d="M12.9149 1L18.2766 5.08511L12.9149 9.17021" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="square"/>
          </svg>
        </button>
      </RouterLink>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { useScrollTrigger } from '~/composables/useScrollTrigger'
import BellSvg from '~/components/elements/BellSvg.vue';

const { initializeScrollTriggers } = useScrollTrigger()
const banner = ref(null);
const showMobileBanner = ref(false);

const toggleMobileBanner = () => {
  showMobileBanner.value = !showMobileBanner.value;
};

const closeMobileBanner = () => {
  showMobileBanner.value = false;
};

const handleClickOutside = (event) => {
  if (banner.value && !banner.value.contains(event.target) &&
      !event.target.closest('.mobile-bell-container')) {
    closeMobileBanner();
  }
};

onMounted(async () => {
  document.addEventListener('click', handleClickOutside);
  
  await initializeScrollTriggers(($gsap) => {
    $gsap.fromTo(
      banner.value,
      { y: -32,
        opacity: 0,
        pointerEvents: 'none'
      },
      {
        y: 32,
        opacity: 1,
        pointerEvents: 'auto',
        ease: "power2.out",
        scrollTrigger: {
          trigger: banner.value.parentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onLeaveBack: () => {
            $gsap.to(banner.value, { y: -32, duration: 0.3, pointerEvents: 'none', opacity: 0 });
          },
        },
      }
    );
  });
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
<style lang="scss" scoped>
.floating-banner-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 0 16px;
  
  @include respond-to(lg) {
    justify-content: flex-start;
  }
}

.floating-banner {
  position: fixed;
  top: -16px;
  transform: translateY(-100%);
  color: var(--color-black);
  font-weight: var(--weight-medium);
  z-index: 8;
  transition: 300ms;
  display: flex;
  align-items: center;
  
  &:hover {
    background-position: 0 0;
  }

  @include respond-to(md) {
    opacity: 0;
    transition: 300ms;
    top: 0;
    left: 16px;
    right: 16px;
    flex-direction: column;
    align-items: flex-start;
  }
}

.mobile-bell-container {
  cursor: pointer;
  display: none;
  @include respond-to(md) {
    display: block;
    margin-bottom: 16px;
  }
}

.banner-content {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background: linear-gradient(
    82.32deg,
    #eacea9 9.24%,
    #d7a25b 46.1%,
    #fdeed5 67.08%,
    #cda36c 99.7%
  );
  background-size: 150% auto;
  background-position: 100% 0;
  transition: 600ms background-position, 300ms opacity, 300ms transform;
  border-radius: 2px;
  @include respond-to(md) {
    opacity: 0;
    pointer-events: none;
    transform: translateY(10px);
    &.mobile-show {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }
  }

  p{
    line-height: 1.2;
    @include respond-to(lg){
      @include fsz(18px);
    }
  }
  
  button {
    background: rgb(var(--color-navy-blue));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 48px;
    height: 24px;
    margin-left: 12px;
  }
}
</style>