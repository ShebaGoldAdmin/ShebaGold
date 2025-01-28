<template>
  <main>
    <InnerTop heading="Team"/>
    <section class="pt-112 pt-152-sm pb-80 pb-192-sm">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <HelperText class="mb-24">Meet Our Team</HelperText>
            <h2 class="mb-64 mb-80-sm word-split">With 20 years of experience in the business and real estate worlds.</h2>
            <div class="team-section">
              <div class="row scalable">
                <div class="col-sm-6 pr-120-md d-none d-block-sm">
                  <transition name="transition-slide-y" mode="out-in">
                    <div v-if="activeMember && activeMember.description.length > 0" 
                      :key="activeMember"
                    >
                      <p class="mt-24">{{ activeMember.description[0] }}</p>
                    </div>
                  </transition>
                </div>
                <div class="col-sm-6">
                  <div 
                    class="team-carousel"
                    @touchstart="onTouchStart"
                    @touchmove="onTouchMove"
                    @touchend="onTouchEnd"
                  >
                    <div 
                      class="team-carousel__item"
                      :class="{ 'disabled-link': (index !== activeMemberIndex) }"
                      v-for="(member, index) in teamMembers" 
                      :key="index"
                    >
                      <NuxtLink :to="'/team/' + member.slug">
                        <TeamImage :src="member.image" />
                        <div class="team-carousel__overlay"></div>
                      </NuxtLink>
                    </div>
                  </div>
                  <transition name="transition-slide-y" mode="out-in">
                    <div v-if="activeMember && activeMember.description.length > 0"
                      class="team-carousel__item-data"
                      :key="activeMember"
                    >
                      <h3>{{ activeMember.name }}</h3>
                      <p>{{ activeMember.position }}</p>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import teamData from '~/data/team.json';

import InnerTop from '~/components/InnerTop.vue';
import TeamImage from '~/components/elements/TeamImage.vue';

const teamMembers = ref(teamData);
const activeMemberIndex = ref(0);
const touchStartX = ref(0);
const touchEndX = ref(0);

useHead({
 title: 'Team',
});

const activeMember = computed(() => teamMembers.value[activeMemberIndex.value]);

const { $gsap } = useNuxtApp();

const triggerAnimation = () => {
 const teamItems = document.querySelectorAll('.team-carousel__item');

 const baseScale = 1;
 const scaleDecrement = 0.2;
 const baseXOffset = 80;

 const calculateXOffset = (relativeIndex) => {
   if (relativeIndex === 0) return 0;
   let offset = baseXOffset;
   for (let i = 2; i <= relativeIndex; i++) {
     offset += baseXOffset * (1 - (i - 1) * scaleDecrement);
   }
   return offset;
 };

 const calculateOverlayOpacity = (relativeIndex) => {
   if (relativeIndex === 0) return 0;
   return 1 - 1 / Math.pow(2, relativeIndex);
 };

 teamItems.forEach((member, index) => {
   const relativeIndex = (index - activeMemberIndex.value + teamItems.length) % teamItems.length;
   const overlay = member.querySelector('.team-carousel__overlay');

   overlay.style.opacity = calculateOverlayOpacity(relativeIndex);

   $gsap.timeline().set(member, { zIndex: teamItems.length - relativeIndex })
     .to(member, {
       scale: baseScale - scaleDecrement * relativeIndex,
       xPercent: calculateXOffset(relativeIndex),
       duration: 0.5,
     });
 });
};

const nextMember = () => {
 const totalMembers = teamMembers.value.length;
 activeMemberIndex.value = (activeMemberIndex.value + 1) % totalMembers;
 triggerAnimation();
};

const prevMember = () => {
 const totalMembers = teamMembers.value.length;
 activeMemberIndex.value = (activeMemberIndex.value - 1 + totalMembers) % totalMembers;
 triggerAnimation();
};

const onTouchStart = (event) => {
 touchStartX.value = event.touches[0].clientX;
};

const onTouchMove = (event) => {
 touchEndX.value = event.touches[0].clientX;
};

const onTouchEnd = () => {
 const swipeDistance = touchStartX.value - touchEndX.value;
 const swipeThreshold = 50;

 if (swipeDistance > swipeThreshold) {
   nextMember();
 } else if (swipeDistance < -swipeThreshold) {
   prevMember();
 }
};

const triggerScrollAnimation = () => {
 const teamSection = document.querySelector('.team-section');
 const teamItems = document.querySelectorAll('.team-carousel__item');

 $gsap.timeline({
   scrollTrigger: {
     trigger: teamSection,
     start: 'top 5%',
     end: `+=${teamItems.length * window.innerHeight}`,
     pin: true,
     scrub: 0.6,
     onUpdate: (self) => {
       const currentIndex = Math.min(
         teamItems.length - 1, 
         Math.floor(self.progress * teamItems.length)
       );
       activeMemberIndex.value = currentIndex;
       triggerAnimation();
     },
   },
 });
};

const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

onMounted(() => {
 triggerAnimation();
 if (!isTouchDevice()) {
   triggerScrollAnimation();
 }
});
</script>


<style lang="scss" scoped>
.team-carousel{
  position: relative;
  height: 0;
  padding-bottom: 122%;
  &__item{
    position: absolute;
    width: 100%;
    height: 100%;
    filter: drop-shadow(60px 0 20px rgba(var(--color-white), 0.7));
  }
  &__item-data{
    padding: 40px 20px;
    text-align: center;
  }
  &__overlay{
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(var(--color-white));
    opacity: 0;
    pointer-events: none;
  }
}

.disabled-link {
  pointer-events: none;
  cursor: default;
}

.transition-slide-y-enter-active,
.transition-slide-y-leave-active {
  transition: all 0.5s ease;
}

.transition-slide-y-enter-from,
.transition-slide-y-leave-to {
  opacity: 0;
}

.transition-slide-y-leave-to {
  transform: translateY(20px);
}

.transition-slide-y-enter-from {
  transform: translateY(20px);
}
</style>
