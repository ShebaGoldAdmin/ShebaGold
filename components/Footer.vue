<template>
  <footer>
    <div class="container">
      <div class="footer-inner">
        <ul>
          <li v-for="link in firstColumnLinks" :key="link.name">
            <NuxtLink v-if="isPageLink(link.path)" :to="getLinkHref(link.path)">
              {{ link.name }}
            </NuxtLink>
            <a v-else :href="getLinkHref(link.path)">
              {{ link.name }}
            </a>
          </li>
        </ul>
        <ul>
          <li v-for="link in secondColumnLinks" :key="link.name">
            <template v-if="link.tooltip">
              <VTooltip :placement="'top'" :distance="14">
                <NuxtLink
                  v-if="isPageLink(link.path)"
                  :to="getLinkHref(link.path)"
                  class="d-none d-inline-flex-md"
                >
                  {{ link.name }}
                </NuxtLink>
                <a v-else :href="getLinkHref(link.path)" class="d-none d-inline-flex-md">
                  {{ link.name }}
                </a>
                <template #popper>{{ link.tooltip }}</template>
              </VTooltip>
            </template>
            <template v-else>
              <NuxtLink v-if="isPageLink(link.path)" :to="getLinkHref(link.path)">
                {{ link.name }}
              </NuxtLink>
              <a v-else :href="getLinkHref(link.path)">
                {{ link.name }}
              </a>
            </template>
          </li>
        </ul>
        <div class="footer-logo">
          <img src="/images/logo-text.svg" alt="" />
        </div>
      </div>
      <div class="subfooter">
        <a href="mailto:info@sheba.gold">info@sheba.gold</a>
        <div class="text-center">Sheba Gold Capital {{ currentYear }} © All rights reserved</div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from '#app';
import links from '~/data/links.json';

const route = useRoute();
const isHomePage = computed(() => route.path === '/');

const { firstColumnLinks, secondColumnLinks } = links;

const getLinkHref = (path) => {
  if (path.startsWith('#') && !isHomePage.value) {
    return `/${path}`;
  }
  return path;
};

const isPageLink = (path) => !path.startsWith('#');

const currentYear = new Date().getFullYear();
</script>

<style lang="scss" scoped>
footer {
  padding: 184px 0 144px;
  background-color: rgb(var(--color-dark));
  position: relative;
  overflow: hidden;
  @include respond-to(md) {
    padding: 72px 0 88px;
  }
  &:after {
    content: '';
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-image: url('/public/images/logo-dark.svg');
    background-position: center 36%;
    background-repeat: no-repeat;
    background-size: 172% 172%;
    @include respond-to(sm) {
      background-position: center 46%;
    }
  }
}
.footer-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  ul {
    display: flex;
    border-bottom: 1px solid rgb(var(--color-stroke-dark));
    padding: 0 42px 20px;
    @include respond-to(lg) {
      padding-left: 0;
      padding-right: 0;
    }
    @include respond-to(md) {
      flex-direction: column;
      border-bottom: 0;
    }
  }
  li {
    margin: 0 32px;
    @include respond-to(lg) {
      margin: 0 16px;
    }
    @include respond-to(xs) {
      margin: 8px 0;
    }
    a,
    button {
      @include textDesktopM();
      color: rgba(var(--color-white), 0.5);
      padding: 4px 12px;
      display: inline-block;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, rgb(var(--color-gold)) 1px, transparent 1px) 0 0,
          linear-gradient(to right, rgb(var(--color-gold)) 1px, transparent 1px) 0 100%,
          linear-gradient(to left, rgb(var(--color-gold)) 1px, transparent 1px) 100% 0,
          linear-gradient(to left, rgb(var(--color-gold)) 1px, transparent 1px) 100% 100%,
          linear-gradient(to bottom, rgb(var(--color-gold)) 1px, transparent 1px) 0 0,
          linear-gradient(to bottom, rgb(var(--color-gold)) 1px, transparent 1px) 100% 0,
          linear-gradient(to top, rgb(var(--color-gold)) 1px, transparent 1px) 0 100%,
          linear-gradient(to top, rgb(var(--color-gold)) 1px, transparent 1px) 100% 100%;
        background-repeat: no-repeat;
        background-size: 8px 8px;
        opacity: 0;
        transform: scale(.8);
        transition: 300ms var(--transition-backward);
      }
      &:hover {
        color: rgb(var(--color-gold));
        &:before {
          opacity: 1;
          transform: none;
        }
      }
    }
  }
  .footer-logo {
    @include center(horizontal);
    top: -8px;
    @include respond-to(xs) {
      position: static;
      transform: none;
      width: 100%;
      text-align: center;
      margin-top: 24px;
      img {
        width: 132px;
      }
    }
  }
}
.subfooter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include fsz(16px);
  line-height: 1.75;
  color: rgba(var(--color-white), 0.5);
  margin-top: 40px;
  position: relative;
  z-index: 2;
  @include respond-to(xs) {
    margin-top: 56px;
    flex-direction: column;
  }
  a {
    &:hover {
      color: rgb(var(--color-gold));
    }
    @include respond-to(xs) {
      margin-bottom: 20px;
    }
  }
}
</style>
