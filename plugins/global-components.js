import { defineNuxtPlugin } from '#app';
import ArrowButton from '~/components/elements/ArrowButton.vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('ArrowButton', ArrowButton);
});
