<template>
  <main>
    <InnerTop :heading="portfolioItem?.title" :subheading="portfolioItem?.category"/>

    <div class="portfolio-top">
      <NuxtImg 
        v-if="portfolioImages.length >= 3"
        :src="portfolioImages[0]"
        :alt="`${portfolioItem?.title} - Preview`"
        format="avif"
        quality="90"
        class="portfolio-top__image"
      />
      <Splide
        v-else
        :options="{
          type: 'slide',
          speed: 800,
          perPage: 1,
          arrows: false,
          pagination: true,
        }"
      >
        <SplideSlide
          v-for="(image, index) in portfolioImages"
          :key="index"
          class="portfolio-slider__item"
        >
          <NuxtImg
            :src="image"
            :alt="`${portfolioItem?.title} - Image ${index + 1}`"
            format="avif"
            quality="90"
            class="portfolio-top__image"
          />
        </SplideSlide>
      </Splide>
    </div>

    <section class="portfolio-text pt-80 pb-80 pt-120-md pb-128-md">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mb-64 mb-0-md pr-40-md">
            <HelperText class="mb-16">Info</HelperText>
            <h3 class="mb-40">Overview</h3>
            <p v-for="paragraph in portfolioItem.description" 
              :key="paragraph"
              class="scalable"
            >
              {{ paragraph }}
            </p>
          </div>
          <div class="col-md-6 pl-64-md">
            <HelperText class="mb-32 mb-56-md">In numbers</HelperText>
            <div class="row gutter-48">
              <div class="col-lg-6" v-for="item in portfolioItem.itemDetails" :key="item.title">
                <div class="details-item mb-32 from-right">
                  <p class="mb-8">{{ item.title }}</p>
                  <h4>{{ item.description }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section 
      v-if="portfolioImages.length >= 3" 
      class="pt-80 pb-120 pt-136-sm pb-280-sm portfolio-gallery"
    >
      <div class="container position-relative">
        <HelperText class="mb-16">Info</HelperText>
        <h2 class="mb-80">Gallery</h2>
        <div class="portfolio-gallery__inner">
          <Splide
            :options="{
              type: 'loop',
              perPage: 4,
              perMove: 1,
              gap: '2rem',
              pagination: false,
              arrows: false,
              breakpoints: {
                768: {
                  perPage: 1,
                  gap: '1rem',
                  padding: '2rem',
                },
              }
            }"
            @splide:mounted="handleSplideMount"
          >
            <SplideSlide 
              v-for="(image, index) in portfolioImages" 
              :key="index"
            >
              <NuxtImg
                :src="image"
                :alt="`${portfolioItem?.title} - Image ${index + 1}`"
                format="avif"
                quality="90"
                @click="openLightbox(index)"
              />
            </SplideSlide>
          </Splide>
        </div>
        <div class="carousel-arrows">
          <ArrowButton class="mr-16" arrowRotate="90"
            @click="handlePrevClick"
          />
          <ArrowButton arrowRotate="-90"
            @click="handleNextClick"
          />
        </div>
      </div>
      <div class="sliding-heading" ref="slidingHeadingRef">
        Gallery
      </div>
    </section>

    <!-- Lightbox -->
    <transition name="fade">
      <div v-if="isLightboxOpen" class="lightbox">
        <div class="carousel-arrows">
          <ArrowButton arrowRotate="90"
            color="gold"
            class="ml-8 mr-8"
            @click="handlePrevClick"
          />
          <ArrowButton arrowRotate="-90"
            color="gold"
            class="ml-8 mr-8"
            @click="handleNextClick"
          />
        </div>
        <Splide
          ref="lightboxSplide"
          :options="{
            type: 'loop',
            perPage: 1,
            arrows: false,
            pagination: true,
            start: currentImageIndex,
            speed: 800
          }"
          class="lightbox__slider"
        >
          <SplideSlide 
            v-for="(image, index) in portfolioImages" 
            :key="index"
            class="lightbox__item"
          >
            <NuxtImg
              :src="image"
              :alt="`${portfolioItem?.title} - Image ${index + 1}`"
              format="avif"
              quality="90"
              class="lightbox__image"
            />
          </SplideSlide>
        </Splide>
        <button 
          @click="closeLightbox"
          class="lightbox__close"
        >
          <span class="line"></span>
          <span class="line"></span>
        </button>
      </div>
    </transition>
  </main>
