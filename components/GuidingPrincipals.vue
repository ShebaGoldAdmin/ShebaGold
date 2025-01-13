<template>
  <section class="guiding-principals">
    <div class="guiding-principals__top-waves" ref="waves">
      <NuxtImg 
        format="avif"
        quality="90"
        src="/images/top-left-corner.png"
      />
    </div>
    <div class="container">
      <h2 class="word-split mb-88 text-center">Guiding Principals</h2>
      <div class="guiding-wrapper">
        <!-- Main Tabs -->
        <div class="guiding-tabs">
          <ul class="row" ref="tabsList">
            <li
              class="col-4"
              :class="{ 'is-active': tabsStore.mode === tab.name }"
              v-for="(tab, index) in tabsStore.tabs"
              :key="index"
            >
              <button @click="setMode(tab)">
                {{ tab.name }}
              </button>
            </li>
          </ul>
          <div class="guiding-tabs__slider" ref="sliderRef"></div>
        </div>

        <!-- Content Section -->
        <div class="guiding-content">
          <transition name="transition-slide-x" mode="out-in">
            <div class="w-100" :key="tabsStore.currentMode.name">
              <div v-if="tabsStore.currentMode?.subtabs" class="guiding-content__inner">
                <div class="row align-items-center">
                  <div class="col-sm-5">
                    <ul class="guiding-content__subtabs">
                      <li
                        v-for="(sub, index) in tabsStore.currentMode.subtabs"
                        :key="index"
                        :class="{ 'is-active': tabsStore.submode === sub.name || (tabsStore.submode === null && index === 0) }"
                      >
                        <button @click="setSubmode(sub)">
                          {{ sub.name }}
                        </button>
                      </li>
                    </ul>
                  </div>
                  
                  <div class="col-sm-7">
                    <transition name="transition-slide-x" mode="out-in">
                      <div v-if="tabsStore.currentSubmode" 
                        class="guiding-content__subtab-content" 
                        :key="tabsStore.currentSubmode.name"
                      >
                        <h3 class="mb-24">{{ tabsStore.currentSubmode.name }}</h3>
                        <p>{{ tabsStore.currentSubmode.text }}</p>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>

              <!-- No Subtabs -->
              <div v-else class="guiding-content__inner">
                <div class="guiding-content__inner-text">
                  <h3 class="mb-24">{{ tabsStore.currentMode.name }}</h3>
                  <p>{{ tabsStore.currentMode.text }}</p>
                </div>
              </div>
            </div>
          </transition>
          
          <div class="guiding-content__sliding-heading" ref="slidingHeadingRef">
            <transition name="transition-fade" mode="out-in">
              <div :key="tabsStore.currentMode.name">
                {{ tabsStore.currentMode.name }}
              </div>
            </transition>
          </div>
            
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTabsStore } from '~/store/guiding-tabs';
import { ref, onMounted, watch} from 'vue';

const { $gsap } = useNuxtApp();
const tabsStore = useTabsStore();
const activeIndex = ref(0);
const tabsList = ref(null);
const sliderRef = ref(null);
const slidingHeadingRef = ref(null);
const waves = ref(null);

const setMode = (selectedTab) => {
  tabsStore.setMode(selectedTab);
  activeIndex.value = tabsStore.tabs.findIndex((tab) => tab.name === selectedTab.name);
  animateSlider();
};

const setSubmode = (selectedSubtab) => {
  tabsStore.setSubmode(selectedSubtab);
};

const animateSlider = () => {
  if (tabsList.value && sliderRef.value) {
    const tabWidth = tabsList.value.offsetWidth / tabsStore.tabs.length;
    const targetLeft = tabWidth * activeIndex.value;

    $gsap.to(sliderRef.value, {
      x: targetLeft,
      duration: 0.8,
      ease: 'back.inOut',
    });
  }
};

onMounted(() => {
  animateSlider();

  watch(activeIndex, () => {
    animateSlider();
  });

  if (!tabsStore.submode && tabsStore.currentMode?.subtabs?.length > 0) {
    tabsStore.setSubmode(tabsStore.currentMode.subtabs[0]);
  }

  $gsap.fromTo(
    slidingHeadingRef.value,
    { x: 300 },
    {
      x: -600,
      scrollTrigger: {
        trigger: slidingHeadingRef.value,
        start: 'top bottom',
        end: '+=3000',
        scrub: true,
      },
    }
  );

  $gsap.from(waves.value, {
    x: -600,
    rotate: -12,
    top: -100,
    scrollTrigger: {
      trigger: waves.value,
      start: 'top 80%',
      end: 'bottom 0%',
      scrub: true,
    },
  });
});
</script>

