// composables/useScrollTrigger.js
import { onMounted, onUnmounted, nextTick } from 'vue'
import { useNuxtApp } from '#app'

export const useScrollTrigger = () => {
  const { $gsap } = useNuxtApp()
  let triggers = []

  const initializeScrollTriggers = async (callback) => {
    // Wait for component to be fully rendered
    await nextTick()
    
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Clear any existing triggers for this component
          cleanupTriggers()
          
          // Execute the callback that creates ScrollTrigger animations
          const newTriggers = callback($gsap)
          
          // Store triggers for cleanup
          if (Array.isArray(newTriggers)) {
            triggers.push(...newTriggers)
          } else if (newTriggers) {
            triggers.push(newTriggers)
          }
          
          // Refresh ScrollTrigger
          const { ScrollTrigger } = $gsap.core.globals()
          ScrollTrigger.refresh()
          
          resolve()
        })
      })
    })
  }

  const cleanupTriggers = () => {
    triggers.forEach(trigger => {
      if (trigger && typeof trigger.kill === 'function') {
        trigger.kill()
      }
    })
    triggers = []
  }

  // Auto cleanup on unmount
  onUnmounted(() => {
    cleanupTriggers()
  })

  return {
    initializeScrollTriggers,
    cleanupTriggers
  }
}