</template>

<script setup>
import portfolioData from '~/data/portfolio.json';
import { useRoute } from '#app';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/splide/css';

const { $gsap } = useNuxtApp();

const route = useRoute();
const portfolioItem = portfolioData.items.find((item) => item.slug === route.params.slug);
const portfolioImages = ref([]);
const isLightboxOpen = ref(false);
const currentImageIndex = ref(0);
const gallerySplide = ref(null);
const lightboxSplide = ref(null);
const slidingHeadingRef = ref(null);

onMounted(async () => {
  const images = import.meta.glob('/public/images/portfolio/**/*.{png,jpg,jpeg,webp,avif}', {
    eager: true,
  });
  
  portfolioImages.value = Object.entries(images)
    .filter(([path]) => path.includes(`/${route.params.slug}/`))
    .map(([path]) => path.replace('/public', ''));

  await nextTick();
  
  $gsap.to('.portfolio-top__image', {
    scrollTrigger: {
      trigger: '.portfolio-top',
      start: "top top",
      scrub: true,
      pin: true,
      pinSpacing: false
    }
  });

  $gsap.fromTo(
    slidingHeadingRef.value,
    { x: -200 },
    {
      x: 400,
      scrollTrigger: {
        trigger: slidingHeadingRef.value,
        start: 'top bottom',
        end: '+=3000',
        scrub: true,
      },
    }
  );
});

const handleSplideMount = (splide) => {
  gallerySplide.value = splide;
};

const handlePrevClick = () => {
  if (isLightboxOpen.value && lightboxSplide.value) {
    lightboxSplide.value.go('<');
  } else if (gallerySplide.value) {
    gallerySplide.value.go('<');
  }
};

const handleNextClick = () => {
  if (isLightboxOpen.value && lightboxSplide.value) {
    lightboxSplide.value.go('>');
  } else if (gallerySplide.value) {
    gallerySplide.value.go('>');
  }
};

const openLightbox = (index) => {
  currentImageIndex.value = index;
  isLightboxOpen.value = true;
  
  nextTick(() => {
    if (lightboxSplide.value) {
      lightboxSplide.value.go(index);
    }
  });
};

const closeLightbox = () => {
  isLightboxOpen.value = false;
};

useHead({
  title: portfolioItem?.title,
  description: portfolioItem?.category,
});
</script>

