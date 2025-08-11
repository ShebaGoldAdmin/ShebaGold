<template>
  <main>
    <InnerTop
      :heading="latestNews.title"
      :subheading="latestNews.category"
      :sliding-heading="latestNews.tagline"
      :x-start="600"
      :x-end="-1600"
    />
    <div class="news-banner-section" ref="newsBannerRef">
      <div class="container">
        <div class="row justify-content-center">
          <NewsBanner is-column-on-mobile/>
        </div>
      </div>
    </div>
    <section class="news-text pt-80 pb-80 pt-120-md pb-128-md">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mb-80 mb-0-md pr-40-md">
            <HelperText class="mb-16">{{ latestNews.category }}</HelperText>
            <h4 class="mb-24">{{ latestNews.header }}</h4>
            <h5 class="sub-header mb-40">{{ latestNews.subHeader }}</h5>
            <p v-for="(paragraph, index) in alwaysVisibleParagraphs"
                :key="`visible-${index}`"
                class="scalable"
            >
              {{ paragraph }}
            </p>
            
            <Transition name="slide-down"  @before-leave="handleBeforeLeave">
              <div v-if="isExpanded" class="mt-24">
                <p v-for="(paragraph, index) in hiddenParagraphs"
                  :key="`hidden-${index}`"
                  class="scalable"
                >
                  {{ paragraph }}
                </p>
              </div>
            </Transition>
            
            <ArrowButton 
              v-if="shouldShowButton"
              class="mt-40 mt-120-md from-right"
              :arrowRotate="isExpanded ? '-180' : '-90'"
              @click="toggleReadMore"
            >
              {{ isExpanded ? 'Show Less' : 'Read More' }}
            </ArrowButton>
          </div>
          <div class="col-md-6 pl-64-md">
            <HelperText class="mb-32 mb-56-md">Key Details</HelperText>
            <div class="row gutter-48">
              <div class="col-lg-6" v-for="item in latestNews.itemDetails" :key="item.title">
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
    <section class="blockquote-section pt-40 pb-40">
      <Blockquote 
        author="Morris Sarway, Partner | Sheba Gold Capital"
        type="gold"
      >
        At Sheba Gold, we don’t just see what a company is…we see what it can become. And in Dominion, we see the potential for a future others will benchmark against.
      </Blockquote>
    </section>
    <section class="letter-section pt-120 pb-160">
      <div class="letter-sliding-heading" ref="slidingHeadingRef">A Pivotal<br> Moment</div>
      <div class="container">
        <div class="row">
          <div class="col-lg-7">
            <HelperText>The Next 140 Years</HelperText>
            <h3 class="mt-16 mb-48">An Open Letter from Morris Sarway</h3>
            <img src="/images/team/Morris-Sarway.png" alt="Morris Sarway" class="author-image" />
            <p class="lg scalable">To our valued partners and the P&HS teammates, customers and community,</p>
            <p class="lg scalable">Today marks a pivotal moment… not just in the life of Sheba Gold, but in the continuation of Dominion’s legacy.</p>
            <p class="lg scalable">It is with great excitement and deep respect that Sheba Gold Capital has signed a definitive agreement to acquire Dominion’s Products & Healthcare Services Business. For me, this is not just a strategic move. It’s personal, as it represents an investment in the values and principles that I’ve dedicated my career to – beliefs about people, purpose and what’s possible when you combine vision with experience.</p>
            <p class="lg scalable">From the start, it was clear that Dominion stood for something exceptional. Its reputation was forged from more than a century of dedication to its customers, its people and its mission. That legacy, as well as the name, is not something we intend to change…it’s something we’re here to honor, support and build upon.</p>
            <p class="lg scalable">Our goal is to elevate the brand and the business, not disrupt it, and our team is working diligently behind the scenes to ensure a seamless and promising transition. We’ll invest in products, training and innovation while maintaining the same exceptional service customers have come to expect.</p>
            <p class="lg scalable">As we look toward what’s on the horizon, I couldn’t be more honored or more confident. What Dominion has built over the past 140 years is remarkable. We intend on carrying this customer-centric legacy forward and building upon it for the next 140 years. What we achieve together will be nothing short of extraordinary.</p>
            <p class="lg scalable mt-24">
              Morris Sarway<br>
              Partner<br>
              Sheba Gold Capital
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, Transition, nextTick, onMounted } from 'vue';
import InnerTop from '~/components/InnerTop.vue';
import NewsBanner from '~/components/NewsBanner.vue';
import Blockquote from '~/components/elements/Blockquote.vue';
import newsData from '~/data/news.json';
import { useScrollTrigger } from '~/composables/useScrollTrigger';

