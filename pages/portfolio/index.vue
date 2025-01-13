<template>
  <main>
    <InnerTop heading="Portfolio"/>
    <section class="pt-112 pt-152-sm pb-80 pb-192-sm">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <HelperText class="mb-24">Case Studies</HelperText>
            <h2 class="mb-64 mb-80-sm word-split">With 20 years of experience in the business and real estate worlds.</h2>
          </div>
        </div>
        <div class="filters from-right mb-40 mb-104-sm">
          <button
            v-for="category in categories"
            :key="category"
            :class="{'active': selectedCategory === category }"
            @click="filterProjects(category)"
          >
            {{ category }}
          </button>
        </div>
        <div class="row from-bottom">
          <div
            v-for="item in items"
            :key="item.id"
            class="col-md-6"
            :ref="el => { if (el) itemRefs[item.id] = el }"
            :style="{ display: shouldDisplay(item) ? 'block' : 'none' }"
          >
            <NuxtLink :to="'/portfolio/' + item.slug">
              <div class="portfolio-card mb-40 mb-80-md">
                <div class="portfolio-card__image mb-24">
                  <NuxtImg 
                    :src="`/images/portfolio/${item.slug}/1.png`"
                    format="avif"
                    quality="90"
                    :alt="item.title" 
                  />
                </div>
                
                <HelperText class="mb-8">{{ item.category }}</HelperText>
                <h3>{{ item.title }}</h3>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import portfolioData from '~/data/portfolio.json';

const items = ref(portfolioData.items);
const categories = ['View All', 'Healthcare', 'Real Estates'];
const selectedCategory = ref('View All');
const itemRefs = ref({});
const isAnimating = ref(false);
const { $gsap } = useNuxtApp();

const shouldDisplay = (item) => {
  return selectedCategory.value === 'View All' || item.category === selectedCategory.value;
};

const animateItemsOut = async () => {
  const currentItems = items.value.filter(item => shouldDisplay(item));
  const elements = currentItems.map(item => itemRefs.value[item.id]);
  
  return $gsap.to(elements, {
    opacity: 0,
    y: -30,
    duration: 0.4,
    stagger: 0.09,
    ease: 'power2.in'
  });
};

const animateItemsIn = () => {
  const newItems = items.value.filter(item => shouldDisplay(item));
  const elements = newItems.map(item => itemRefs.value[item.id]);
  
  $gsap.fromTo(elements,
    {
      opacity: 0,
      y: 50
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.09,
      ease: 'power2.out'
    }
  );
};

const filterProjects = async (category) => {
  if (isAnimating.value) return;
  isAnimating.value = true;
  
  await animateItemsOut();
  selectedCategory.value = category;
  await nextTick();
  animateItemsIn();
  isAnimating.value = false;
};

onMounted(() => {
  animateItemsIn();
});
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  overflow-x: auto;
  padding-bottom: 16px;
  button {
    position: relative;
    padding: 15px 40px;
    margin-right: 16px;
    @include fsz(20px);
    line-height: 1.4;
    color: rgba(var(--color-navy-blue), 0.5);
    border: 1px solid rgb(var(--color-gray-team));
    transition: 300ms;
    white-space: nowrap;
    &:after {
      content: '';
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      position: absolute;
      left: -1px;
      top: -1px;
      border-width: 1px;
      border-style: solid;
      border-image-source: linear-gradient(to left, rgba(234, 206, 169, 1), rgba(215, 162, 91, 1), rgba(205, 163, 108, 1));
      border-image-slice: 1;
      opacity: 0;
      transition: inherit;
    }
    &:hover {
      color: rgb(var(--color-navy-blue));
    }
    &.active {
      color: rgb(var(--color-navy-blue));
      pointer-events: none;
      &:after {
        opacity: 1;
      }
    }
    @include respond-to(sm){
      padding: 14px 32px;
      @include fsz(18px);
    }
  }
}

.portfolio-card {
  &:hover{
    .portfolio-card__image{
      img{
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        filter: sepia(0.5);
      }
    }
  }
  &__image {
    aspect-ratio: 1/0.72;
    display: flex;
    align-items: center;
    justify-content: center;
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
    background-size: 20px 20px;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: 1000ms;
    }
  }
}
</style>