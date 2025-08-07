import { defineStore } from 'pinia';
import tabsData from '@/data/guiding-principles.json';

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: tabsData,
    mode: tabsData[0]?.name ?? null,
    submode: tabsData[0]?.subtabs?.[0]?.name ?? null,
  }),

  getters: {
    currentMode(state) {
      return state.tabs.find(tab => tab.name === state.mode) || state.tabs[0];
    },

    currentSubmode() {
      const subtabs = this.currentMode?.subtabs;
      if (!subtabs?.length) return null;
      return subtabs.find(sub => sub.name === this.submode) || subtabs[0];
    },
  },

  actions: {
    setMode(selectedTab) {
      this.mode = selectedTab?.name ?? null;
      const subtabs = selectedTab?.subtabs;
      this.submode = subtabs?.length > 0 
        ? (subtabs.some(s => s.name === this.submode) ? this.submode : subtabs[0].name)
        : null;
    },

    setSubmode(selectedSubtab) {
      this.submode = selectedSubtab?.name ?? null;
    },
  },
});
