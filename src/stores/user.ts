import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {},
  }),
  getters: {
    userGet: (state) => state.user,
  },
  actions: {
    setUser(user: any) {
      console.log("user: ", user.name);

      Object.assign(this.user, user);

      console.log("setUser: ", this.user);
    },
    deleteUser() {
      Object.assign(this.user, {});

      console.log("deleteUser: ", this.user);
    },
  },
});