<style lang="scss" scoped>
.guiding-principals {
  padding: 190px 0 128px;
  background: rgb(var(--color-black));
  color: rgb(var(--color-white));
  position: relative;
  overflow: hidden;
  @include respond-to(sm){
    padding: 100px 0 64px;
  }
  &__top-waves{
    position: absolute;
    left: 0;
    top: 0;
    max-width: 600px;
    width: 80%;
    opacity: 0.8;
    img{
      width: 100%;
    }
  }
}

.guiding-wrapper {
  overflow: hidden;
}

.guiding-tabs {
  padding-bottom: 36px;
  position: relative;
  li {
    &.is-active {
      button {
        font-weight: var(--weight-medium);
      }
    }
  }

  button {
    color: rgb(var(--color-white));
    display: flex;
    margin: 0 auto;
    @include fsz(24px);
    font-weight: var(--weight-light);
    @include respond-to(sm){
      @include fsz(18px);
    }
  }

  &__slider {
    width: 33.333%;
    height: 5px;
    position: absolute;
    bottom: -5px;
    background: linear-gradient(to left, transparent, rgba(254, 249, 226, 1), transparent);
    z-index: 2;
    &:before {
      content: '';
      width: 0px;
      height: 0px;
      border-style: solid;
      border-width: 0 12px 12px 12px;
      border-color: transparent transparent rgba(254, 249, 226, 1) transparent;
      top: -12px;
      @include center(horizontal);
    }
  }
}

.guiding-content {
  min-height: 640px;
  display: flex;
  align-items: center;
  position: relative;
  --border-angle: 0.5turn;
  --gradient-border: conic-gradient(
    from var(--border-angle),
    rgba(255, 255, 255, 0.05),
    rgba(128, 94, 43, 0.2) 20%,
    rgba(128, 94, 43, 1) 40%,
    rgba(128, 94, 43, 1) 60%,
    rgba(128, 94, 43, 0.2) 80%,
    rgba(255, 255, 255, 0.05)
  );

  --main-bg: conic-gradient(
    from var(--border-angle),
    #000,
    #000 5%,
    #000 60%,
    #000 95%
  );

  border: solid 5px transparent;
  background: var(--main-bg) padding-box, var(--gradient-border) border-box, var(--main-bg) border-box;
  background-position: center center;
  @include respond-to(sm){
    min-height: auto;
  }
  &__inner {
    padding: 120px 64px;
    @include respond-to(md){
      padding: 80px 40px;
    }
    @include respond-to(sm){
      padding: 80px 32px 180px;
    }
    p {
      opacity: 0.6;
    }
  }
  &__inner-text {
    max-width: 450px;
    margin-left: 36px;
    @include respond-to(sm){
      margin: 0;
    }
  }
  &__subtabs {
    padding-right: 16px;
    @include respond-to(sm){
      margin-top: -56px;
      padding: 0;
    }
    li {
      margin-bottom: 12px;
      &.is-active {
        button{
          color: rgb(var(--color-white));
          background: transparent;
          &:before{
            width: 68%;
          }
        }
      }
      button {
        padding: 32px 40px;
        @include fsz(22px);
        color: rgba(var(--color-white), 0.6);
        background: rgba(var(--color-white), 0.1);
        font-weight: var(--weight-light);
        display: inline-flex;
        width: 100%;
        position: relative;
        transition: 300ms;
        &:before{
          content: '';
          position: absolute;
          bottom: 22px;
          left: 40px;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #8B6737 0%, transparent 100%);
          transition: inherit;
        }
        @include respond-to(sm){
          @include fsz(18px);
          padding: 16px 20px;
          &:before{
            left: 20px;
            bottom: 6px;
          }
        }
      }
    }
  }
  &__subtab-content{
    padding-left: 106px;
    @include respond-to(md){
      padding-left: 40px;
    }
    @include respond-to(sm){
      padding: 0;
      margin-top: 32px;
    }
  }
  &__sliding-heading{
    @include fsz(250px);
    letter-spacing: 12.5px;
    color: rgba(var(--color-light-gray),0.11);
    font-family: var(--font-heading);
    position: absolute;
    right: 16px;
    bottom: 24px;
    pointer-events: none;
    @include respond-to(sm){
      @include fsz(100px);
      letter-spacing: 5px;
    }
  }
}

.transition-fade-enter-active,
.transition-fade-leave-active {
  transition: all 0.5s ease;
}

.transition-fade-enter-from,
.transition-fade-leave-to {
  opacity: 0;
}

.transition-slide-x-enter-active,
.transition-slide-x-leave-active {
  transition: all 0.5s ease;
}

.transition-slide-x-enter-from,
.transition-slide-x-leave-to {
  opacity: 0;
}

.transition-slide-x-leave-to {
  transform: translateX(20px);
}

.transition-slide-x-enter-from {
  transform: translateX(20px);
}

</style>