<style lang="scss">
.portfolio-top {
  height: 720px;
  overflow: hidden;
  position: relative;
  @include respond-to(sm) {
    height: 380px;
  }
  .splide{
    height: 100%;
    .splide__track{
      height: 100%;
      [class^="splide"] {
        height: 100%;
      }
    }
  }
  img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.splide__pagination{
  top: 0;
  bottom: auto;
  background: rgba(var(--color-black), 0.7);
  padding: 12px 16px;
  &__page{
    border-radius: 0;
    width: 32px;
    height: 32px;
    background:
      linear-gradient(to right, rgb(var(--color-gold)) 1px, transparent 1px) 0 0,
      linear-gradient(to right, rgb(var(--color-gold)) 1px, transparent 1px) 0 100%,
      linear-gradient(to left, rgb(var(--color-gold)) 1px, transparent 1px) 100% 0,
      linear-gradient(to left, rgb(var(--color-gold)) 1px, transparent 1px) 100% 100%,
      linear-gradient(to bottom, rgb(var(--color-gold)) 1px, transparent 1px) 0 0,
      linear-gradient(to bottom, rgb(var(--color-gold)) 1px, transparent 1px) 100% 0,
      linear-gradient(to top, rgb(var(--color-gold)) 1px, transparent 1px) 0 100%,
      linear-gradient(to top, rgb(var(--color-gold)) 1px, transparent 1px) 100% 100%;

    background-repeat: no-repeat;
    background-size: 8px 8px;
    opacity: 1;
    margin: 0 10px;
    position: relative;
    &:after{
      content: '';
      width: 50%;
      height: 50%;
      background: rgb(var(--color-white));
      @include center(both);
      opacity: 0;
    }
    &.is-active{
      transform: none;
      background:
        linear-gradient(to right, rgb(var(--color-gold)) 1px, transparent 1px) 0 0,
        linear-gradient(to right, rgb(var(--color-gold)) 1px, transparent 1px) 0 100%,
        linear-gradient(to left, rgb(var(--color-gold)) 1px, transparent 1px) 100% 0,
        linear-gradient(to left, rgb(var(--color-gold)) 1px, transparent 1px) 100% 100%,
        linear-gradient(to bottom, rgb(var(--color-gold)) 1px, transparent 1px) 0 0,
        linear-gradient(to bottom, rgb(var(--color-gold)) 1px, transparent 1px) 100% 0,
        linear-gradient(to top, rgb(var(--color-gold)) 1px, transparent 1px) 0 100%,
        linear-gradient(to top, rgb(var(--color-gold)) 1px, transparent 1px) 100% 100%;

      background-repeat: no-repeat;
      background-size: 8px 8px;
      &:after{
        opacity: 1;
      }
    }
  }
}

.portfolio-text { 
  background: rgb(var(--color-white));
  position: relative;
}

.details-item {
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(var(--color-stroke));
}

.portfolio-gallery {
  background: rgb(var(--color-light-gray));
  position: relative;
  .container{
    z-index: 2;
  }
  &__inner{
    width: 140%;
    left: -20%;
    position: relative;
    &:after, &:before{
      content: '';
      position: absolute;
      height: 100%;
      width: 30%;
      right: 0;
      top: 0;
      pointer-events: none;
      z-index: 2;
      background: linear-gradient(to right, rgba(var(--color-light-gray), 0) 0%, rgba(var(--color-light-gray), 1) 50%);
      @include respond-to(sm){
        display: none;
      }
    }
    &:before{
      left: 0;
      right: auto;
      background: linear-gradient(to left, rgba(var(--color-light-gray), 0) 0%, rgba(var(--color-light-gray), 1) 50%);
    }
    @include respond-to(sm){
      width: calc(100% + 40px);
      left: -20px;
    }
    img{
      width: 100%;
      display: block;
    }
  }
  .carousel-arrows{
    position: absolute;
    top: 24px;
    right: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
}

.sliding-heading {
  @include fsz(348px);
  letter-spacing: 17.5px;
  font-family: var(--font-heading);
  color: rgb(var(--color-gray-team));
  position: absolute;
  left: 0;
  bottom: 0;
  line-height: 1;
  white-space: nowrap;
  @include respond-to(sm){
    @include fsz(130px);
    letter-spacing: 6.5px;
  }
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(var(--color-black), 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  &__slider {
    width: 100%;
    margin: 0 auto;
  }
  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  &__image {
    object-fit: cover;
    width: 100vw;
    height: auto;
    @media (orientation: landscape) {
      height: 100vh;
      width: auto;
    }
  }
  &__close {
    position: absolute;
    top: 12px;
    right: 20px;
    width: 32px;
    height: 32px;
    color: rgb(var(--color-gold));
    border: none;
    background: none;
    cursor: pointer;
    z-index: 2;
    transition: opacity 0.3s ease;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .line {
      width: 100%;
      height: 1px;
      background-color: rgb(var(--color-gold));
      transition: 300ms;
    }
    .line {
      &:nth-child(1) {
        transform: translateY(1px) rotate(45deg);
      }
      &:nth-child(2) {
        transform: translateY(-1px) rotate(-45deg);
        width: 100%;
      }
    }
    &:hover {
      opacity: 0.8;
    }
  }
  .carousel-arrows{
    bottom: 0;
    right: 0;
    position: absolute;
    background: rgba(var(--color-black), 0.7);
    padding: 12px 16px;
    z-index: 2;
    display: flex;
    justify-content: center;
    @include respond-to(sm){
      left: 0;
      bottom: 20px;
    }
  }
  .splide__pagination{
    @include respond-to(sm){
      display: none;
    }
  }
}

.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s ease;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>