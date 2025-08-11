<template>
  <section class="pt-80 pb-80 pt-184-sm pb-144-sm position-relative">
    <div class="container container--sm">
      <div class="team-sliding-heading" ref="slidingHeadingRef">Team</div>
      <h2 class="word-split mb-24 mb-72-sm">This is our team. Together, we rise.</h2>
      <div class="row">
        <div class="col-4">
          <img class="team-logo" src="public/images/logo-rounded.svg" alt="Sheba Gold Capital" /> 
        </div>
        <div class="col-sm-8">
          <h5 class="word-split mb-32">
          </h5>
          <p class="lg scalable">
            The Sheba Gold Capital team includes seasoned professionals with deep investment and operations experience across the healthcare and real estate landscapes.<br>
            Each member of the team brings excellence, passion and pride to their role.
          </p>
        </div>
      </div>
      <TeamCarousel class="mt-96"/>
    </div>
  </section>
</template>

<script setup>
import TeamCarousel from './TeamCarousel.vue';
import { ref, onMounted} from 'vue';
import { useScrollTrigger } from '~/composables/useScrollTrigger'

const { initializeScrollTriggers } = useScrollTrigger()

const slidingHeadingRef = ref(null);

onMounted(async () => {
  await initializeScrollTriggers(($gsap) => {
    $gsap.fromTo(
      slidingHeadingRef.value,
      { x: -100 },
      {
        x: 600,
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
.team-sliding-heading{
  @include fsz(348px);
  letter-spacing: 5%;
  font-family: var(--font-heading);
  color: rgb(var(--color-light-gray));
  position: absolute;
  bottom: 0;
  white-space: nowrap;
  @include respond-to(sm){
    @include fsz(130px);
    letter-spacing: 6.5px;
  }
}
.team-logo{
  margin: -24px 0 0 16px;
  width: 148px;
  @include respond-to(sm){
    margin: 0;
    position: absolute;
    z-index: 2;
    top: -100px;
    right: 0;
    width: 120px;
  }
}
</style>