<template>
  <div>
    <p>Login</p>
    <v-btn v-if="!isAuthenticated" @click="login">Login</v-btn>
  </div>
</template>
<script setup lang="ts">
  import { useAuth0 } from "@auth0/auth0-vue";
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  function login() {
    loginWithRedirect();
  }
</script>

<style scoped></style>
