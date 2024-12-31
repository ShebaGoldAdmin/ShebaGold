import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useRouter } from 'vue-router';

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const lenis = new Lenis({
      lerp: 0.06,
    });

    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    nuxtApp.provide('lenis', lenis);
    nuxtApp.provide('gsap', gsap);

    const router = useRouter();

    document.addEventListener('click', (e) => {
      const target = e.target.closest('a');
      if (!target) return;
    
      const href = target.getAttribute('href');
      if (!href || href === '#0') {
        e.preventDefault();
        return;
      }
    
      if (href.startsWith('#')) {
        e.preventDefault();
        lenis.scrollTo(href);
      } else if (href.startsWith('/#')) {
        e.preventDefault();
        const section = href.replace('/#', '#');
        if (window.location.pathname !== '/') {
          router.push('/').then(() => {
            setTimeout(() => lenis.scrollTo(section), 1000);
          });
        } else {
          lenis.scrollTo(section);
        }
      }
    });
  }
});
