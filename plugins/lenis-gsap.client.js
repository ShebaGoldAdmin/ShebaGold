import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default defineNuxtPlugin(nuxtApp => {

  if (process.client) { // Ensure the plugin only runs on the client-side
    // Create Lenis instance
    const lenis = new Lenis({
      lerp: 0.06,
    });

    // Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Sync Lenis scroll with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);

    // Provide Lenis and GSAP to your application globally
    nuxtApp.provide('lenis', lenis);
    nuxtApp.provide('gsap', gsap);
  }

});
