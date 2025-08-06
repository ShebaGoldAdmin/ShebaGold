<template>
  <main>
    <InnerTop heading="Dominion Acquisition"/>
    <section class="news-text pt-80 pb-80 pt-120-md pb-128-md">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mb-64 mb-0-md pr-40-md">
            <HelperText class="mb-16">{{ latestNews.category }}</HelperText>
            <h4 class="mb-24">{{ latestNews.header }}</h4>
            <h5 class="sub-header mb-40">{{ latestNews.subHeader }}</h5>
            <p v-for="paragraph in latestNews.description" 
              :key="paragraph"
              class="scalable"
            >
              {{ paragraph }}
            </p>
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

  </main>
</template>

<script setup>
import InnerTop from '~/components/InnerTop.vue';

import newsData from '~/data/news.json';
const latestNews = newsData.items[0]; // Use the first entry from news.json

useHead({
  title: 'News',
});
</script>

<style lang="scss" scoped>
.news-text {
  color: rgb(var(--color-navy-blue));
  
  h4 {
    line-height: 1.3;
  }
  
  .sub-header {
    font-family: "Libre Franklin", sans-serif;
    font-size: 18px;
    font-weight: 500;
    font-style: italic;
    line-height: 1.6;
    @include respond-to(sm) {
      font-size: 18px;
    }
  }
  
  p {
    line-height: 1.7;
  }
  
  .details-item {
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(var(--color-stroke));
  }
}
</style>