const { initializeScrollTriggers } = useScrollTrigger();
const { $lenis } = useNuxtApp();

const latestNews = newsData.items[0]; // Use the first entry from news.json
const isExpanded = ref(false);
const previewParagraphCount = 1;

const alwaysVisibleParagraphs = computed(() => {
  return latestNews.description.slice(0, previewParagraphCount);
});

const hiddenParagraphs = computed(() => {
  return latestNews.description.slice(previewParagraphCount);
});

const shouldShowButton = computed(() => {
  return latestNews.description.length > previewParagraphCount;
});

const slidingHeadingRef = ref(null);
const newsBannerRef = ref(null);

const toggleReadMore = () => {
  isExpanded.value = !isExpanded.value;
};

const handleBeforeLeave = () => {
  nextTick(() => {
    $lenis.scrollTo('.news-text', { offset: -20, duration: 0.3 });
  });
};

onMounted(async () => {
  await initializeScrollTriggers(($gsap) => {
    // Sliding heading animation
    $gsap.fromTo(
      slidingHeadingRef.value,
      { x: -100 },
      {
        x: 600,
        scrollTrigger: {
          trigger: slidingHeadingRef.value,
          start: 'top bottom',
          end: '+=3000',
          scrub: true
        }
      }
    );

    // Background color transition
    $gsap.to(newsBannerRef.value, {
      backgroundColor: 'rgb(var(--color-dark))',
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.logo-wrapper',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });
  });
});

useHead({
  title: 'News'
});
</script>


<style lang="scss" scoped>
.news-banner-section {
  background: rgb(var(--color-black));
  padding: 248px 0;
  @include respond-to(sm) {
    padding: 120px 0;
  }
}
.news-text {
  color: rgb(var(--color-navy-blue));
  h4 {
    line-height: 1.3;
  }
  .sub-header {
    font-family: var(--font-body);
    @include fsz(18px);
    font-weight: 500;
    font-style: italic;
    line-height: 1.6;
  }
  p {
    line-height: 1.7;
  }
  .details-item {
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(var(--color-stroke));
  }
}

.blockquote-section {
  background: rgb(var(--color-light-gray));
}

.letter-section {
  @include paragraphSpacing();
  position: relative;
}

.author-image {
  float: left;
  width: 150px;
  height: 180px;
  object-fit: cover;
  object-position: top;
  border-radius: 4px;
  margin: 0 24px 16px 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.slide-down-enter-from {
  max-height: 0;
  opacity: 0;
  transform: translateY(10px);
}

.slide-down-enter-to {
  max-height: 1600px;
  opacity: 1;
  transform: translateY(0);
}

.slide-down-leave-from {
  max-height: 1600px;
  opacity: 1;
  transform: translateY(0);
}

.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(10px);
}

.letter-sliding-heading{
  @include fsz(348px);
  letter-spacing: 5%;
  font-family: var(--font-heading);
  color: rgb(var(--color-light-gray));
  position: absolute;
  right: 30%;
  white-space: nowrap;
  @include respond-to(sm){
    @include fsz(130px);
    letter-spacing: 6.5px;
  }
}
</style>