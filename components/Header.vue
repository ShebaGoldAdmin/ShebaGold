<template>
  <header :class="{'is-active' : isMenuOpen }">
    <nav class="menu" data-lenis-prevent>
      <ul>
        <li v-for="link in allLinks" :key="link.name">
          <NuxtLink 
            v-if="isPageLink(link.path)" 
            :to="getLinkHref(link.path)" 
            @click="closeMenu"
          >
            <HelperText class="mr-32" data-helper-text>{{ link.id }}</HelperText>
            <h4>{{ link.name }}</h4>
          </NuxtLink>
          <a 
            v-else 
            :href="getLinkHref(link.path)" 
            :title="link.tooltip || ''"
            @click="closeMenu"
          >
            <HelperText class="mr-32" data-helper-text>{{ link.id }}</HelperText>
            <h4>{{ link.name }}</h4>
          </a>
        </li>
      </ul>
    </nav>
  </header>
  <button 
    class="toggle-menu"
    :class="{'is-active' : isMenuOpen, 'is-hidden': buttonHidden }"
    @click="toggleMenu"
  >
    <span class="d-none d-block-sm">menu</span>
    <div class="toggle-menu__inner">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </div>
  </button>
</template>

<script setup>
import { computed, ref, nextTick } from 'vue';
import { useRoute } from '#app';
import { useNuxtApp } from '#app';
import linksData from '~/data/links.json';
import SplitType from 'split-type';

const props = defineProps({
  buttonHidden: {
    type: Boolean,
    default: true,
  },
});

const { $gsap } = useNuxtApp();
const route = useRoute();
const isHomePage = computed(() => route.path === '/');

// Helper function to get link by ID
const getLinkById = (id) => linksData.links.find(link => link.id === id);

// Get main menu links based on configuration
const allLinks = linksData.mainMenu.map(id => getLinkById(id));

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    nextTick(() => animateMenu());
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const getLinkHref = (path) => {
  if (path && path.startsWith('#') && !isHomePage.value) {
    return `/${path}`;
  }
  return path || '';
};

const isPageLink = (path) => path && !path.startsWith('#');

const animateMenu = () => {
  const items = document.querySelectorAll('.menu ul li');
  
  items.forEach((item, index) => {
    const h4 = item.querySelector('h4');
    const helperText = item.querySelector('[data-helper-text]');
    
    const split = new SplitType(h4, { types: 'chars' });
    
    $gsap.fromTo(
      split.chars,
      { opacity: 0, x: 20 },
      { 
        opacity: 1, 
        x: 0, 
        stagger: 0.05, 
        delay: (index + 1.5) * 0.2, 
        duration: 0.4, 
        ease: 'power4.out' 
      }
    );

    $gsap.fromTo(
      helperText,
      { opacity: 0, scale: 0.5 },
      { 
        opacity: 1, 
        scale: 1, 
        delay: (index + 1.5) * 0.2, 
        duration: 0.4, 
        ease: "back.out(3)"
      }
    );
  });
};
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  z-index: 10;
  width: 100%;
  max-width: 688px;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(var(--color-dark), 0.65);
  backdrop-filter: blur(30px);
  border-left: 1px solid rgba(var(--color-gold), 0.2);
  overflow: hidden;
  transform: translateX(100%);
  transition: 600ms;
  &.is-active {
    transform: translateX(0);
  }
  .menu{
    padding: 80px 0 80px 80px;
    overflow: auto;
    height: 100%;
    overscroll-behavior: contain;
    @include respond-to(sm) {
      padding: 80px 0;
    }
    li:not(:last-of-type){
      border-bottom: 1px solid rgba(var(--color-white), 0.15);
    }
    a{
      display: inline-flex;
      align-items: center;
      padding: 32px 0;
      color: rgb(var(--color-white));
      &:hover{
        color: rgb(var(--color-gold));
      }
      @include respond-to(sm) {
        padding: 24px;
      }
    }
  }
}

.toggle-menu {
  position: fixed;
  z-index: 20;
  top: 32px;
  right: 40px;
  cursor: pointer;
  @include fsz(13px);
  font-weight: var(--weight-medium);
  text-transform: uppercase;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  transition: 400ms;
  @include respond-to(sm) {
    right: 24px;
  }
  > span{
    transition: 300ms;
    color: rgb(var(--color-white));
  }
  &__inner {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    width: 50px;
    height: 32px;
    margin-left: 32px;
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: rgb(var(--color-gold));
    transition: 300ms;
    &:last-child {
      width: 50%;
    }
  }
  &.is-active {
    > span{
      opacity: 0;
      transform: translateX(10px);
    }
    .toggle-menu__inner {
      width: 32px;
      height: 32px;
      justify-content: center;
    }
    .line {
      &:nth-child(1) {
        transform: translateY(1px) rotate(45deg);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(3) {
        transform: translateY(-1px) rotate(-45deg);
        width: 100%;
      }
    }
  }
  &.is-hidden {
    opacity: 0;
    transform: translateY(-20px);
    pointer-events: none;
  }
}
</style>
