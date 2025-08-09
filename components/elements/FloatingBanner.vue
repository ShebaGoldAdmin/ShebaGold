<template>
  <div class="floating-banner-wrapper">
    <div class="floating-banner" ref="banner">
      <RouterLink to="/news">
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
import { onMounted, ref } from "vue";
import { useScrollTrigger } from '~/composables/useScrollTrigger'

const { initializeScrollTriggers } = useScrollTrigger()
const banner = ref(null);

onMounted(async () => {
  await initializeScrollTriggers(($gsap) => {
    const bannerHeight = banner.value.offsetHeight;

    $gsap.fromTo(
      banner.value,
      { y: -bannerHeight },
      {
        y: 16,
        ease: "power2.out",
        scrollTrigger: {
          trigger: banner.value.parentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onLeaveBack: () => {
            $gsap.to(banner.value, { y: -bannerHeight, duration: 0.3 });
          },
        },
      }
    );
  });
});
</script>

<style lang="scss" scoped>
.floating-banner-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 0 16px;
  @include respond-to(lg){
    justify-content: flex-start;
  }
}

.floating-banner {
  position: fixed;
  top: 0;
  transform: translateY(-100%);
  background: linear-gradient(
    82.32deg,
    #eacea9 9.24%,
    #d7a25b 46.1%,
    #fdeed5 67.08%,
    #cda36c 99.7%
  );
  background-size: 150% auto;
  background-position: 100% 0;
  color: var(--color-black);
  font-weight: var(--weight-medium);
  z-index: 8;
  transition: 300ms transform, 600ms background-position;
  border-radius: 2px;
  &:hover{
    background-position: 0 0;
  }
  a{
    padding: 8px 16px;
    display: flex;
    align-items: center;
  }
  p{
    line-height: 1.1;
    @include respond-to(lg){
      @include fsz(18px);
    }
  }
  button{
    background: rgb(var(--color-navy-blue));
    width: 56px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 16px;
  }
}
</style>


