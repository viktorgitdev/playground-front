import { defineStore } from "pinia";

export const useTmpStore = defineStore({
  id: "tmp",
  state: () => ({
    formPageIsSelected: true,
  }),
  getters: {
    form: (state) => state.formPageIsSelected,
  },
  actions: {
    switchForm(v: boolean) {
      console.log("switch", this.formPageIsSelected);
      this.formPageIsSelected = v;
    },
  },
});
