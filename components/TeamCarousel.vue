<template>
  <div class="row">
    <div class="col-lg-8">
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
          <div class="col-10 col-sm-6">
            <div 
              class="team-carousel"
              @touchstart="onTouchStart"
              @touchmove="onTouchMove"
              @touchend="onTouchEnd"
            >
              <div 
                class="team-carousel__item"
                v-for="(member, index) in teamMembers" 
                :key="index"
                @click="handleCardClick(index)"
              >
                <TeamImage :src="member.image" />
                <div class="team-carousel__overlay"></div>
                <div v-show="index === activeMemberIndex" class="team-carousel__view-more">
                  <span>View More</span>
                </div>
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
        <div class="row justify-content-end">
          <div class="col-12 col-sm-6">
            <div class="d-flex align-items-center justify-content-center mt-40">
              <ArrowButton class="ml-8 mr-8"
                @click="prevMember" 
                arrowRotate="90"
              />
              <ArrowButton class="ml-8 mr-8"
                @click="nextMember"
                arrowRotate="-90"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import TeamImage from './elements/TeamImage.vue';
import teamData from '~/data/team.json';

const { $gsap } = useNuxtApp();
const router = useRouter();

const teamMembers = ref(teamData);
const activeMemberIndex = ref(0);

let teamItems = [];
const touchStartX = ref(0);
const touchEndX = ref(0);
const touchMoved = ref(false);
const swipeThreshold = 80;

const activeMember = computed(() => {
  return teamMembers.value[activeMemberIndex.value] || {};
});

const changeMember = (newIndex) => {
  const totalMembers = teamMembers.value.length;
  activeMemberIndex.value = (newIndex + totalMembers) % totalMembers;
  teamItems.forEach(item => item.classList.remove('is-active'));
  const currentItem = teamItems[activeMemberIndex.value];
  triggerAnimation();
  setTimeout(() => {
    currentItem.classList.add('is-active');
  }, 500);
};

const triggerAnimation = () => {
  teamItems.forEach((member, index) => {
    const relativeIndex = (index - activeMemberIndex.value + teamItems.length) % teamItems.length;
    const overlay = member.querySelector('.team-carousel__overlay');
    overlay.style.opacity = calculateOverlayOpacity(relativeIndex);
    $gsap.timeline()
      .set(member, { zIndex: teamItems.length - relativeIndex })
      .to(member, {
        scale: 1 - 0.2 * relativeIndex,
        xPercent: calculateXOffset(relativeIndex),
        duration: 0.5,
      });
  });
};

const calculateXOffset = (relativeIndex) => {
  const baseXOffset = 80;
  if (relativeIndex === 0) return 0;
  let offset = baseXOffset;
  for (let i = 2; i <= relativeIndex; i++) {
    offset += baseXOffset * (1 - (i - 1) * 0.2);
  }
  return offset;
};

const calculateOverlayOpacity = (relativeIndex) => {
  if (relativeIndex === 0) return 0;
  return 1 - 1 / Math.pow(2, relativeIndex);
};

const nextMember = () => {
  changeMember(activeMemberIndex.value + 1);
};

const prevMember = () => {
  changeMember(activeMemberIndex.value - 1);
};

const handleCardClick = (index) => {
  if (!touchMoved.value) {
    if (index === activeMemberIndex.value) {
      router.push(`/team/${teamMembers.value[index].slug}`);
    } else {
      changeMember(index);
    }
  }
};

const onTouchStart = (event) => {
  touchStartX.value = event.touches[0].clientX;
  touchMoved.value = false;
};

const onTouchMove = (event) => {
  const currentX = event.touches[0].clientX;
  const diffX = Math.abs(currentX - touchStartX.value);
  
  // If movement is significant, mark as moved
  if (diffX > 10) {
    touchMoved.value = true;
  }
  
  touchEndX.value = currentX;
};

const onTouchEnd = () => {
  if (touchMoved.value) {
    const swipeDistance = touchStartX.value - touchEndX.value;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        nextMember();
      } else {
        prevMember();
      }
    }
  }
  
  // Reset after processing
  touchMoved.value = false;
};

onMounted(() => {
  teamItems = document.querySelectorAll('.team-carousel__item');
  triggerAnimation();
  if (teamItems.length > 0) {
    teamItems[0].classList.add('is-active');
  }
});
</script>
<style lang="scss" scoped>
.team-carousel {
  position: relative;
  height: 0;
  padding-bottom: 122%;
  
  &__item {
    position: absolute;
    width: 100%;
    height: 100%;
    box-shadow: 60px 0 40px rgba(var(--color-white), 0.7);
    cursor: e-resize;
    -webkit-transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    overflow: hidden;
    &.is-active {
      cursor: pointer;
      &:hover{
        .team-carousel__view-more{
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  }

  &__item-data {
    padding: 40px 20px;
    text-align: center;
    p{
      max-height: 28px;
    }
  }

  &__overlay {
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

  &__view-more {
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    text-align: center;
    background-color: rgba(var(--color-white), 0.8);
    padding: 8px 16px;
    opacity: 0.3;
    transform: translateY(100%);
    transition: 300ms;
    z-index: 20;
    pointer-events: none;
    color: rgb(var(--color-navy-blue));
    border-top: 1px solid rgb(var(--color-navy-blue));
    font-family: var(--font-heading);
    @include fsz(32px);
  }
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