import { defineStore } from 'pinia';
import tabsData from '@/data/guiding-tabs.json';

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: tabsData,
    mode: 'Wisdom',
    submode: null,
  }),

  getters: {
    currentMode(state) {
      return state.tabs.find((tab) => tab.name === state.mode);
    },

    currentSubmode(state) {
      if (!state.currentMode?.subtabs || !state.submode) return state.currentMode.subtabs[0];
      return state.currentMode.subtabs.find((sub) => sub.name === state.submode);
    },
  },

  actions: {
    setMode(selectedTab) {
      this.mode = selectedTab.name;
      if (selectedTab.subtabs && !this.submode) {
        this.submode = selectedTab.subtabs[0].name;
      }
    },

    setSubmode(selectedSubtab) {
      this.submode = selectedSubtab.name;
    },
  },
});
