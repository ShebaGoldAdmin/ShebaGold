<template>
  <section class="pt-80 pb-80 pt-184-sm pb-144-sm position-relative">
    <div class="container container--sm">
      <h2 class="word-split mb-24 mb-72-sm">Leadership</h2>
      <div class="leader-sliding-heading" ref="slidingHeadingRef">Eli B.Abisror</div>
      <div class="row">
        <div class="col-3">
          <img class="leader-logo" src="public/images/logo-rounded.svg" alt="Sheba Gold Capital" /> 
        </div>
        <div class="col-sm-9">
          <h5 class="word-split">With 20 years of experience in the business and real estate worlds, 
            Eli Abisror is an experienced and multi-faceted professional.
          </h5>
        </div>
      </div>
      <div class="row justify-content-end">
        <div class="col-md-9">
          <div class="row mt-80 mt-184-sm">
            <div class="col-sm-5 pr-32-md">
              <div class="leadership-img">
                <TeamImage src="/images/team/eli-abisror.png"/>
              </div>
            </div>
            <div class="col-sm-7 pl-40-lg d-flex flex-column align-items-start">
              <p class="scalable">Based in Tinton Falls, he has expertly overseen the distribution of medical and dental supply products, leveraging his extensive knowledge in the medical export and import sectors. </p>
              <p class="scalable mb-40">He is currently CEO of ‘Mission Medical’ - founded in 2006, and has since concurrently launched multiple international healthcare supply companies - spanning 30 countries across six continents.</p>
              <NuxtLink to="/team/eli-b-abisror">
                <ArrowButton class="mt-auto from-right"
                  arrowRotate="-90"
                >
                  Find out more
                </ArrowButton>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import TeamImage from './elements/TeamImage.vue';
import { ref, onMounted} from 'vue';

const { $gsap } = useNuxtApp();

const slidingHeadingRef = ref(null);

onMounted(() => {
  const leaderImgWrap = document.querySelector('.team-img');
  const leaderImg = leaderImgWrap.querySelector('img') ;
  const leaderLogo = leaderImgWrap.querySelector('svg') ;

  let tl = $gsap.timeline({
    scrollTrigger: {
      trigger: leaderImgWrap,
      start: 'top bottom',
      toggleActions: "restart none none reset"
    }
  });

  tl.set(leaderImgWrap, { autoAlpha: 1 });
  tl.fromTo(
    leaderImgWrap, 3, 
    { xPercent: -100 },
    { xPercent: 0, delay: -3, ease: 'power4.out' }
  );
  tl.from(leaderImg, 3, {
    xPercent: 100,
    scale: 1.3,
    delay: -3,
    ease: 'power4.out',
  });
  tl.from(leaderLogo, 3, {
    xPercent: 100,
    delay: -3,
    ease: 'power4.out',
  });

  $gsap.fromTo(
    slidingHeadingRef.value,
    { x: -300 },
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
</script>

<style lang="scss" scoped>
.leader-sliding-heading{
  @include fsz(250px);
  letter-spacing: 12.5px;
  font-family: var(--font-heading);
  color: rgb(var(--color-light-gray));
  position: absolute;
  top: 490px;
  white-space: nowrap;
  @include respond-to(sm){
    @include fsz(130px);
    letter-spacing: 6.5px;
    top: 600px;
  }
}
.leadership-img{
  overflow: hidden;
  @include respond-to(sm){
    margin-left: 25%;
    margin-bottom: 122px;
  }
}
.leader-logo{
  margin: -24px 0 0 16px;
  @include respond-to(sm){
    margin: 0;
    position: absolute;
    z-index: 2;
    top: 144px;
    left: 3%;
    width: 120px;
  }
}
</style>