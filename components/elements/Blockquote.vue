<template>
  <blockquote :class="type">
    <BlockquoteSvg :color="svgColor"/>
    <h3 ref="titleRef" class="text-left word-split"><slot/></h3>
    <h6 v-if="author" 
      ref="authorRef"
      class="mt-16"
      style="opacity: 0; transform: translateY(10px);" 
    >
      {{ author }}
    </h6>
  </blockquote>
</template>

<script setup lang="js">
import { onMounted, ref, nextTick } from 'vue';
import BlockquoteSvg from './BlockquoteSvg.vue';

const { $gsap } = useNuxtApp();
const titleRef = ref(null);
const authorRef = ref(null);

const props = defineProps({
  type: {
    type: String,
    default: 'gray',
  },
  author: {
    type: String,
    default: null,
  }
});

const svgColor = computed(() => {
  if (props.type === 'gray') {
    return 'rgb(var(--color-light-gray))';
  }
  return 'rgba(var(--color-gold), 0.4)';
});

onMounted(() => {
  $gsap.from('blockquote svg', {
    y: 50,
    scale: 0.7,
    opacity: 0.3,
    duration: 5,
    scrollTrigger: {
      trigger: 'blockquote svg',
      start: 'top 80%',
      end: 'top 20%',
      scrub: true,
    },
  });

  nextTick(() => {
    if (!titleRef.value || !props.author) return;

    const { ScrollTrigger } = $gsap.core.globals();

    let authorDelayCall = null;
    let authorTween = null;

    const scheduleAuthor = () => {
      if (authorDelayCall) {
        authorDelayCall.kill();
        authorDelayCall = null;
      }

      if (authorTween) {
        authorTween.kill();
        authorTween = null;
      }

      const words = titleRef.value?.querySelectorAll('.word');
      const totalDuration = words?.length
        ? 0.1 + words.length * 0.1
        : 1;

      authorDelayCall = $gsap.delayedCall(totalDuration, () => {
        if (authorRef.value) {
          authorTween = $gsap.to(authorRef.value, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'power2.out',
          });
        }
      });
    };

    const hideAuthor = () => {
      if (authorDelayCall) {
        authorDelayCall.kill();
        authorDelayCall = null;
      }

      if (authorTween) {
        authorTween.kill();
        authorTween = null;
      }

      if (authorRef.value) {
        $gsap.to(authorRef.value, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    };

    ScrollTrigger.create({
      trigger: titleRef.value,
      start: 'top 80%',
      onEnter: () => {
        $gsap.delayedCall(0.2, scheduleAuthor);
      },
      onEnterBack: () => {
        $gsap.delayedCall(0.2, scheduleAuthor);
      },
      onLeave: hideAuthor,
      onLeaveBack: hideAuthor,
    });
  });
});
</script>

<style lang="scss" scoped>
blockquote {
  padding: 130px 120px 110px 372px;
  max-width: calc(100% - 216px);
  margin: -1px auto;
  position: relative;
  --quote-border-color: rgb(var(--color-gold));
  --quote-arrow-color: transparent;
  background:
    linear-gradient(to right, var(--quote-border-color) 1px, transparent 1px) 0 0,
    linear-gradient(to right, var(--quote-border-color) 1px, transparent 1px) 0 100%,
    linear-gradient(to left, var(--quote-border-color) 1px, transparent 1px) 100% 0,
    linear-gradient(to left, var(--quote-border-color) 1px, transparent 1px) 100% 100%,
    linear-gradient(to bottom, var(--quote-border-color) 1px, transparent 1px) 0 0,
    linear-gradient(to bottom, var(--quote-border-color) 1px, transparent 1px) 100% 0,
    linear-gradient(to top, var(--quote-border-color) 1px, transparent 1px) 0 100%,
    linear-gradient(to top, var(--quote-border-color) 1px, transparent 1px) 100% 100%;
  background-repeat: no-repeat;
  background-size: 20px 20px;
  border: 1px solid var(--quote-arrow-color);
  &.gold {
    --quote-border-color: rgb(var(--color-dark));
    --quote-arrow-color: rgba(var(--color-dark), 0.15);  
  }
  svg {
    position: absolute;
    top: 68px;
    left: 120px;

    @include respond-to(md) {
      left: 64px;
    }

    @include respond-to(sm) {
      width: 56px;
      height: 56px;
      left: 0;
      top: 40px;
    }
  }

  @include respond-to(lg) {
    max-width: 100%;
  }

  @include respond-to(md) {
    padding-left: 240px;
    padding-right: 80px;
  }

  @include respond-to(sm) {
    background: none;
    padding: 90px 16px 40px 72px;
  }

  h6 {
    @include fsz(20px);
    font-family: var(--font-body);
    line-height: 1.7;
    color: rgb(var(--color-gold));
  }
}
</style>