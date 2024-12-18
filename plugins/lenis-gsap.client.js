import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) { // Ensure the plugin only runs on the client-side
    const lenis = new Lenis({
      lerp: 0.06,
    });

    gsap.registerPlugin(ScrollTrigger);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    gsap.ticker.lagSmoothing(0);

    // Provide Lenis and GSAP globally
    nuxtApp.provide('lenis', lenis);
    nuxtApp.provide('gsap', gsap);

    // ScrollToAnchor
    const scrollToAnchor = (selector) => {
      lenis.scrollTo(selector, { easing: 'ease', lerp: 0.06 });
    };

    nuxtApp.provide('scrollToAnchor', scrollToAnchor);
  }
});
