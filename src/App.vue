<template>
  <v-app>
    <v-navigation-drawer
      color="secondary"
      v-model="drawer"
      permanent
      v-if="isAuthenticated"
    >
      <v-list bg-color="secondary">
        <v-list-item>
          <v-img src="/img/narwhal.svg" height="48" width="48"></v-img>

          <v-list-item-title class="text-h6" v-if="'given_name' in user">
            {{ user.given_name }} {{ user.family_name }}
          </v-list-item-title>
          <v-list-item-title v-else> {{ user.email }} </v-list-item-title>
        </v-list-item>
      </v-list>

      <v-list bg-color="secondary">
        <v-list-item
          v-for="(route, i) in routes"
          :key="i"
          :title="route.name"
          :to="route.path"
        >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar v-if="form" color="primary">
      <v-app-bar-nav-icon
        @click="toggleDrawer"
        v-if="isAuthenticated"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn v-if="!isAuthenticated" @click="login">Login</v-btn>
      <v-btn v-if="!isAuthenticated" @click="signUp">SignUp</v-btn>
      <v-btn v-else @click="log_out">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <v-container :fluid="true">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { ref, reactive, provide, watch } from "vue";
  import { routes } from "./router";
  import { useAuth0 } from "@auth0/auth0-vue";
  import { useUserStore } from "./stores/user";
  import { useTmpStore } from "./stores/tmp";
  import { storeToRefs } from "pinia";
  const store = useTmpStore();
  const { form } = storeToRefs(store);

  watch(form, (n: any) => {
    console.log(n);
  });
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();

  const userStore = useUserStore();
  function login() {
    loginWithRedirect();
  }

  function signUp() {
    loginWithRedirect({ screen_hint: "signup" });
  }
  function log_out() {
    logout({ returnTo: window.location.origin });
  }

  const drawer = ref(true);

  function toggleDrawer() {
    drawer.value = !drawer.value;
  }
</script>
