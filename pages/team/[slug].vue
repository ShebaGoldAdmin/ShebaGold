<template>
  <main>
    <InnerTop :member="member"/>

    <section class="pt-144 pt-192-sm pb-120 pb-184-sm">
      <div class="container">
        <HelperText class="mb-40 scalable">Biography</HelperText>
        <div class="two-columns mb-80 mb-128-sm">
          <p v-for="paragraph in member.description" 
            :key="paragraph"
            class="scalable"
          >
           {{ paragraph }}
          </p>
        </div>

        <template v-if="member.experience">
          <HelperText class="mb-40 scalable">
            Experience
          </HelperText>
          <div class="row">
            <div class="col-sm-6">
              <div class="company-name scalable" v-for="company in member.experience" :key="company">
                {{ company }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>

    <section class="achievements pt-120 pb-120 pt-144-sm pb-144-sm" v-if="member.achievements">
      <img class="achievements__logo" src="/images/logo-rounded.svg" alt="Sheba Gold Capital" />
      <div class="container">
        <div class="timeline">
          <article class="timeline__item scalable" v-for="achievement in member.achievements" :key="achievement.id">
            <HelperText class="mb-16">{{ achievement.id }}</HelperText>
            <h4 class="mb-24">{{ achievement.title }}</h4>
            <p v-for="paragraph in achievement.description" :key="paragraph">{{ paragraph }}</p>
          </article>
        </div>
      </div>
    </section>

    <section 
      class="pb-80"
      :class="{ 'bg-light-gray': member.achievements }"
    >
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <RouterLink v-if="prevMember" :to="`/team/${prevMember.slug}`" class="mr-8">
            <ArrowButton
              arrowRotate="90"
              paginationLeft
            >
              {{ prevMember.name }}
            </ArrowButton>
          </RouterLink>
          <RouterLink v-if="nextMember" :to="`/team/${nextMember.slug}`">
            <ArrowButton 
              arrowRotate="-90"
              paginationRight
            >
              {{ nextMember.name }}
            </ArrowButton>
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>


<script setup>
import team from '~/data/team.json';
import { useRoute } from '#app';
import InnerTop from '~/components/InnerTop.vue';

const route = useRoute();
const currentIndex = team.findIndex((m) => m.slug === route.params.slug);
const member = team[currentIndex];
const prevMember = currentIndex === 0 ? team[team.length - 1] : team[currentIndex - 1];
const nextMember = currentIndex === team.length - 1 ? team[0] : team[currentIndex + 1];

useHead({
  title: member?.name,
  description: member?.position,
});
</script>


<style lang="scss" scoped>
.company-name{
  @include fsz(36px);
  font-family: var(--font-heading);
  &:not(:first-of-type) {
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid rgb(var(--color-stroke));
  }
}
.achievements {  
  background: rgb(var(--color-light-gray));
  position: relative;
  &__logo{
    position: absolute;
    transform: translateY(-50%);
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    @include respond-to(sm){
      width: 88px;
    }
  }
}
.bg-light-gray {
  background: rgb(var(--color-light-gray));
}
.timeline {
  column-count: 2;
  column-gap: 20px;
  @include respond-to(sm){
    display: flex;
    flex-direction: column;
  }
  &__item {
    break-inside: avoid;
    border: 1px solid rgb(var(--color-stroke));
    padding: 56px 48px;
    margin-bottom: 20px; 
    &:last-child {
      padding-bottom: 52px;
    }
    @include respond-to(sm){
      padding: 32px 24px;
      margin-bottom: 16px;
      &:last-child {
        padding-bottom: 32px;
      }
    }
    @include respond-to(sm) {
      &:nth-child(1) {
        order: 1;
      }
      &:nth-child(2) {
        order: 3;
      }
      &:nth-child(3) {
        order: 2;
      }
      &:nth-child(4) {
        order: 4;
      }
    }
  }
}
</style>
