import { defineNuxtPlugin } from '#app';
import ArrowButton from '~/components/elements/ArrowButton.vue';
import HelperText from '~/components/elements/HelperText.vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('ArrowButton', ArrowButton);
  nuxtApp.vueApp.component('HelperText', HelperText);
});
