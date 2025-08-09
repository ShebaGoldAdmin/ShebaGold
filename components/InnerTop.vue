<template>
  <section class="inner-top pt-32 pb-32 pt-56-sm pb-88-sm">
    <div 
      v-if="member?.name || subheading"
      class="inner-top__sliding-heading"
      ref="slidingHeadingRef"
    >
      {{ member?.name || subheading }}
    </div>
    <div class="container">
      <NuxtLink to="/">
        <img class="inner-top__logo" src="/images/logo-text-gold.svg" alt="Sheba Gold Capital">
      </NuxtLink>
      <div class="mt-112 mt-160-sm" v-if="heading">
        <HelperText v-if="subheading" class="mb-16">{{ subheading }}</HelperText>
        <h1>{{ heading }}</h1>
      </div>
      <div class="row mt-80 mt-160-md" v-else>
        <div class="col-sm-7 col-md-6">
          <div class="inner-top__info">
            <h1 class="inner-top__name">{{ member.name }}</h1>
            <div class="inner-top__position mb-24">{{ member.position }}</div>
            <div class="inner-top__company">Sheba Gold Capital</div>
          </div>
        </div>
        <div class="col-sm-5 col-md-6">
          <div class="inner-top__image">
            <TeamImage :src="member.image" />
          </div>
        </div>
      </div>
    </div>
    <div class="inner-top__waves" ref="waves">
      <NuxtImg 
        format="avif"
        quality="90"
        src="/images/top-left-corner.png"
      />
    </div>
  </section>
</template>

<script setup>
import TeamImage from '~/components/elements/TeamImage.vue';
import { useScrollTrigger } from '~/composables/useScrollTrigger'

const props = defineProps({
  heading: {
    type: String,
    default: '',
  },
  subheading: {
    type: String,
    default: '',
  },
  member: {
    type: Object,
    default: () => {},
  },
});

const { initializeScrollTriggers } = useScrollTrigger()

const slidingHeadingRef = ref(null);

onMounted(async () => {
  await initializeScrollTriggers(($gsap) => {
    $gsap.fromTo(
      slidingHeadingRef.value,
      { x: -200 },
      {
        x: 500,
        scrollTrigger: {
          trigger: slidingHeadingRef.value,
          start: 'top bottom',
          end: '+=3000',
          scrub: true,
        },
      }
    );
  });
});
</script>

<style lang="scss" scoped>
.inner-top{
  background: rgb(var(--color-black));
  color: rgb(var(--color-white));
  position: relative;
  &__logo{
    @include respond-to(sm){
      width: 150px;
    }
  }
  &__waves{
    transform: scaleX(-1);
    position: absolute;
    right: 0;
    top: 0;
    max-width: 600px;
    width: 75%;
    opacity: 0.8;
    img{
      width: 100%;
    }
  }
  &__name{
    @include respond-to(lg){
      @include fsz(80px);
    }
  }
  &__position{
    @include fsz(40px);
    color: rgba(var(--color-white), 0.6);
    font-family: var(--font-heading);
    @include respond-to(sm){
      @include fsz(32px);
    }
  }
  &__company{
    display: inline-block;
    @include fsz(15px);
    line-height: 1.8;
    letter-spacing: 0.9px;
    font-weight: var(--weight-medium);
    text-transform: uppercase;
    padding: 2px 32px;
    background: linear-gradient(72deg, #8B6737 24.46%, #DEB36B 50.46%, #DFAC55 66.48%, #8B6737 82.69%);
  }
  &__image{
    margin-bottom: -228px;
    margin-top: -164px;
    position: relative;
    z-index: 2;
    @include respond-to(sm){
      margin-top: 64px;
      margin-bottom: -120px;
    }
  }
  &__sliding-heading{
    @include fsz(190px);
    letter-spacing: 9.5px;
    color: rgba(var(--color-light-gray),0.1);
    font-family: var(--font-heading);
    position: absolute;
    left: 0;
    bottom: -20px;
    line-height: 1;
    pointer-events: none;
    white-space: nowrap;
  }
}
</style>